"use client"

import { useState, useEffect } from "react"
import { 
  TrendingUp, 
  Clock, 
  Zap, 
  DollarSign, 
  Leaf, 
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle
} from "lucide-react"
import { useCityContext } from "../layout/city-selector"

interface ForecastData {
  time: string
  consumption: number
  cost: number
  co2: number
  confidence: number
}

interface HourlyForecast {
  hour: string
  kwh: number
  cost: number
  co2: number
  change: number
  status: 'normal' | 'peak' | 'low'
}

export function PredictionSection() {
  const { selectedCity, cities, getCityData } = useCityContext()
  const [timeHorizon, setTimeHorizon] = useState<'1h' | '24h' | '7d' | '30d'>('1h')
  const [currentTime] = useState(new Date())

  // Datos de predicción simulados basados en las imágenes
  const getNextHourForecast = () => {
    const baseConsumption = selectedCity === 'todas' ? 38.83 : 
                           selectedCity === 'lima' ? 12.81 :
                           selectedCity === 'arequipa' ? 10.45 : 15.33
    
    return {
      kwh: baseConsumption + 0.2, // +0.2h como en la imagen
      cost: selectedCity === 'todas' ? 75.33 : 
            selectedCity === 'lima' ? 25.11 :
            selectedCity === 'arequipa' ? 20.09 : 30.13,
      co2: selectedCity === 'todas' ? 15.92 : 
           selectedCity === 'lima' ? 5.31 :
           selectedCity === 'arequipa' ? 4.35 : 6.26,
      prediction: baseConsumption * 3.19, // Proyección como en la imagen
      confidence: 89
    }
  }

  const nextHour = getNextHourForecast()

  // Predicciones por hora (próximas 24 horas)
  const hourlyForecasts: HourlyForecast[] = Array.from({ length: 24 }, (_, i) => {
    const hour = new Date(currentTime)
    hour.setHours(currentTime.getHours() + i + 1)
    
    const baseConsumption = 12 + Math.sin((i + currentTime.getHours()) * Math.PI / 12) * 8
    const peakHours = [14, 15, 16, 17, 18] // Horas pico
    const isPeak = peakHours.includes(hour.getHours())
    const isLow = hour.getHours() >= 22 || hour.getHours() <= 6
    
    return {
      hour: hour.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      kwh: baseConsumption * (isPeak ? 1.4 : isLow ? 0.6 : 1),
      cost: baseConsumption * 1.94 * (isPeak ? 1.4 : isLow ? 0.6 : 1),
      co2: baseConsumption * 0.41 * (isPeak ? 1.4 : isLow ? 0.6 : 1),
      change: (Math.random() - 0.5) * 20,
      status: isPeak ? 'peak' : isLow ? 'low' : 'normal'
    }
  })

  // Métricas de predicción
  const predictionMetrics = [
    {
      title: "Próxima Hora",
      subtitle: "(forecast)",
      values: [
        { label: "kWh", value: nextHour.kwh.toFixed(2), change: "+0.2h" },
        { label: "Costo (S/)", value: nextHour.cost.toFixed(2), change: "+3.2%" },
        { label: "CO₂ (kg)", value: nextHour.co2.toFixed(2), change: "+1.8%" }
      ],
      icon: Clock,
      color: "var(--info)"
    },
    {
      title: "Proyección kWh",
      subtitle: "Basado en tendencia",
      values: [
        { label: "Proyectado", value: nextHour.prediction.toFixed(2), change: "kWh" }
      ],
      icon: TrendingUp,
      color: "var(--primary)"
    },
    {
      title: "Confianza",
      subtitle: "Precisión del modelo",
      values: [
        { label: "IA Model", value: `${nextHour.confidence}%`, change: "Alta precisión" }
      ],
      icon: CheckCircle,
      color: "var(--success)"
    }
  ]

  const getStatusColor = (status: HourlyForecast['status']) => {
    switch (status) {
      case 'peak': return 'var(--destructive)'
      case 'low': return 'var(--success)'
      default: return 'var(--info)'
    }
  }

  const getStatusLabel = (status: HourlyForecast['status']) => {
    switch (status) {
      case 'peak': return 'Pico'
      case 'low': return 'Valle'
      default: return 'Normal'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
            Predicción Energética
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Pronósticos inteligentes basados en patrones históricos y algoritmos de IA
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(e.target.value as any)}
            className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] text-sm"
          >
            <option value="1h">Próxima Hora</option>
            <option value="24h">Próximas 24h</option>
            <option value="7d">Próximos 7 días</option>
            <option value="30d">Próximo Mes</option>
          </select>
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {predictionMetrics.map((metric, index) => (
          <div
            key={metric.title}
            className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] animate-slide-up hover:scale-[1.02] hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <metric.icon
                  className="w-6 h-6"
                  style={{ color: metric.color }}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  {metric.title}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {metric.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {metric.values.map((value, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {value.label}
                  </span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[var(--foreground)]">
                      {value.value}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      {value.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Next Hour Forecast - Detailed View (like in the image) */}
      {timeHorizon === '1h' && (
        <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
            Próxima hora (forecast)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-sm text-[var(--muted-foreground)] mb-1">kWh</div>
              <div className="text-3xl font-bold text-[var(--foreground)]">
                {nextHour.kwh.toFixed(2)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-[var(--muted-foreground)] mb-1">Costo (S/)</div>
              <div className="text-3xl font-bold text-[var(--foreground)]">
                {nextHour.cost.toFixed(2)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-[var(--muted-foreground)] mb-1">CO₂ (kg)</div>
              <div className="text-3xl font-bold text-[var(--foreground)]">
                {nextHour.co2.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Forecast Chart Representation */}
          <div className="relative h-40 bg-gradient-to-t from-[var(--primary)]20 to-transparent rounded-lg p-4">
            <div className="absolute bottom-4 left-4 bg-[var(--card)] border border-[var(--border)] rounded-lg p-3 shadow-lg">
              <div className="text-lg font-bold text-[var(--foreground)]">+0.2h</div>
              <div className="text-sm text-[var(--muted-foreground)]">
                kWh: {nextHour.prediction.toFixed(2)} kWh
              </div>
            </div>
            
            {/* Simulated trend line */}
            <div className="absolute inset-4">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 0 80 Q 25 60 50 65 T 100 45"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* 24-Hour Forecast */}
      {timeHorizon === '24h' && (
        <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
            Pronóstico de 24 Horas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-h-80 overflow-y-auto">
            {hourlyForecasts.slice(0, 12).map((forecast, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-[var(--muted)] border border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {forecast.hour}
                  </span>
                  <div
                    className="px-2 py-1 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: getStatusColor(forecast.status) }}
                  >
                    {getStatusLabel(forecast.status)}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">kWh:</span>
                    <span className="font-medium text-[var(--foreground)]">
                      {forecast.kwh.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">S/:</span>
                    <span className="font-medium text-[var(--foreground)]">
                      {forecast.cost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">CO₂:</span>
                    <span className="font-medium text-[var(--foreground)]">
                      {forecast.co2.toFixed(1)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-center" style={{
                  color: forecast.change > 0 ? 'var(--destructive)' : 'var(--success)'
                }}>
                  {forecast.change > 0 ? '↗' : '↘'} {Math.abs(forecast.change).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Insights */}
      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">
          Insights de IA
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-[var(--info)]10 to-transparent border-l-4 border-[var(--info)]">
            <Activity className="w-5 h-5 text-[var(--info)] mt-1" />
            <div>
              <h4 className="font-medium text-[var(--foreground)] mb-1">
                Patrón de Consumo Detectado
              </h4>
              <p className="text-sm text-[var(--muted-foreground)]">
                Se prevé un incremento del 25% en las próximas 2 horas debido al inicio del horario de mayor actividad.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-[var(--warning)]10 to-transparent border-l-4 border-[var(--warning)]">
            <AlertCircle className="w-5 h-5 text-[var(--warning)] mt-1" />
            <div>
              <h4 className="font-medium text-[var(--foreground)] mb-1">
                Recomendación de Optimización
              </h4>
              <p className="text-sm text-[var(--muted-foreground)]">
                Considera activar el modo de ahorro energético a las 18:00 para reducir el consumo nocturno en un 15%.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-[var(--success)]10 to-transparent border-l-4 border-[var(--success)]">
            <CheckCircle className="w-5 h-5 text-[var(--success)] mt-1" />
            <div>
              <h4 className="font-medium text-[var(--foreground)] mb-1">
                Predicción Favorable
              </h4>
              <p className="text-sm text-[var(--muted-foreground)]">
                El modelo predice un ahorro del 8% comparado con el mismo día de la semana pasada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}