"use client"

import { useState, useEffect } from "react"
import { Zap, DollarSign, Leaf, Target, Clock, Calendar } from "lucide-react"

interface MetricCard {
  label: string
  hourlyValue: string
  monthlyValue: string
  unit: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  iconColor: string
  iconBg: string
  showProgress?: boolean
  progressValue?: number
  progressLabel?: string
  progressColor?: string
  isAdjustable?: boolean
}

export function EnergyMetrics() {
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<'hourly' | 'monthly'>('hourly')
  const [tarifaPorKwh, setTarifaPorKwh] = useState(0.300)
  const [factorCarbono, setFactorCarbono] = useState(0.45)

  // Colores de la paleta del logo
  const colors = {
    primary: '#ff9a9e',    // Rosa coral suave
    secondary: '#a8e6cf',  // Verde menta
    tertiary: '#88d8f3',   // Azul cielo
    quaternary: '#f7dc6f'  // Amarillo suave
  }

  const [metrics] = useState<MetricCard[]>([
    {
      label: "Consumo Total",
      hourlyValue: "291.7",
      monthlyValue: "8750",
      unit: "kWh",
      description: viewMode === 'hourly' ? "Última hora" : "Últimos 30 días",
      icon: Zap,
      iconColor: colors.primary,
      iconBg: `${colors.primary}15`
    },
    {
      label: "Costo Total",
      hourlyValue: "87.5",
      monthlyValue: "2625",
      unit: "S/",
      description: viewMode === 'hourly' ? "Última hora" : "Últimos 30 días",
      icon: DollarSign,
      iconColor: colors.secondary,
      iconBg: `${colors.secondary}15`,
      showProgress: true,
      progressValue: 75,
      progressLabel: "Tarifa por kWh",
      progressColor: colors.secondary,
      isAdjustable: true
    },
    {
      label: "Emisiones CO₂",
      hourlyValue: "131.3",
      monthlyValue: "3937.5",
      unit: "kg",
      description: viewMode === 'hourly' ? "Última hora" : "Últimos 30 días",
      icon: Leaf,
      iconColor: colors.tertiary,
      iconBg: `${colors.tertiary}15`,
      showProgress: true,
      progressValue: 45,
      progressLabel: "Factor de Carbono",
      progressColor: colors.tertiary,
      isAdjustable: true
    },
    {
      label: "Meta",
      hourlyValue: "247.9",
      monthlyValue: "7437.5",
      unit: "kWh",
      description: viewMode === 'hourly' ? "Objetivo por hora" : "Objetivo mensual",
      icon: Target,
      iconColor: colors.quaternary,
      iconBg: `${colors.quaternary}15`
    }
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-[var(--card)] rounded-2xl p-6 shadow-sm border border-[var(--border)] animate-pulse"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[var(--muted)] rounded-full"></div>
                <div className="flex-1">
                  <div className="w-24 h-4 bg-[var(--muted)] rounded mb-2"></div>
                  <div className="w-16 h-3 bg-[var(--muted)] rounded"></div>
                </div>
              </div>
              <div className="w-32 h-8 bg-[var(--muted)] rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Toggle Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Métricas Energéticas
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            {viewMode === 'hourly' ? 'Vista por hora - Tiempo real' : 'Vista mensual - Acumulado'}
          </p>
        </div>
        
        {/* Toggle Buttons */}
        <div className="flex items-center bg-[var(--muted)] rounded-lg p-1">
          <button
            onClick={() => setViewMode('hourly')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === 'hourly'
                ? 'text-white shadow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
            style={viewMode === 'hourly' ? { backgroundColor: colors.primary } : {}}
          >
            <Clock className="w-4 h-4" />
            Por Hora
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === 'monthly'
                ? 'text-white shadow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
            style={viewMode === 'monthly' ? { backgroundColor: colors.primary } : {}}
          >
            <Calendar className="w-4 h-4" />
            Por Mes
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-[var(--card)] rounded-2xl p-6 shadow-sm border border-[var(--border)] hover:shadow-md transition-all duration-300"
          >
            {/* Header with icon and title */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: metric.iconBg }}
              >
                <metric.icon
                  className="w-6 h-6"
                  style={{ color: metric.iconColor }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[var(--foreground)] mb-1">
                  {metric.label}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {metric.description}
                </p>
              </div>
            </div>

            {/* Main value */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[var(--foreground)]">
                  {viewMode === 'hourly' ? metric.hourlyValue : metric.monthlyValue}
                </span>
                <span className="text-base text-[var(--muted-foreground)] font-medium">
                  {metric.unit}
                </span>
              </div>
            </div>

          {/* Progress bar (for adjustable metrics) */}
          {metric.showProgress && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[var(--muted-foreground)] font-medium">
                  {metric.progressLabel}
                </span>
                <span className="text-xs font-semibold" style={{ color: metric.progressColor }}>
                  {metric.label === 'Costo Total' ? `$${tarifaPorKwh.toFixed(3)}` : `${factorCarbono.toFixed(2)} kg/kWh`}
                </span>
              </div>

              {metric.isAdjustable ? (
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="range"
                      min={metric.label === 'Costo Total' ? "0.100" : "0.20"}
                      max={metric.label === 'Costo Total' ? "0.500" : "0.80"}
                      step={metric.label === 'Costo Total' ? "0.001" : "0.01"}
                      value={metric.label === 'Costo Total' ? tarifaPorKwh : factorCarbono}
                      onChange={(e) => {
                        if (metric.label === 'Costo Total') {
                          setTarifaPorKwh(parseFloat(e.target.value))
                        } else {
                          setFactorCarbono(parseFloat(e.target.value))
                        }
                      }}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[var(--muted)] slider-thumb"
                      style={{
                        background: `linear-gradient(to right, ${metric.progressColor} 0%, ${metric.progressColor} ${
                          metric.label === 'Costo Total'
                            ? ((tarifaPorKwh - 0.1) / (0.5 - 0.1)) * 100
                            : ((factorCarbono - 0.2) / (0.8 - 0.2)) * 100
                        }%, #F3F4F6 ${
                          metric.label === 'Costo Total'
                            ? ((tarifaPorKwh - 0.1) / (0.5 - 0.1)) * 100
                            : ((factorCarbono - 0.2) / (0.8 - 0.2)) * 100
                        }%, #F3F4F6 100%)`
                      }}
                    />
                  </div>
                  <style jsx>{`
                    .slider-thumb::-webkit-slider-thumb {
                      appearance: none;
                      width: 16px;
                      height: 16px;
                      border-radius: 50%;
                      background: ${metric.progressColor};
                      border: 2px solid white;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                      cursor: pointer;
                      transition: all 0.2s ease;
                    }
                    .slider-thumb::-webkit-slider-thumb:hover {
                      transform: scale(1.1);
                      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
                    }
                    .slider-thumb::-moz-range-thumb {
                      width: 16px;
                      height: 16px;
                      border-radius: 50%;
                      background: ${metric.progressColor};
                      border: 2px solid white;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                      cursor: pointer;
                      transition: all 0.2s ease;
                    }
                  `}</style>
                </div>
              ) : (
                <div className="w-full bg-[var(--muted)] rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: metric.progressColor,
                      width: `${metric.progressValue}%`
                    }}
                  />
                </div>
              )}
            </div>
          )}
            </div>
          ))}
        </div>
      </div>
    )
  }