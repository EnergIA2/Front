"use client"

import { useState } from "react"
import { 
  Download, 
  Eye, 
  AlertTriangle, 
  TrendingUp, 
  FileText, 
  Wifi, 
  Bell,
  BarChart3,
  Users,
  Target,
  Calendar,
  Filter,
  RefreshCw
} from "lucide-react"
import { useCityContext } from "../layout/city-selector"

interface EmisCapability {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  status: 'active' | 'configured' | 'pending'
  color: string
}

export function EmisSection() {
  const { selectedCity, cities, getCityData } = useCityContext()
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'excel'>('csv')
  const [timeRange, setTimeRange] = useState('30d')

  const capabilities: EmisCapability[] = [
    {
      id: 'export',
      title: 'Exportar CSV',
      description: 'Descarga datos de consumo y métricas en formato CSV para análisis externos.',
      icon: Download,
      status: 'active',
      color: 'var(--primary)'
    },
    {
      id: 'multi-site',
      title: 'Visibilidad multi-sitio',
      description: 'Integra consumos de varias sedes en un mismo panel. Usa el selector superior para cambiar o sumar sedes.',
      icon: Eye,
      status: 'active',
      color: 'var(--info)'
    },
    {
      id: 'inefficiencies',
      title: 'Detección de ineficiencias',
      description: 'Algoritmos detectan fugas energéticas, base nocturna y uso fuera de horario.',
      icon: AlertTriangle,
      status: 'active',
      color: 'var(--warning)'
    },
    {
      id: 'benchmarking',
      title: 'Benchmarking',
      description: 'Comparación con meta del sector y objetivos internos. Estado actual: Por encima de meta.',
      icon: TrendingUp,
      status: 'configured',
      color: 'var(--success)'
    },
    {
      id: 'reports',
      title: 'Automatización de reportes',
      description: 'Genera informes mensuales de ahorro económico y ambiental (CSV/PDF).',
      icon: FileText,
      status: 'active',
      color: 'var(--accent)'
    },
    {
      id: 'iot',
      title: 'Integración IoT',
      description: 'Conexión a medidores inteligentes y BMS/SCADA vía MQTT/Modbus/HTTP.',
      icon: Wifi,
      status: 'configured',
      color: 'var(--secondary)'
    },
    {
      id: 'alerts',
      title: 'Alertas proactivas',
      description: 'Notificaciones automáticas en tiempo real ante anomalías o eventos críticos.',
      icon: Bell,
      status: 'active',
      color: 'var(--destructive)'
    }
  ]

  const getCurrentData = () => {
    if (selectedCity === 'todas') {
      return {
        totalConsumption: cities.reduce((sum, city) => sum + city.consumption, 0),
        totalCost: cities.reduce((sum, city) => sum + city.cost, 0),
        totalCO2: cities.reduce((sum, city) => sum + city.co2, 0),
        sites: cities.length,
        benchmark: 90.5 // Promedio
      }
    } else {
      const cityData = getCityData(selectedCity)
      return cityData ? {
        totalConsumption: cityData.consumption,
        totalCost: cityData.cost,
        totalCO2: cityData.co2,
        sites: 1,
        benchmark: 89.2
      } : {
        totalConsumption: 0,
        totalCost: 0,
        totalCO2: 0,
        sites: 0,
        benchmark: 0
      }
    }
  }

  const data = getCurrentData()

  const handleExport = (format: 'csv' | 'pdf' | 'excel') => {
    // Simular exportación
    const filename = `energia-${selectedCity}-${new Date().toISOString().split('T')[0]}.${format}`
    
    // En una implementación real, aquí se generaría y descargaría el archivo
    const toast = document.createElement('div')
    toast.className = 'fixed top-4 right-4 bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] px-4 py-2 rounded-lg shadow-lg z-50'
    toast.textContent = `Exportando ${filename}...`
    document.body.appendChild(toast)
    
    setTimeout(() => {
      toast.textContent = `✓ ${filename} descargado`
      setTimeout(() => document.body.removeChild(toast), 2000)
    }, 1500)
  }

  const getStatusColor = (status: EmisCapability['status']) => {
    switch (status) {
      case 'active': return 'var(--success)'
      case 'configured': return 'var(--info)'
      case 'pending': return 'var(--warning)'
    }
  }

  const getStatusText = (status: EmisCapability['status']) => {
    switch (status) {
      case 'active': return 'Activo'
      case 'configured': return 'Configurado'
      case 'pending': return 'Pendiente'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
            EMIS - Sistema de Gestión Energética
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Capacidades avanzadas para optimización y control energético empresarial
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] text-sm"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 3 meses</option>
            <option value="12m">Último año</option>
          </select>

          <button
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="font-medium text-[var(--foreground)]">Consumo Total</h3>
          </div>
          <div className="text-2xl font-bold text-[var(--foreground)]">
            {data.totalConsumption.toFixed(2)} kWh
          </div>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            {selectedCity === 'todas' ? `${data.sites} ubicaciones` : 'Sede actual'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-[var(--success)]" />
            <h3 className="font-medium text-[var(--foreground)]">Benchmark</h3>
          </div>
          <div className="text-2xl font-bold text-[var(--foreground)]">
            {data.benchmark}%
          </div>
          <p className="text-xs text-[var(--success)] mt-1">
            Por encima de meta sectorial
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-[var(--info)]" />
            <h3 className="font-medium text-[var(--foreground)]">Costo (S/)</h3>
          </div>
          <div className="text-2xl font-bold text-[var(--foreground)]">
            {data.totalCost.toLocaleString()}
          </div>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Tarifa: S/ 1.94
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-3 mb-2">
            <RefreshCw className="w-5 h-5 text-[var(--accent)]" />
            <h3 className="font-medium text-[var(--foreground)]">CO₂ (kg)</h3>
          </div>
          <div className="text-2xl font-bold text-[var(--foreground)]">
            {data.totalCO2.toFixed(1)}
          </div>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Factor: 0.41
          </p>
        </div>
      </div>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((capability, index) => (
          <div
            key={capability.id}
            className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] animate-slide-up hover:scale-[1.02] hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${capability.color}20` }}
              >
                <capability.icon
                  className="w-6 h-6"
                  style={{ color: capability.color }}
                />
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getStatusColor(capability.status) }}
                />
                <span 
                  className="text-xs font-medium"
                  style={{ color: getStatusColor(capability.status) }}
                >
                  {getStatusText(capability.status)}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
              {capability.title}
            </h3>
            
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
              {capability.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {capability.id === 'export' && (
                <div className="flex gap-1">
                  <button
                    onClick={() => handleExport('csv')}
                    className="px-3 py-1 text-xs bg-[var(--primary)] text-[var(--primary-foreground)] rounded hover:opacity-90 transition-opacity"
                  >
                    CSV
                  </button>
                  <button
                    onClick={() => handleExport('excel')}
                    className="px-3 py-1 text-xs bg-[var(--success)] text-white rounded hover:opacity-90 transition-opacity"
                  >
                    Excel
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="px-3 py-1 text-xs bg-[var(--warning)] text-white rounded hover:opacity-90 transition-opacity"
                  >
                    PDF
                  </button>
                </div>
              )}
              {capability.id === 'benchmarking' && (
                <button className="px-3 py-1 text-xs bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded hover:opacity-90 transition-opacity">
                  Ver Detalles
                </button>
              )}
              {capability.id === 'reports' && (
                <button className="px-3 py-1 text-xs bg-[var(--info)] text-white rounded hover:opacity-90 transition-opacity">
                  Configurar
                </button>
              )}
              {capability.status === 'pending' && (
                <button className="px-3 py-1 text-xs bg-[var(--warning)] text-white rounded hover:opacity-90 transition-opacity">
                  Activar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Actividades Recientes</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--muted)]">
            <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--foreground)]">Reporte mensual generado</p>
              <p className="text-xs text-[var(--muted-foreground)]">Ahorro energético - Marzo 2025</p>
            </div>
            <span className="text-xs text-[var(--muted-foreground)]">hace 2h</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--muted)]">
            <div className="w-2 h-2 rounded-full bg-[var(--info)]" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--foreground)]">Benchmark actualizado</p>
              <p className="text-xs text-[var(--muted-foreground)]">Meta sectorial: 300 kWh</p>
            </div>
            <span className="text-xs text-[var(--muted-foreground)]">hace 5h</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--muted)]">
            <div className="w-2 h-2 rounded-full bg-[var(--warning)]" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--foreground)]">Ineficiencia detectada</p>
              <p className="text-xs text-[var(--muted-foreground)]">HVAC - Consumo elevado nocturno</p>
            </div>
            <span className="text-xs text-[var(--muted-foreground)]">hace 12h</span>
          </div>
        </div>
      </div>
    </div>
  )
}