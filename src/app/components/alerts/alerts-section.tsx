"use client"

import { useState } from "react"
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Clock,
  Filter,
  Search,
  Archive,
  Bell,
  Eye,
  Trash2
} from "lucide-react"
import { useCityContext } from "../layout/city-selector"

interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info' | 'success'
  priority: 'alta' | 'media' | 'baja'
  title: string
  message: string
  timestamp: Date
  source: string
  city?: string
  action?: string
  isRead: boolean
  isArchived: boolean
  category: 'energia' | 'dispositivos' | 'sistema' | 'eficiencia'
}

export function AlertsSection() {
  const { selectedCity, cities } = useCityContext()
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical' | 'archived'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<'all' | Alert['category']>('all')

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      priority: 'alta',
      title: 'Base nocturna elevada (stand-by)',
      message: 'El consumo fuera de horario está 40% por encima de lo normal. Posible ahorro: S/ 1,200/mes.',
      timestamp: new Date(Date.now() - 10 * 60000),
      source: 'IA Monitor',
      city: 'lima',
      action: 'Ver Optimización',
      isRead: false,
      isArchived: false,
      category: 'eficiencia'
    },
    {
      id: '2',
      type: 'warning',
      priority: 'media',
      title: 'HVAC con patrón irregular',
      message: 'Sistema de climatización consumiendo 25% más de lo esperado en las últimas 2 horas.',
      timestamp: new Date(Date.now() - 45 * 60000),
      source: 'Monitoreo Automático',
      city: 'arequipa',
      action: 'Revisar Configuración',
      isRead: false,
      isArchived: false,
      category: 'dispositivos'
    },
    {
      id: '3',
      type: 'success',
      priority: 'baja',
      title: 'Optimización implementada',
      message: 'Ajustes automáticos de iluminación generaron un ahorro de S/ 340 esta semana.',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      source: 'IA Optimizer',
      city: 'lima',
      isRead: true,
      isArchived: false,
      category: 'eficiencia'
    }
  ])

  const getFilteredAlerts = () => {
    let filtered = alerts

    // Filtrar por ciudad si no es "todas"
    if (selectedCity !== 'todas') {
      filtered = filtered.filter(alert => 
        !alert.city || alert.city === selectedCity
      )
    }

    // Filtrar por estado
    switch (filter) {
      case 'unread':
        filtered = filtered.filter(alert => !alert.isRead)
        break
      case 'critical':
        filtered = filtered.filter(alert => alert.type === 'critical')
        break
      case 'archived':
        filtered = filtered.filter(alert => alert.isArchived)
        break
      default:
        filtered = filtered.filter(alert => !alert.isArchived)
    }

    // Filtrar por categoría
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(alert => alert.category === categoryFilter)
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

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

  const getPriorityColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'alta': return 'var(--destructive)'
      case 'media': return 'var(--warning)'
      case 'baja': return 'var(--info)'
    }
  }

  const getCategoryLabel = (category: Alert['category']) => {
    switch (category) {
      case 'energia': return 'Energía'
      case 'dispositivos': return 'Dispositivos'
      case 'sistema': return 'Sistema'
      case 'eficiencia': return 'Eficiencia'
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)

    if (minutes < 1) return 'ahora'
    if (minutes < 60) return `hace ${minutes} min`
    if (hours < 24) return `hace ${hours}h`
    return timestamp.toLocaleDateString('es-PE')
  }

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ))
  }

  const archiveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, isArchived: true } : alert
    ))
  }

  const deleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  const filteredAlerts = getFilteredAlerts()
  const unreadCount = alerts.filter(alert => !alert.isRead && !alert.isArchived).length
  const criticalCount = alerts.filter(alert => alert.type === 'critical' && !alert.isArchived).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Centro de Alertas
            </h1>
            {unreadCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--destructive)]20 border border-[var(--destructive)]30">
                <div className="w-2 h-2 rounded-full bg-[var(--destructive)] animate-pulse" />
                <span className="text-sm font-medium text-[var(--destructive)]">
                  {unreadCount} requieren atención
                </span>
              </div>
            )}
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">
            Situaciones importantes que requieren tu atención para optimizar el consumo
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Buscar alertas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] text-sm w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--destructive)]20">
              <AlertTriangle className="w-5 h-5 text-[var(--destructive)]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--foreground)]">{criticalCount}</div>
              <div className="text-sm text-[var(--muted-foreground)]">Críticas</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--info)]20">
              <Bell className="w-5 h-5 text-[var(--info)]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--foreground)]">{unreadCount}</div>
              <div className="text-sm text-[var(--muted-foreground)]">Sin leer</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--success)]20">
              <CheckCircle className="w-5 h-5 text-[var(--success)]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--foreground)]">
                {alerts.filter(a => a.isRead && !a.isArchived).length}
              </div>
              <div className="text-sm text-[var(--muted-foreground)]">Resueltas</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--accent)]20">
              <Archive className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--foreground)]">
                {alerts.filter(a => a.isArchived).length}
              </div>
              <div className="text-sm text-[var(--muted-foreground)]">Archivadas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-[var(--muted)]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[var(--muted-foreground)]" />
          <span className="text-sm font-medium text-[var(--foreground)]">Filtros:</span>
        </div>
        
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'Todas' },
            { key: 'unread', label: 'Sin leer' },
            { key: 'critical', label: 'Críticas' },
            { key: 'archived', label: 'Archivadas' }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as 'all' | 'unread' | 'critical' | 'archived')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === item.key
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'bg-[var(--card)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 ml-auto">
          {[
            { key: 'all', label: 'Todas' },
            { key: 'energia', label: 'Energía' },
            { key: 'dispositivos', label: 'Dispositivos' },
            { key: 'eficiencia', label: 'Eficiencia' }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setCategoryFilter(item.key as 'all' | 'energia' | 'dispositivos' | 'sistema' | 'eficiencia')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                categoryFilter === item.key
                  ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                  : 'bg-[var(--card)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center text-[var(--muted-foreground)]">
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No hay alertas que coincidan con los filtros seleccionados</p>
          </div>
        ) : (
          filteredAlerts.map((alert, index) => {
            const AlertIcon = getAlertIcon(alert.type)
            const cityData = cities.find(c => c.id === alert.city)
            
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl bg-[var(--card)] border transition-all duration-300 animate-slide-up hover:shadow-md ${
                  !alert.isRead ? 'border-[var(--primary)]50 shadow-sm' : 'border-[var(--border)]'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Alert Icon */}
                  <div
                    className="p-3 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${getAlertColor(alert.type)}20` }}
                  >
                    <AlertIcon
                      className="w-5 h-5"
                      style={{ color: getAlertColor(alert.type) }}
                    />
                  </div>

                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`font-medium ${!alert.isRead ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}>
                          {alert.title}
                        </h4>
                        
                        {/* Priority Badge */}
                        <div
                          className="px-2 py-1 rounded text-xs font-medium text-white"
                          style={{ backgroundColor: getPriorityColor(alert.priority) }}
                        >
                          {alert.priority.toUpperCase()}
                        </div>

                        {/* Category Badge */}
                        <div className="px-2 py-1 rounded text-xs font-medium bg-[var(--muted)] text-[var(--muted-foreground)]">
                          {getCategoryLabel(alert.category)}
                        </div>

                        {/* City Badge */}
                        {alert.city && cityData && (
                          <div className="px-2 py-1 rounded text-xs font-medium bg-[var(--info)]20 text-[var(--info)]">
                            {cityData.name}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        {!alert.isRead && (
                          <button
                            onClick={() => markAsRead(alert.id)}
                            className="p-1 rounded hover:bg-[var(--muted)] transition-colors"
                            title="Marcar como leída"
                          >
                            <Eye className="w-4 h-4 text-[var(--muted-foreground)]" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => archiveAlert(alert.id)}
                          className="p-1 rounded hover:bg-[var(--muted)] transition-colors"
                          title="Archivar"
                        >
                          <Archive className="w-4 h-4 text-[var(--muted-foreground)]" />
                        </button>
                        
                        <button
                          onClick={() => deleteAlert(alert.id)}
                          className="p-1 rounded hover:bg-[var(--muted)] transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 text-[var(--muted-foreground)]" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-[var(--muted-foreground)] mb-3 leading-relaxed">
                      {alert.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimestamp(alert.timestamp)}</span>
                        </div>
                        <span>•</span>
                        <span>{alert.source}</span>
                      </div>

                      {alert.action && (
                        <button className="text-xs px-3 py-1 rounded bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity">
                          {alert.action}
                        </button>
                      )}
                    </div>

                    {/* Unread indicator */}
                    {!alert.isRead && (
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}