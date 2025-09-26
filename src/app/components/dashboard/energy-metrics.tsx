"use client"

import { useState, useEffect, useCallback } from "react"
import { Zap, TrendingDown, TrendingUp, DollarSign, AlertTriangle, MapPin, CheckCircle } from "lucide-react"
import { useCityContext } from "../layout/city-selector"

interface EnergyMetric {
  label: string
  value: string
  change: number
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
  unit: string
  status: 'Normal' | 'Alerta' | 'Crítico'
}

export function EnergyMetrics() {
  const { selectedCity, cities, getCityData } = useCityContext()
  const [mounted, setMounted] = useState(false)
  
  const getMetricsForCity = useCallback(() => {
    if (selectedCity === 'todas') {
      // Datos consolidados - solo las métricas más importantes
      const totalConsumption = cities.reduce((sum, city) => sum + city.consumption, 0)
      const totalCost = cities.reduce((sum, city) => sum + city.cost, 0)
      
      return [
        {
          label: "Consumo Hoy",
          value: totalConsumption.toFixed(1),
          change: -5.2,
          icon: Zap,
          color: "#10B981", // Verde
          unit: "kWh • Todas las sedes",
          status: 'Normal' as const
        },
        {
          label: "Costo Diario",
          value: "S/ " + (totalCost * 0.032).toFixed(0), // Aproximación diaria
          change: -3.1,
          icon: DollarSign,
          color: "#F97316", // Naranja
          unit: "Tarifa promedio S/ 1.94",
          status: 'Normal' as const
        },
        {
          label: "Eficiencia Global",
          value: "89.2",
          change: 5.7,
          icon: TrendingUp,
          color: "#10B981", // Verde
          unit: "% • +12% vs sector",
          status: 'Normal' as const
        },
        {
          label: "Ahorro del Mes",
          value: "S/ 2,847",
          change: 15.2,
          icon: TrendingDown,
          color: "#F97316", // Naranja
          unit: "Con optimización IA",
          status: 'Normal' as const
        }
      ]
    } else {
      // Datos específicos de ciudad - métricas relevantes
      const cityData = getCityData(selectedCity)
      if (!cityData) return []
      
      return [
        {
          label: "Consumo Hoy",
          value: cityData.consumption.toFixed(1),
          change: -2.3,
          icon: Zap,
          color: "#10B981", // Verde
          unit: `kWh • ${cityData.name}`,
          status: cityData.status
        },
        {
          label: "Costo Diario",
          value: "S/ " + (cityData.cost * 0.032).toFixed(0),
          change: -1.8,
          icon: DollarSign,
          color: "#F97316", // Naranja
          unit: "Tarifa S/ 1.94",
          status: cityData.status
        },
        {
          label: "Estado Operativo",
          value: cityData.status,
          change: cityData.status === 'Normal' ? 0 : -5.2,
          icon: cityData.status === 'Normal' ? CheckCircle : AlertTriangle,
          color: cityData.status === 'Normal' ? "var(--success)" : "var(--warning)",
          unit: "Monitoreo en tiempo real",
          status: cityData.status
        },
        {
          label: "vs. Promedio",
          value: "+12.3",
          change: 3.1,
          icon: TrendingUp,
          color: "#F97316", // Naranja
          unit: "% mejor que otras sedes",
          status: cityData.status
        }
      ]
    }
  }, [selectedCity, cities, getCityData])

  const [metrics, setMetrics] = useState<EnergyMetric[]>(getMetricsForCity())

  // Set mounted state and update metrics when city changes
  useEffect(() => {
    setMounted(true)
    setMetrics(getMetricsForCity())
  }, [selectedCity, cities, getMetricsForCity])

  // Simular datos en tiempo real - solo después del montaje para evitar hydration mismatch
  useEffect(() => {
    if (!mounted) return
    
    let interval: NodeJS.Timeout
    
    // Wait a bit before starting real-time updates to avoid hydration issues
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setMetrics(prev => prev.map(metric => ({
          ...metric,
          value: metric.label.includes("Consumo")
            ? (parseFloat(metric.value.replace(',', '')) + (Math.random() - 0.5) * 0.5).toFixed(2)
            : metric.value,
          change: metric.change + (Math.random() - 0.5) * 1
        })))
      }, 5000)
    }, 2000)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [selectedCity, mounted])

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[var(--muted)] rounded-lg"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--muted)]"></div>
                <div className="w-12 h-4 bg-[var(--muted)] rounded"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-24 h-4 bg-[var(--muted)] rounded"></div>
              <div className="w-16 h-8 bg-[var(--muted)] rounded"></div>
              <div className="w-32 h-3 bg-[var(--muted)] rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] animate-slide-up hover:scale-[1.02] hover:shadow-md transition-all duration-300 group"
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="p-2 rounded-lg transition-all duration-200"
              style={{ backgroundColor: `${metric.color}20` }}
            >
              <metric.icon
                className="w-5 h-5"
                style={{ color: metric.color }}
              />
            </div>
            <div className="flex items-center gap-2">
              {/* Status indicator */}
              <div className="flex items-center gap-1">
                <div 
                  className={`w-2 h-2 rounded-full ${
                    metric.status === 'Normal' ? 'bg-[var(--success)]' :
                    metric.status === 'Alerta' ? 'bg-[var(--warning)]' : 'bg-[var(--destructive)]'
                  }`}
                />
                <span className={`text-xs font-medium ${
                  metric.status === 'Normal' ? 'text-[var(--success)]' :
                  metric.status === 'Alerta' ? 'text-[var(--warning)]' : 'text-[var(--destructive)]'
                }`}>
                  {metric.status}
                </span>
              </div>
              
              <div className="flex items-center text-sm">
                {metric.change >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span
                  className={`font-medium ${
                    metric.change >= 0 ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {Math.abs(metric.change).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm text-[var(--muted-foreground)] font-medium">
              {metric.label}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[var(--foreground)]">
                {metric.value}
              </span>
            </div>
            <div className="text-xs text-[var(--muted-foreground)]">
              {metric.unit}
            </div>
          </div>

          {/* Indicador de tiempo real */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></div>
              <span className="text-xs text-[var(--muted-foreground)]">En vivo</span>
            </div>
            {selectedCity !== 'todas' && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[var(--primary)]" />
                <span className="text-xs text-[var(--primary)]">
                  {getCityData(selectedCity)?.name}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}