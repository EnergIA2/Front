"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Zap } from "lucide-react"

export function AnalyticsSection() {
  const [timeRange, setTimeRange] = useState("7d")

  const analyticsData = [
    {
      title: "Consumo por Horario",
      value: "Peak: 14:00 - 18:00",
      change: "+12%",
      trend: "up",
      icon: Activity,
      description: "Horas de mayor consumo energético"
    },
    {
      title: "Eficiencia Semanal",
      value: "87.3%",
      change: "-2.1%",
      trend: "down",
      icon: Zap,
      description: "Promedio de eficiencia energética"
    },
    {
      title: "Costo por kWh",
      value: "$0.142",
      change: "+5.8%",
      trend: "up",
      icon: TrendingUp,
      description: "Precio promedio por kilovatio-hora"
    },
    {
      title: "Ahorro Acumulado",
      value: "$8,420",
      change: "+18.2%",
      trend: "up",
      icon: TrendingDown,
      description: "Total ahorrado este mes"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
            Análisis Energético
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Análisis detallado de patrones y tendencias de consumo
          </p>
        </div>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          <option value="24h">Últimas 24h</option>
          <option value="7d">Última semana</option>
          <option value="30d">Último mes</option>
          <option value="90d">Últimos 3 meses</option>
        </select>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData.map((item, index) => (
          <div
            key={item.title}
            className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] animate-slide-up hover:scale-[1.02] hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `var(--${item.trend === 'up' ? 'success' : 'warning'})20` }}
              >
                <item.icon
                  className="w-5 h-5"
                  style={{ color: `var(--${item.trend === 'up' ? 'success' : 'warning'})` }}
                />
              </div>
              <span
                className={`text-sm font-medium ${
                  item.trend === 'up' ? 'text-[var(--success)]' : 'text-[var(--warning)]'
                }`}
              >
                {item.change}
              </span>
            </div>

            <h3 className="text-sm text-[var(--muted-foreground)] font-medium mb-1">
              {item.title}
            </h3>
            <div className="text-xl font-bold text-[var(--foreground)] mb-2">
              {item.value}
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consumption Trends */}
        <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="text-lg font-bold text-[var(--foreground)]">Tendencias de Consumo</h3>
          </div>
          <div className="h-48 flex items-center justify-center bg-[var(--muted)] rounded-lg">
            <p className="text-[var(--muted-foreground)]">Gráfico de tendencias</p>
          </div>
        </div>

        {/* Energy Distribution */}
        <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <div className="flex items-center gap-3 mb-4">
            <PieChart className="w-5 h-5 text-[var(--accent)]" />
            <h3 className="text-lg font-bold text-[var(--foreground)]">Distribución por Área</h3>
          </div>
          <div className="h-48 flex items-center justify-center bg-[var(--muted)] rounded-lg">
            <p className="text-[var(--muted-foreground)]">Gráfico de distribución</p>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Análisis Detallado</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
            <span className="text-[var(--foreground)]">Promedio de consumo diario</span>
            <span className="font-bold text-[var(--foreground)]">847.5 kWh</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
            <span className="text-[var(--foreground)]">Eficiencia vs. mes anterior</span>
            <span className="font-bold text-[var(--success)]">+5.2%</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-[var(--border)]">
            <span className="text-[var(--foreground)]">Predicción para próximo mes</span>
            <span className="font-bold text-[var(--info)]">792.3 kWh/día</span>
          </div>
        </div>
      </div>
    </div>
  )
}