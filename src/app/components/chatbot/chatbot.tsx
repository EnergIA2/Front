"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente de energía inteligente. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const botResponses = [
    "Según tus datos, tu consumo energético está 12% por debajo del promedio. ¡Excelente trabajo!",
    "Te recomiendo revisar el consumo de HVAC entre las 14:00-18:00 horas para optimizar la eficiencia.",
    "Basado en los patrones actuales, podrías ahorrar hasta $450 adicionales este mes ajustando la iluminación.",
    "El análisis de IA sugiere que implementar un sistema de gestión automática podría mejorar tu eficiencia en un 15%.",
    "¿Sabías que tu edificio consume 23% menos energía los viernes? Analizar estos patrones puede ayudarte a optimizar más.",
    "Te sugiero programar una revisión de equipos para el próximo mes. La eficiencia de tus sistemas ha bajado 3%."
  ]

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simular respuesta del bot
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-[var(--primary)] text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl z-50 flex flex-col animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">Asistente IA</h3>
                <p className="text-xs text-[var(--success)]">En línea</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-[var(--muted)] transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4 text-[var(--muted-foreground)]" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' ? 'bg-[var(--accent)]' : 'bg-[var(--primary)]'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-3 h-3 text-white" />
                    ) : (
                      <Bot className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-3 py-2 ${
                      message.sender === 'user'
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--muted)] text-[var(--foreground)]'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-[var(--muted)] rounded-2xl px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[var(--muted-foreground)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[var(--border)]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="w-10 h-10 bg-[var(--primary)] text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}