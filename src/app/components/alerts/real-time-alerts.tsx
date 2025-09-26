"use client"

import { useState, useEffect } from "react"
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  X,
  Eye
} from "lucide-react"

interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info' | 'success'
  title: string
  message: string
  timestamp: Date
  source: string
  action?: string
  isRead: boolean
  autoResolve?: boolean
}

export function RealTimeAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Consumo Crítico Detectado',
      message: 'El sistema HVAC está consumiendo 340% más energía de lo normal',
      timestamp: new Date(Date.now() - 5 * 60000),
      source: 'Sistema HVAC Principal',
      action: 'Revisar configuración',
      isRead: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Dispositivo Con Anomalías',
      message: 'Ventilador Industrial A3 mostrando patrones irregulares',
      timestamp: new Date(Date.now() - 15 * 60000),
      source: 'Ventilador Industrial A3',
      action: 'Programar mantenimiento',
      isRead: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Optimización Completada',
      message: 'IA implementó ajustes automáticos en la iluminación',
      timestamp: new Date(Date.now() - 30 * 60000),
      source: 'Sistema IA',
      isRead: true,
      autoResolve: true
    },
    {
      id: '4',
      type: 'info',
      title: 'Reporte Mensual Disponible',
      message: 'El análisis de eficiencia energética de marzo está listo',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      source: 'Sistema de Reportes',
      action: 'Ver reporte',
      isRead: false
    }
  ])

  // Simular nuevas alertas
  useEffect(() => {
    const alertTemplates = [
      {
        type: 'warning' as const,
        title: 'Pico de Demanda',
        message: 'Aumento del 25% en el consumo energético durante la última hora',
        source: 'Monitor de Consumo',
        action: 'Activar modo eficiencia'
      },
      {
        type: 'info' as const,
        title: 'Actualización del Sistema',
        message: 'Nueva actualización de firmware disponible para sensores',
        source: 'Gestor de Dispositivos',
        action: 'Programar actualización'
      },
      {
        type: 'success' as const,
        title: 'Meta de Eficiencia Alcanzada',
        message: 'Se alcanzó el 90% de eficiencia en la zona de oficinas',
        source: 'Monitor de Eficiencia',
        autoResolve: true
      },
      {
        type: 'critical' as const,
        title: 'Falla de Comunicación',
        message: 'Pérdida de conexión con 3 sensores de temperatura',
        source: 'Red IoT',
        action: 'Verificar conectividad'
      }
    ]

    const interval = setInterval(() => {
      // Solo agregar nuevas alertas ocasionalmente
      if (Math.random() < 0.3) {
        const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)]
        const newAlert: Alert = {
          id: Date.now().toString(),
          ...template,
          timestamp: new Date(),
          isRead: false
        }

        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]) // Mantener solo las últimas 10
      }
    }, 15000) // Cada 15 segundos

    return () => clearInterval(interval)
  }, [])

  // Auto-resolver alertas de éxito después de un tiempo
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlerts(prev => prev.filter(alert =>
        !(alert.autoResolve && Date.now() - alert.timestamp.getTime() > 2 * 60000)
      ))
    }, 1000)

    return () => clearTimeout(timeout)
  }, [alerts])

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return AlertTriangle
      case 'warning': return AlertTriangle
      case 'success': return CheckCircle
      case 'info': return Info
    }
  }

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return 'var(--destructive)'
      case 'warning': return 'var(--warning)'
      case 'success': return 'var(--success)'
      case 'info': return 'var(--info)'
    }
  }

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ))
  }

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)

    if (minutes < 1) return 'ahora'
    if (minutes < 60) return `hace ${minutes} min`
    if (hours < 24) return `hace ${hours}h`
    return timestamp.toLocaleDateString()
  }

  const unreadCount = alerts.filter(alert => !alert.isRead).length

  return (
    <div className="fixed top-20 right-4 w-80 max-w-[calc(100vw-2rem)] z-40 max-h-[calc(100vh-6rem)] overflow-hidden">
      {/* Alert Counter */}
      {unreadCount > 0 && (
        <div className="mb-2 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--card)] border border-[var(--border)]">
            <div className="w-2 h-2 rounded-full bg-[var(--destructive)] animate-pulse"></div>
            <span className="text-sm font-medium text-[var(--foreground)]">
              {unreadCount} alertas nuevas
            </span>
          </div>
        </div>
      )}

      {/* Alerts Stack */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {alerts.slice(0, 3).map((alert, index) => {
          const AlertIcon = getAlertIcon(alert.type)
          const isVisible = true // Mostrar todas las alertas visibles

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] animate-slide-up transition-all duration-300 ${
                !alert.isRead ? 'shadow-lg' : 'opacity-75'
              } ${!isVisible ? 'scale-95 opacity-50' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                {/* Alert Icon */}
                <div
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${getAlertColor(alert.type)}20` }}
                >
                  <AlertIcon
                    className="w-4 h-4"
                    style={{ color: getAlertColor(alert.type) }}
                  />
                </div>

                {/* Alert Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-[var(--foreground)] text-sm">
                      {alert.title}
                    </h4>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex-shrink-0 ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-[var(--muted-foreground)] mb-2 leading-relaxed">
                    {alert.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimestamp(alert.timestamp)}</span>
                      <span>•</span>
                      <span>{alert.source}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {!alert.isRead && (
                        <button
                          onClick={() => markAsRead(alert.id)}
                          className="p-1 rounded hover:bg-[var(--muted)] transition-colors"
                          title="Marcar como leída"
                        >
                          <Eye className="w-3 h-3 text-[var(--muted-foreground)]" />
                        </button>
                      )}

                      {alert.action && (
                        <button className="text-xs px-2 py-1 rounded bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity">
                          {alert.action}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Unread indicator */}
                  {!alert.isRead && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {alerts.length > 3 && (
        <div className="mt-2 text-center">
          <button className="text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors px-3 py-1 rounded bg-[var(--muted)] hover:bg-[var(--secondary)]">
            Ver {alerts.length - 3} alertas más
          </button>
        </div>
      )}
    </div>
  )
}