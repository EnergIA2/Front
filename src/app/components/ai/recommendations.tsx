"use client"

import { useState, useEffect } from "react"
import { formatCurrency } from "../../lib/utils"
import {
  Brain,
  CheckCircle,
  AlertTriangle,
  TrendingDown,
  Lightbulb,
  Clock,
  Zap,
  ThermometerSun,
  Wind,
  Cpu
} from "lucide-react"

interface Recommendation {
  id: string
  type: 'critical' | 'high' | 'medium' | 'low'
  category: 'hvac' | 'lighting' | 'equipment' | 'scheduling'
  title: string
  description: string
  impact: string
  savings: number
  implementation: string
  confidence: number
  icon: React.ComponentType<any>
  status: 'pending' | 'implementing' | 'completed'
}

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: '1',
      type: 'critical',
      category: 'hvac',
      title: 'Optimizar horarios de climatización',
      description: 'Los sistemas HVAC están funcionando a máxima capacidad durante horas de baja ocupación.',
      impact: 'Alto impacto energético',
      savings: 1250,
      implementation: '2-3 días',
      confidence: 94,
      icon: ThermometerSun,
      status: 'pending'
    },
    {
      id: '2',
      type: 'high',
      category: 'lighting',
      title: 'Implementar sensores de movimiento',
      description: 'Las luces permanecen encendidas en áreas desocupadas por períodos prolongados.',
      impact: 'Reducción 30% en iluminación',
      savings: 780,
      implementation: '1 semana',
      confidence: 89,
      icon: Lightbulb,
      status: 'pending'
    },
    {
      id: '3',
      type: 'medium',
      category: 'equipment',
      title: 'Calibrar equipos de producción',
      description: 'Algunos equipos consumen 15% más energía de lo óptimo según patrones de uso.',
      impact: 'Eficiencia mejorada',
      savings: 520,
      implementation: '3-5 días',
      confidence: 76,
      icon: Cpu,
      status: 'implementing'
    },
    {
      id: '4',
      type: 'low',
      category: 'scheduling',
      title: 'Reprogramar cargas no críticas',
      description: 'Mover operaciones no críticas a horarios de menor costo energético.',
      impact: 'Optimización de costos',
      savings: 340,
      implementation: '1-2 días',
      confidence: 82,
      icon: Clock,
      status: 'completed'
    }
  ])

  const [isGenerating, setIsGenerating] = useState(false)

  // Simular generación de nuevas recomendaciones
  const generateNewRecommendation = () => {
    setIsGenerating(true)

    setTimeout(() => {
      const newRecommendations = [
        {
          id: Date.now().toString(),
          type: 'high' as const,
          category: 'hvac' as const,
          title: 'Ajustar temperatura por zona',
          description: 'IA detectó diferencias de temperatura que permiten zonificar el control HVAC.',
          impact: 'Ahorro 20% en climatización',
          savings: 960,
          implementation: '1-2 semanas',
          confidence: 87,
          icon: Wind,
          status: 'pending' as const
        }
      ]

      setRecommendations(prev => [...newRecommendations, ...prev.slice(0, 3)])
      setIsGenerating(false)
    }, 2000)
  }

  const updateStatus = (id: string, status: Recommendation['status']) => {
    setRecommendations(prev =>
      prev.map(rec => rec.id === id ? { ...rec, status } : rec)
    )
  }

  const getTypeColor = (type: Recommendation['type']) => {
    switch (type) {
      case 'critical': return 'var(--destructive)'
      case 'high': return 'var(--warning)'
      case 'medium': return 'var(--info)'
      case 'low': return 'var(--success)'
    }
  }

  const getStatusIcon = (status: Recommendation['status']) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'implementing': return Clock
      default: return AlertTriangle
    }
  }

  return (
    <div className="p-4 md:p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--primary)20' }}>
            <Brain className="w-6 h-6" style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-[var(--foreground)]">
              Recomendaciones IA
            </h2>
            <p className="text-xs md:text-sm text-[var(--muted-foreground)]">
              Análisis automático de patrones energéticos
            </p>
          </div>
        </div>

        <button
          onClick={generateNewRecommendation}
          disabled={isGenerating}
          className="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              Analizando...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Nueva Análisis
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const StatusIcon = getStatusIcon(rec.status)

          return (
            <div
              key={rec.id}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--muted)] hover:bg-[var(--secondary)] transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${getTypeColor(rec.type)}20` }}
                >
                  <rec.icon
                    className="w-5 h-5"
                    style={{ color: getTypeColor(rec.type) }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-[var(--foreground)] text-sm">
                      {rec.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: `${getTypeColor(rec.type)}20`,
                          color: getTypeColor(rec.type)
                        }}
                      >
                        {rec.type.toUpperCase()}
                      </span>
                      <StatusIcon
                        className="w-4 h-4"
                        style={{
                          color: rec.status === 'completed' ? 'var(--success)' :
                                rec.status === 'implementing' ? 'var(--warning)' :
                                'var(--muted-foreground)'
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-[var(--muted-foreground)] mb-3">
                    {rec.description}
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-[var(--muted-foreground)]">Ahorro:</span>
                      <p className="font-medium text-[var(--success)]">
                        {formatCurrency(rec.savings)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[var(--muted-foreground)]">Tiempo:</span>
                      <p className="font-medium text-[var(--foreground)]">
                        {rec.implementation}
                      </p>
                    </div>
                    <div>
                      <span className="text-[var(--muted-foreground)]">Confianza:</span>
                      <p className="font-medium text-[var(--primary)]">
                        {rec.confidence}%
                      </p>
                    </div>
                    <div>
                      <span className="text-[var(--muted-foreground)]">Impacto:</span>
                      <p className="font-medium text-[var(--accent)]">
                        {rec.impact}
                      </p>
                    </div>
                  </div>

                  {rec.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => updateStatus(rec.id, 'implementing')}
                        className="px-3 py-1 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-xs hover:opacity-90 transition-opacity"
                      >
                        Implementar
                      </button>
                      <button
                        onClick={() => updateStatus(rec.id, 'completed')}
                        className="px-3 py-1 rounded-lg border border-[var(--border)] text-[var(--muted-foreground)] text-xs hover:bg-[var(--muted)] transition-colors"
                      >
                        Marcar como completado
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">
            Ahorro total estimado:
          </span>
          <span className="font-semibold text-[var(--success)]">
            {formatCurrency(recommendations.reduce((sum, rec) => sum + rec.savings, 0))}/mes
          </span>
        </div>
      </div>
    </div>
  )
}