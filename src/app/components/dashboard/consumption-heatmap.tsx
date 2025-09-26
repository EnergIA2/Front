"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock, Zap, TrendingUp, TrendingDown, Calendar } from "lucide-react"
import { useCityContext } from "../layout/city-selector"

interface HeatMapData {
  hour: number
  day: string
  consumption: number
  intensity: number // 0-1 para el color
  cost: number
  efficiency: number
}

export function ConsumptionHeatMap() {
  const { selectedCity } = useCityContext()
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today')
  
  // Generar datos del mapa de calor
  const generateHeatMapData = useCallback((): HeatMapData[] => {
    const days = selectedPeriod === 'today' ? ['Hoy'] : 
                 selectedPeriod === 'week' ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] :
                 ['S1', 'S2', 'S3', 'S4'] // Semanas del mes
    
    const data: HeatMapData[] = []
    
    days.forEach((day, dayIndex) => {
      for (let hour = 0; hour < 24; hour++) {
        // Simulación de patrones reales de consumo empresarial
        let baseConsumption = 20 // Consumo base
        
        // Patrones por hora
        if (hour >= 8 && hour <= 18) { // Horario laboral
          baseConsumption += 40 + Math.sin((hour - 8) * Math.PI / 10) * 20
        } else if (hour >= 19 && hour <= 22) { // Horario nocturno con actividad
          baseConsumption += 15
        } else { // Madrugada - solo sistemas críticos
          baseConsumption += 5
        }
        
        // Variación por día de la semana
        if (selectedPeriod === 'week') {
          if (dayIndex === 5 || dayIndex === 6) { // Fin de semana
            baseConsumption *= 0.3
          }
        }
        
        // Añadir variación aleatoria
        const consumption = baseConsumption + (Math.random() - 0.5) * 10
        const maxConsumption = 80
        const intensity = Math.min(consumption / maxConsumption, 1)
        
        data.push({
          hour,
          day,
          consumption: Math.max(consumption, 5),
          intensity,
          cost: consumption * 1.94, // Tarifa por kWh
          efficiency: 85 + (Math.random() * 20) // 85-100% eficiencia
        })
      }
    })
    
    return data
  }, [selectedPeriod])

  const [heatMapData, setHeatMapData] = useState<HeatMapData[]>(generateHeatMapData())

  useEffect(() => {
    setHeatMapData(generateHeatMapData())
  }, [selectedPeriod, generateHeatMapData])

  // Obtener color basado en la intensidad
  const getHeatColor = (intensity: number): string => {
    if (intensity < 0.2) return 'bg-blue-100 text-blue-800'
    if (intensity < 0.4) return 'bg-green-100 text-green-800'
    if (intensity < 0.6) return 'bg-yellow-100 text-yellow-800'
    if (intensity < 0.8) return 'bg-orange-100 text-orange-800'
    return 'bg-red-100 text-red-800'
  }

  const getHeatBorderColor = (intensity: number): string => {
    if (intensity < 0.2) return 'border-blue-200'
    if (intensity < 0.4) return 'border-green-200'
    if (intensity < 0.6) return 'border-yellow-200'
    if (intensity < 0.8) return 'border-orange-200'
    return 'border-red-200'
  }

  // Estadísticas del período
  const stats = {
    totalConsumption: heatMapData.reduce((sum, item) => sum + item.consumption, 0),
    peakHour: heatMapData.reduce((max, item) => item.consumption > max.consumption ? item : max, heatMapData[0]),
    lowHour: heatMapData.reduce((min, item) => item.consumption < min.consumption ? item : min, heatMapData[0]),
    avgEfficiency: heatMapData.reduce((sum, item) => sum + item.efficiency, 0) / heatMapData.length
  }

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const days = selectedPeriod === 'today' ? ['Hoy'] : 
              selectedPeriod === 'week' ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] :
              ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">
            Mapa de Calor - Consumo Energético
          </h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            Patrones de consumo por hora • Identificación de picos y valles
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-[var(--muted)] rounded-lg p-1">
            {[
              { key: 'today', label: 'Hoy' },
              { key: 'week', label: 'Semana' },
              { key: 'month', label: 'Mes' }
            ].map(period => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key as 'today' | 'week' | 'month')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period.key
                    ? 'bg-[var(--card)] text-[var(--primary)] shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm font-medium text-[var(--muted-foreground)]">Total</span>
          </div>
          <div className="text-2xl font-bold text-[var(--foreground)]">
            {stats.totalConsumption.toFixed(0)} kWh
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[var(--destructive)]" />
            <span className="text-sm font-medium text-[var(--muted-foreground)]">Pico</span>
          </div>
          <div className="text-2xl font-bold text-[var(--foreground)]">
            {stats.peakHour.consumption.toFixed(0)} kWh
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">
            {stats.peakHour.hour}:00h • {stats.peakHour.day}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-[var(--success)]" />
            <span className="text-sm font-medium text-[var(--muted-foreground)]">Valle</span>
          </div>
          <div className="text-2xl font-bold text-[var(--foreground)]">
            {stats.lowHour.consumption.toFixed(0)} kWh
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">
            {stats.lowHour.hour}:00h • {stats.lowHour.day}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[var(--info)]" />
            <span className="text-sm font-medium text-[var(--muted-foreground)]">Eficiencia</span>
          </div>
          <div className="text-2xl font-bold text-[var(--foreground)]">
            {stats.avgEfficiency.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Heat Map */}
      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Hour Headers */}
            <div className="grid grid-cols-25 gap-1 mb-2">
              <div className="w-16"></div> {/* Space for day labels */}
              {hours.map(hour => (
                <div key={hour} className="text-xs text-center text-[var(--muted-foreground)] font-medium">
                  {hour === 0 ? '12AM' : hour < 12 ? `${hour}AM` : hour === 12 ? '12PM' : `${hour-12}PM`}
                </div>
              ))}
            </div>

            {/* Heat Map Grid */}
            {days.map((day) => (
              <div key={day} className="grid grid-cols-25 gap-1 mb-1">
                {/* Day Label */}
                <div className="w-16 text-sm font-medium text-[var(--foreground)] flex items-center">
                  {day}
                </div>
                
                {/* Hour Cells */}
                {hours.map(hour => {
                  const dataPoint = heatMapData.find(d => d.day === day && d.hour === hour)
                  if (!dataPoint) return null
                  
                  return (
                    <div
                      key={hour}
                      className={`aspect-square rounded border-2 ${getHeatColor(dataPoint.intensity)} ${getHeatBorderColor(dataPoint.intensity)} flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200 group relative`}
                      title={`${day} ${hour}:00 - ${dataPoint.consumption.toFixed(1)} kWh`}
                    >
                      <span className="text-xs font-bold">
                        {dataPoint.consumption.toFixed(0)}
                      </span>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        <div className="font-semibold">{day} {hour}:00</div>
                        <div>Consumo: {dataPoint.consumption.toFixed(1)} kWh</div>
                        <div>Costo: S/ {dataPoint.cost.toFixed(2)}</div>
                        <div>Eficiencia: {dataPoint.efficiency.toFixed(1)}%</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-[var(--foreground)]">Intensidad:</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-100 border border-blue-200"></div>
              <span className="text-xs text-[var(--muted-foreground)]">Bajo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
              <span className="text-xs text-[var(--muted-foreground)]">Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-200"></div>
              <span className="text-xs text-[var(--muted-foreground)]">Medio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-100 border border-orange-200"></div>
              <span className="text-xs text-[var(--muted-foreground)]">Alto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-100 border border-red-200"></div>
              <span className="text-xs text-[var(--muted-foreground)]">Crítico</span>
            </div>
          </div>
          
          <div className="text-xs text-[var(--muted-foreground)]">
            Hover sobre las celdas para ver detalles
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-[var(--info)]5 to-[var(--primary)]5 border border-[var(--info)]20">
          <h4 className="font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[var(--info)]" />
            Patrón Identificado
          </h4>
          <p className="text-sm text-[var(--muted-foreground)] mb-3">
            Mayor consumo entre 14:00 - 18:00 debido a sistemas HVAC y actividad pico.
          </p>
          <div className="text-sm font-medium text-[var(--info)]">
            Oportunidad: Implementar programación inteligente
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-[var(--success)]5 to-[var(--accent)]5 border border-[var(--success)]20">
          <h4 className="font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-[var(--success)]" />
            Potencial de Ahorro
          </h4>
          <p className="text-sm text-[var(--muted-foreground)] mb-3">
            Consumo base nocturno puede reducirse 40% con gestión automatizada.
          </p>
          <div className="text-sm font-medium text-[var(--success)]">
            Ahorro estimado: S/ 1,200/mes
          </div>
        </div>
      </div>
    </div>
  )
}