"use client"

import { useState } from "react"
import {
  TrendingUp,
  Target,
  Clock,
  DollarSign,
  ArrowRight,
  BarChart3,
  Zap
} from "lucide-react"
import { useCityContext } from "../layout/city-selector"

interface OptimizationCard {
  id: string
  title: string
  description: string
  currentValue: string
  targetValue: string
  savings: string
  timeframe: string
  priority: 'high' | 'medium' | 'low'
  status: 'active' | 'pending' | 'completed'
  actions: string[]
}

export function OptimizationSection() {
  const { selectedCity, getCityData } = useCityContext()
  const [activeTab, setActiveTab] = useState<'recommendations' | 'predictions' | 'benchmarks'>('recommendations')

  // Datos de optimización basados en la ciudad seleccionada
  const getOptimizationData = () => {
    // const cityData = selectedCity === 'todas' ? null : getCityData(selectedCity)
    
    const recommendations: OptimizationCard[] = [
      {
        id: '1',
        title: 'Optimización HVAC Nocturno',
        description: 'Reducir temperatura del sistema HVAC durante horarios no laborables',
        currentValue: '24°C promedio',
        targetValue: '26°C promedio',
        savings: 'S/ 2,847/mes',
        timeframe: '1 semana',
        priority: 'high',
        status: 'pending',
        actions: ['Configurar horarios', 'Instalar sensores de presencia']
      },
      {
        id: '2',
        title: 'Iluminación Inteligente',
        description: 'Implementar sensores de movimiento en áreas comunes',
        currentValue: '12h operación',
        targetValue: '8h operación',
        savings: 'S/ 1,240/mes',
        timeframe: '2 semanas',
        priority: 'medium',
        status: 'active',
        actions: ['Instalar sensores', 'Configurar automatización']
      },
      {
        id: '3',
        title: 'Gestión de Equipos Stand-by',
        description: 'Eliminar consumo base nocturno elevado detectado',
        currentValue: '15.2 kWh base',
        targetValue: '8.5 kWh base',
        savings: 'S/ 890/mes',
        timeframe: '3 días',
        priority: 'high',
        status: 'pending',
        actions: ['Identificar equipos', 'Configurar apagado automático']
      }
    ]

    return recommendations
  }

  const optimizationData = getOptimizationData()

  // Predicciones clave para el empresario
  const keyPredictions = {
    nextMonth: {
      consumption: selectedCity === 'todas' ? '1,245 kWh' : '415 kWh',
      cost: selectedCity === 'todas' ? 'S/ 2,415' : 'S/ 805',
      savings: selectedCity === 'todas' ? 'S/ 5,680' : 'S/ 1,890',
      trend: 'down'
    },
    peakHours: '14:00 - 18:00',
    efficiency: '92.3%',
    roi: '6 meses'
  }

  // Benchmarks sectoriales
  const benchmarks = {
    sector: 'Oficinas Corporativas',
    yourEfficiency: 89.2,
    sectorAverage: 76.8,
    bestInClass: 94.5,
    ranking: '3° de 12 empresas similares'
  }

  const getPriorityColor = (priority: OptimizationCard['priority']) => {
    switch (priority) {
      case 'high': return 'var(--destructive)'
      case 'medium': return 'var(--warning)'
      case 'low': return 'var(--info)'
    }
  }

  const getStatusColor = (status: OptimizationCard['status']) => {
    switch (status) {
      case 'active': return 'var(--info)'
      case 'pending': return 'var(--warning)'
      case 'completed': return 'var(--success)'
    }
  }

  const getStatusLabel = (status: OptimizationCard['status']) => {
    switch (status) {
      case 'active': return 'En Progreso'
      case 'pending': return 'Pendiente'
      case 'completed': return 'Completado'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
            Optimización Energética
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Recomendaciones inteligentes para maximizar eficiencia y reducir costos
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--success)]20 text-[var(--success)]">
            <TrendingUp className="w-4 h-4" />
            <span>ROI Proyectado: {keyPredictions.roi}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[var(--muted)] rounded-lg">
        {[
          { key: 'recommendations', label: 'Recomendaciones', icon: Target },
          { key: 'predictions', label: 'Proyecciones', icon: TrendingUp },
          { key: 'benchmarks', label: 'Comparativas', icon: BarChart3 }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'recommendations' | 'predictions' | 'benchmarks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-[var(--card)] text-[var(--primary)] shadow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          {/* Quick Wins Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[var(--success)]10 to-[var(--info)]10 border border-[var(--success)]30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[var(--foreground)] mb-1">
                  Ahorro Potencial Identificado
                </h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Implementando estas 3 optimizaciones principales
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[var(--success)]">
                  S/ 4,977/mes
                </div>
                <div className="text-sm text-[var(--muted-foreground)]">
                  ~24% reducción
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations List */}
          <div className="grid gap-4">
            {optimizationData.map((item, index) => (
              <div
                key={item.id}
                className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:shadow-md transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${getPriorityColor(item.priority)}20` }}
                    >
                      <Zap className="w-5 h-5" style={{ color: getPriorityColor(item.priority) }} />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-[var(--foreground)]">
                          {item.title}
                        </h3>
                        <div
                          className="px-2 py-1 rounded text-xs font-medium text-white"
                          style={{ backgroundColor: getStatusColor(item.status) }}
                        >
                          {getStatusLabel(item.status)}
                        </div>
                      </div>
                      <p className="text-sm text-[var(--muted-foreground)] mb-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-[var(--success)]">
                      {item.savings}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      Ahorro proyectado
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-[var(--muted)]">
                    <div className="text-xs text-[var(--muted-foreground)] mb-1">Actual</div>
                    <div className="font-medium text-[var(--foreground)]">{item.currentValue}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--muted)]">
                    <div className="text-xs text-[var(--muted-foreground)] mb-1">Objetivo</div>
                    <div className="font-medium text-[var(--foreground)]">{item.targetValue}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--muted)]">
                    <div className="text-xs text-[var(--muted-foreground)] mb-1">Tiempo</div>
                    <div className="font-medium text-[var(--foreground)]">{item.timeframe}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {item.actions.map((action, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded"
                      >
                        {action}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 transition-opacity text-sm">
                    Implementar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'predictions' && (
        <div className="space-y-6">
          {/* Next Month Forecast */}
          <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
              Proyección Próximo Mes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-4 rounded-lg bg-[var(--muted)] mb-2">
                  <Zap className="w-8 h-8 text-[var(--primary)] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[var(--foreground)]">
                    {keyPredictions.nextMonth.consumption}
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">Consumo Estimado</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="p-4 rounded-lg bg-[var(--muted)] mb-2">
                  <DollarSign className="w-8 h-8 text-[var(--warning)] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[var(--foreground)]">
                    {keyPredictions.nextMonth.cost}
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">Costo Estimado</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="p-4 rounded-lg bg-[var(--muted)] mb-2">
                  <Target className="w-8 h-8 text-[var(--success)] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[var(--success)]">
                    {keyPredictions.nextMonth.savings}
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">Ahorro Potencial</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[var(--info)]10 border border-[var(--info)]30">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[var(--info)]" />
                <div>
                  <div className="font-medium text-[var(--foreground)]">
                    Horas de Mayor Consumo: {keyPredictions.peakHours}
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">
                    Considera implementar horarios de ahorro energético
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'benchmarks' && (
        <div className="space-y-6">
          {/* Performance Comparison */}
          <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
              Comparativa Sectorial
            </h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[var(--muted-foreground)]">Tu Eficiencia</span>
                <span className="font-bold text-[var(--foreground)]">{benchmarks.yourEfficiency}%</span>
              </div>
              <div className="w-full bg-[var(--muted)] rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-[var(--success)] to-[var(--info)] h-3 rounded-full" 
                  style={{ width: `${benchmarks.yourEfficiency}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-[var(--muted)]">
                  <div className="text-sm text-[var(--muted-foreground)] mb-1">Promedio Sector</div>
                  <div className="text-xl font-bold text-[var(--foreground)]">{benchmarks.sectorAverage}%</div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--muted)]">
                  <div className="text-sm text-[var(--muted-foreground)] mb-1">Mejor en Clase</div>
                  <div className="text-xl font-bold text-[var(--foreground)]">{benchmarks.bestInClass}%</div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--success)]20">
                  <div className="text-sm text-[var(--success)] mb-1">Tu Posición</div>
                  <div className="text-xl font-bold text-[var(--success)]">{benchmarks.ranking}</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[var(--warning)]10 border border-[var(--warning)]30">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-[var(--warning)]" />
                <div>
                  <div className="font-medium text-[var(--foreground)]">
                    Potencial de Mejora: {(benchmarks.bestInClass - benchmarks.yourEfficiency).toFixed(1)}%
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">
                    Alcanzar el nivel de mejor en clase podría generar ahorros adicionales de S/ 3,200/mes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}