"use client"

import { useState, useEffect, useCallback } from "react"

interface HeatMapData {
  hour: number
  day: string
  dayShort: string
  consumption: number
  intensity: number
}

export function ConsumptionHeatMap() {
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily')

  const generateHeatMapData = useCallback((): HeatMapData[] => {
    const data: HeatMapData[] = []

    const daysOfWeek = [
      { full: "Domingo", short: "Dom" },
      { full: "Lunes", short: "Lun" },
      { full: "Martes", short: "Mar" },
      { full: "Miércoles", short: "Mié" },
      { full: "Jueves", short: "Jue" },
      { full: "Viernes", short: "Vie" },
      { full: "Sábado", short: "Sáb" }
    ]

    const monthsOfYear = [
      { full: "Enero", short: "Ene" },
      { full: "Febrero", short: "Feb" },
      { full: "Marzo", short: "Mar" },
      { full: "Abril", short: "Abr" },
      { full: "Mayo", short: "May" },
      { full: "Junio", short: "Jun" },
      { full: "Julio", short: "Jul" },
      { full: "Agosto", short: "Ago" },
      { full: "Septiembre", short: "Sep" },
      { full: "Octubre", short: "Oct" },
      { full: "Noviembre", short: "Nov" },
      { full: "Diciembre", short: "Dic" }
    ]

    const predefinedDailyData = {
      "Dom": [24, 28, 20, 27, 25, 12, 47, 32, 82, 92, 92, 78, 88, 83, 93, 78, 90, 76, 92, 52, 59, 57, 38, 22],
      "Lun": [26, 21, 26, 13, 15, 13, 47, 46, 99, 80, 75, 68, 60, 67, 68, 86, 73, 86, 75, 49, 31, 60, 52, 26],
      "Mar": [11, 15, 12, 12, 21, 14, 44, 31, 63, 68, 66, 95, 91, 75, 78, 96, 90, 74, 75, 38, 33, 55, 50, 19],
      "Mié": [30, 27, 13, 13, 13, 23, 54, 32, 99, 88, 76, 74, 90, 84, 92, 83, 84, 86, 78, 52, 56, 35, 53, 15],
      "Jue": [22, 21, 12, 15, 26, 23, 35, 36, 62, 74, 83, 96, 98, 74, 96, 84, 74, 91, 88, 57, 53, 36, 47, 16],
      "Vie": [10, 21, 16, 19, 22, 11, 15, 19, 20, 23, 45, 38, 60, 31, 51, 47, 53, 58, 45, 42, 40, 18, 26, 22],
      "Sáb": [23, 11, 27, 16, 10, 20, 20, 22, 14, 25, 33, 39, 33, 54, 49, 31, 46, 39, 30, 54, 36, 11, 29, 12]
    }

    const predefinedMonthlyData = {
      "Ene": [2850, 2920, 2780, 2650, 2870, 2990, 3100, 3250, 3180, 3050, 2890, 2750, 2950, 3120, 3200, 3080, 2940, 2850, 2770, 2920, 3050, 3180, 3090, 2980, 2840, 2760, 2890, 3010, 3150, 3220, 3180],
      "Feb": [3200, 3150, 3080, 2950, 2870, 2780, 2920, 3050, 3180, 3250, 3100, 2980, 2850, 2760, 2890, 3020, 3140, 3190, 3060, 2940, 2820, 2750, 2880, 3010, 3130, 3170, 3040, 2920],
      "Mar": [2920, 2850, 2780, 2960, 3080, 3150, 3220, 3180, 3050, 2940, 2820, 2750, 2880, 3000, 3120, 3170, 3040, 2930, 2810, 2740, 2870, 2990, 3110, 3160, 3030, 2920, 2800, 2730, 2860, 2980, 3100],
      "Abr": [3160, 3040, 2930, 2810, 2740, 2870, 2990, 3110, 3170, 3050, 2940, 2820, 2750, 2880, 3000, 3120, 3180, 3060, 2950, 2830, 2760, 2890, 3010, 3130, 3190, 3070, 2960, 2840, 2770, 2900],
      "May": [3020, 3140, 3200, 3080, 2970, 2850, 2780, 2910, 3030, 3150, 3210, 3090, 2980, 2860, 2790, 2920, 3040, 3160, 3220, 3100, 2990, 2870, 2800, 2930, 3050, 3170, 3230, 3110, 3000, 2880, 2810],
      "Jun": [2940, 3060, 3180, 3240, 3120, 3010, 2890, 2820, 2950, 3070, 3190, 3250, 3130, 3020, 2900, 2830, 2960, 3080, 3200, 3260, 3140, 3030, 2910, 2840, 2970, 3090, 3210, 3270, 3150, 3040],
      "Jul": [2920, 2850, 2980, 3100, 3220, 3280, 3160, 3050, 2930, 2860, 2990, 3110, 3230, 3290, 3170, 3060, 2940, 2870, 3000, 3120, 3240, 3300, 3180, 3070, 2950, 2880, 3010, 3130, 3250, 3310, 3190],
      "Ago": [3080, 2970, 2890, 3020, 3140, 3260, 3320, 3200, 3090, 2980, 2900, 3030, 3150, 3270, 3330, 3210, 3100, 2990, 2910, 3040, 3160, 3280, 3340, 3220, 3110, 3000, 2920, 3050, 3170, 3290, 3350],
      "Sep": [3230, 3120, 3010, 2930, 3060, 3180, 3300, 3360, 3240, 3130, 3020, 2940, 3070, 3190, 3310, 3370, 3250, 3140, 3030, 2950, 3080, 3200, 3320, 3380, 3260, 3150, 3040, 2960, 3090, 3210],
      "Oct": [3330, 3390, 3270, 3160, 3050, 2970, 3100, 3220, 3340, 3400, 3280, 3170, 3060, 2980, 3110, 3230, 3350, 3410, 3290, 3180, 3070, 2990, 3120, 3240, 3360, 3420, 3300, 3190, 3080, 3000, 3130],
      "Nov": [3250, 3370, 3430, 3310, 3200, 3090, 3010, 3140, 3260, 3380, 3440, 3320, 3210, 3100, 3020, 3150, 3270, 3390, 3450, 3330, 3220, 3110, 3030, 3160, 3280, 3400, 3460, 3340, 3230, 3120],
      "Dic": [3040, 3170, 3290, 3410, 3470, 3350, 3240, 3130, 3050, 3180, 3300, 3420, 3480, 3360, 3250, 3140, 3060, 3190, 3310, 3430, 3490, 3370, 3260, 3150, 3070, 3200, 3320, 3440, 3500, 3380, 3270]
    }

    if (viewMode === 'daily') {
      daysOfWeek.forEach((day) => {
        const dayData = predefinedDailyData[day.short as keyof typeof predefinedDailyData] || []

        for (let hour = 0; hour < 24; hour++) {
          const consumption = dayData[hour] || 0
          const maxConsumption = 99
          const intensity = Math.max(0, Math.min(consumption / maxConsumption, 1))

          data.push({
            hour,
            day: day.full,
            dayShort: day.short,
            consumption,
            intensity
          })
        }
      })
    } else {
      // Monthly view
      monthsOfYear.forEach((month) => {
        const monthData = predefinedMonthlyData[month.short as keyof typeof predefinedMonthlyData] || []

        for (let day = 1; day <= 31; day++) {
          const consumption = monthData[day - 1] || 0
          const maxConsumption = 3500 // Maximum for monthly data
          const intensity = Math.max(0, Math.min(consumption / maxConsumption, 1))

          data.push({
            hour: day, // Using hour field for day number in monthly view
            day: month.full,
            dayShort: month.short,
            consumption,
            intensity
          })
        }
      })
    }

    return data
  }, [viewMode])

  const [heatMapData, setHeatMapData] = useState<HeatMapData[]>([])

  useEffect(() => {
    setMounted(true)
    setHeatMapData(generateHeatMapData())
  }, [generateHeatMapData, viewMode])

  // Colores de la paleta del logo - gradiente coral
  const getHeatColor = (intensity: number): string => {
    if (intensity < 0.15) return 'text-[var(--foreground)]'  // Sin color de fondo, solo borde
    if (intensity < 0.3) return 'text-[var(--foreground)]'   // Rosa muy suave
    if (intensity < 0.5) return 'text-[var(--foreground)]'
    if (intensity < 0.7) return 'text-white'
    if (intensity < 0.85) return 'text-white'
    return 'text-white'
  }

  const getHeatBgColor = (intensity: number): string => {
    const alpha = Math.max(0.1, intensity)
    return `rgba(255, 154, 158, ${alpha})`  // Rosa coral con opacidad variable
  }

  const hours = viewMode === 'daily' 
    ? Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
    : Array.from({ length: 31 }, (_, i) => (i + 1).toString())

  const timeLabels = viewMode === 'daily'
    ? [
        { full: "Domingo", short: "Dom" },
        { full: "Lunes", short: "Lun" },
        { full: "Martes", short: "Mar" },
        { full: "Miércoles", short: "Mié" },
        { full: "Jueves", short: "Jue" },
        { full: "Viernes", short: "Vie" },
        { full: "Sábado", short: "Sáb" }
      ]
    : [
        { full: "Enero", short: "Ene" },
        { full: "Febrero", short: "Feb" },
        { full: "Marzo", short: "Mar" },
        { full: "Abril", short: "Abr" },
        { full: "Mayo", short: "May" },
        { full: "Junio", short: "Jun" },
        { full: "Julio", short: "Jul" },
        { full: "Agosto", short: "Ago" },
        { full: "Septiembre", short: "Sep" },
        { full: "Octubre", short: "Oct" },
        { full: "Noviembre", short: "Nov" },
        { full: "Diciembre", short: "Dic" }
      ]

  if (!mounted || heatMapData.length === 0) {
    return (
      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[var(--foreground)]">
            Análisis Detallado
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-4 h-4 bg-orange-200 rounded-sm"></div>
            <p className="text-sm text-[var(--muted-foreground)]">
              Mapa de Calor - Consumo por Horas
            </p>
          </div>
        </div>
        <div className="h-64 bg-[var(--muted)] rounded-lg animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="p-3 md:p-6">
      <div className="mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-[var(--foreground)] mb-1">
              Patrones de Uso
            </h3>
            <p className="text-xs md:text-sm text-[var(--muted-foreground)]">
              {viewMode === 'daily' ? 'Intensidad por hora y día' : 'Consumo por día y mes'}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'daily'
                  ? 'text-white'
                  : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
              }`}
              style={{
                backgroundColor: viewMode === 'daily' ? '#ff9a9e' : undefined
              }}
            >
              Diario
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'monthly'
                  ? 'text-white'
                  : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
              }`}
              style={{
                backgroundColor: viewMode === 'monthly' ? '#ff9a9e' : undefined
              }}
            >
              Mensual
            </button>
          </div>
        </div>
      </div>

      {/* Intensity indicator */}
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
        <span className="text-xs text-[var(--muted-foreground)] font-medium">Intensidad:</span>
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-xs text-[var(--muted-foreground)]">Bajo</span>
          <div className="flex items-center gap-1">
            <div 
              className="w-2 h-2 md:w-3 md:h-3 rounded-sm border border-border/30"
              style={{ backgroundColor: 'rgba(255, 154, 158, 0.1)' }}
            ></div>
            <div 
              className="w-2 h-2 md:w-3 md:h-3 rounded-sm border border-border/30"
              style={{ backgroundColor: 'rgba(255, 154, 158, 0.3)' }}
            ></div>
            <div 
              className="w-2 h-2 md:w-3 md:h-3 rounded-sm border border-border/30"
              style={{ backgroundColor: 'rgba(255, 154, 158, 0.5)' }}
            ></div>
            <div 
              className="w-2 h-2 md:w-3 md:h-3 rounded-sm border border-border/30"
              style={{ backgroundColor: 'rgba(255, 154, 158, 0.7)' }}
            ></div>
            <div 
              className="w-2 h-2 md:w-3 md:h-3 rounded-sm border border-border/30"
              style={{ backgroundColor: 'rgba(255, 154, 158, 0.85)' }}
            ></div>
            <div 
              className="w-2 h-2 md:w-3 md:h-3 rounded-sm border border-border/30"
              style={{ backgroundColor: 'rgba(255, 154, 158, 1)' }}
            ></div>
          </div>
          <span className="text-xs text-[var(--muted-foreground)]">Alto</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto -mx-1 md:-mx-2">
        <div className={`${viewMode === 'daily' ? 'min-w-[550px] md:min-w-[650px]' : 'min-w-[750px] md:min-w-[850px]'} px-1 md:px-2`}>
          {/* Hour/Day headers */}
          <div className={`grid ${viewMode === 'daily' ? 'grid-cols-25' : 'grid-cols-32'} gap-0.5 md:gap-1 mb-2`}>
            <div className="w-8 md:w-10"></div>
            {hours.map(hour => (
              <div key={hour} className="text-center text-xs text-[var(--muted-foreground)] py-1 font-medium">
                {viewMode === 'daily' ? hour : hour}
              </div>
            ))}
          </div>

          {/* Heatmap rows */}
          <div className="space-y-0.5 md:space-y-1">
            {timeLabels.map((label) => (
              <div key={label.short} className={`grid ${viewMode === 'daily' ? 'grid-cols-25' : 'grid-cols-32'} gap-0.5 md:gap-1`}>
                {/* Day/Month label */}
                <div className="w-8 md:w-10 text-xs font-medium text-[var(--foreground)] flex items-center justify-center py-1 md:py-2">
                  {label.short}
                </div>

                {/* Hour/Day cells */}
                {hours.map((hour, hourIndex) => {
                  const dataPoint = heatMapData.find(d => d.dayShort === label.short && d.hour === (viewMode === 'daily' ? hourIndex : hourIndex + 1))
                  if (!dataPoint) return <div key={hour} className="aspect-square bg-[var(--muted)] text-xs flex items-center justify-center rounded-sm">0</div>

                  return (
                    <div
                      key={hour}
                      className={`aspect-square ${getHeatColor(dataPoint.intensity)} text-xs font-medium flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 group relative rounded-sm border border-border/30`}
                      style={{
                        backgroundColor: getHeatBgColor(dataPoint.intensity)
                      }}
                      title={viewMode === 'daily' 
                        ? `${label.full} ${hour}:00 - ${dataPoint.consumption} kWh`
                        : `${label.full} día ${hour} - ${dataPoint.consumption} kWh`
                      }
                    >
                      <span className={`${viewMode === 'monthly' ? 'text-xs' : 'text-xs md:text-sm'}`}>
                        {viewMode === 'monthly' && dataPoint.consumption > 999 
                          ? `${(dataPoint.consumption / 1000).toFixed(1)}k`
                          : dataPoint.consumption
                        }
                      </span>

                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        <div>
                          {viewMode === 'daily' 
                            ? `${label.full} ${hour}:00`
                            : `${label.full} día ${hour}`
                          }
                        </div>
                        <div>{dataPoint.consumption} kWh</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom insights */}
        <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {viewMode === 'daily' ? (
            <>
              <div className="text-center p-3 md:p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-sm font-semibold text-blue-700">8-18h</div>
                <div className="text-xs text-blue-600 mt-1">Pico Laboral</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-lg bg-purple-50 border border-purple-200">
                <div className="text-sm font-semibold text-purple-700">22-6h</div>
                <div className="text-xs text-purple-600 mt-1">Base Nocturna</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-lg bg-[var(--muted)] border border-[var(--border)]">
                <div className="text-sm font-semibold text-[var(--foreground)]">Fin de Semana</div>
                <div className="text-xs text-[var(--muted-foreground)] mt-1">-40% vs Laboral</div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center p-3 md:p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="text-sm font-semibold text-green-700">Ene-Mar</div>
                <div className="text-xs text-green-600 mt-1">Menor Consumo</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-lg bg-orange-50 border border-orange-200">
                <div className="text-sm font-semibold text-orange-700">Jul-Sep</div>
                <div className="text-xs text-orange-600 mt-1">Pico Verano</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-lg bg-[var(--muted)] border border-[var(--border)]">
                <div className="text-sm font-semibold text-[var(--foreground)]">Oct-Dic</div>
                <div className="text-xs text-[var(--muted-foreground)] mt-1">Alto Invierno</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}