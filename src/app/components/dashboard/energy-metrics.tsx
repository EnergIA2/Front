"use client"

import { useState, useEffect } from "react"
import { Zap, TrendingDown, TrendingUp, DollarSign, Leaf, AlertTriangle } from "lucide-react"

interface EnergyMetric {
  label: string
  value: string
  change: number
  icon: React.ComponentType<any>
  color: string
  unit: string
}

export function EnergyMetrics() {
  const [metrics, setMetrics] = useState<EnergyMetric[]>([
    {
      label: "Consumo Actual",
      value: "847.5",
      change: -12.3,
      icon: Zap,
      color: "var(--primary)",
      unit: "kWh"
    },
    {
      label: "Eficiencia",
      value: "89.2",
      change: 5.7,
      icon: Leaf,
      color: "var(--success)",
      unit: "%"
    },
    {
      label: "Costo Mensual",
      value: "12,450",
      change: -8.4,
      icon: DollarSign,
      color: "var(--info)",
      unit: "$"
    },
    {
      label: "Ahorro AI",
      value: "2,847",
      change: 15.2,
      icon: TrendingDown,
      color: "var(--accent)",
      unit: "$ ahorrados"
    }
  ])

  // Simular datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.label === "Consumo Actual"
          ? (parseFloat(metric.value) + (Math.random() - 0.5) * 20).toFixed(1)
          : metric.value,
        change: metric.change + (Math.random() - 0.5) * 2
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className="p-6 rounded-2xl glass-effect animate-slide-up hover:scale-105 transition-all duration-300 border border-[var(--border)] group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="p-3 rounded-xl group-hover:scale-110 transition-transform duration-200"
              style={{ backgroundColor: `${metric.color}20` }}
            >
              <metric.icon
                className="w-6 h-6"
                style={{ color: metric.color }}
              />
            </div>
            <div className="flex items-center text-sm">
              {metric.change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-[var(--success)] mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-[var(--destructive)] mr-1" />
              )}
              <span
                className={`font-medium ${
                  metric.change >= 0 ? 'text-[var(--success)]' : 'text-[var(--destructive)]'
                }`}
              >
                {Math.abs(metric.change).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm text-[var(--muted-foreground)] font-medium">
              {metric.label}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[var(--foreground)]">
                {metric.value}
              </span>
              <span className="text-sm text-[var(--muted-foreground)]">
                {metric.unit}
              </span>
            </div>
          </div>

          {/* Indicador de tiempo real */}
          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></div>
            <span className="text-xs text-[var(--muted-foreground)]">En vivo</span>
          </div>
        </div>
      ))}
    </div>
  )
}