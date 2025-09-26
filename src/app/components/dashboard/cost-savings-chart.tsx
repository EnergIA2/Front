"use client"

import { useState } from "react"
import { DollarSign, TrendingDown, TrendingUp, Zap, Calendar, Target } from "lucide-react"
import { useCityContext } from "../layout/city-selector"

interface CostData {
  period: string
  actualCost: number
  projectedCost: number
  savings: number
  efficiency: number
}

export function CostSavingsChart() {
  const { selectedCity } = useCityContext()
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly')

  // Datos simulados de costos y ahorros
  const monthlyData: CostData[] = [
    { period: 'Ene', actualCost: 18500, projectedCost: 21200, savings: 2700, efficiency: 87.3 },
    { period: 'Feb', actualCost: 17800, projectedCost: 20800, savings: 3000, efficiency: 88.1 },
    { period: 'Mar', actualCost: 16900, projectedCost: 20100, savings: 3200, efficiency: 89.2 },
    { period: 'Abr', actualCost: 16200, projectedCost: 19500, savings: 3300, efficiency: 89.8 },
    { period: 'May', actualCost: 15800, projectedCost: 19200, savings: 3400, efficiency: 90.1 },
    { period: 'Jun', actualCost: 15400, projectedCost: 18900, savings: 3500, efficiency: 90.5 }
  ]

  const yearlyData: CostData[] = [
    { period: '2022', actualCost: 245000, projectedCost: 280000, savings: 35000, efficiency: 85.2 },
    { period: '2023', actualCost: 220000, projectedCost: 270000, savings: 50000, efficiency: 87.8 },
    { period: '2024', actualCost: 195000, projectedCost: 260000, savings: 65000, efficiency: 90.1 },
    { period: '2025*', actualCost: 175000, projectedCost: 250000, savings: 75000, efficiency: 92.5 }
  ]

  const currentData = viewMode === 'monthly' ? monthlyData : yearlyData
  const maxValue = Math.max(...currentData.map(d => Math.max(d.actualCost, d.projectedCost)))

  // Calcular estadísticas
  const totalSavings = currentData.reduce((sum, item) => sum + item.savings, 0)
  const avgEfficiency = currentData.reduce((sum, item) => sum + item.efficiency, 0) / currentData.length
  const lastPeriodSavings = currentData[currentData.length - 1]?.savings || 0
  const savingsGrowth = currentData.length > 1 ? 
    ((currentData[currentData.length - 1].savings - currentData[0].savings) / currentData[0].savings * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">
            Análisis Costo vs Ahorro
          </h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            Impacto financiero de las optimizaciones energéticas
          </p>
        </div>

        <div className="flex bg-[var(--muted)] rounded-lg p-1">
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'monthly'
                ? 'bg-[var(--card)] text-[var(--primary)] shadow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setViewMode('yearly')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'yearly'
                ? 'bg-[var(--card)] text-[var(--primary)] shadow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            Anual
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Ahorros Totales</span>
          </div>
          <div className="text-2xl font-bold text-green-800">
            S/ {totalSavings.toLocaleString()}
          </div>
          <div className="text-xs text-green-600">
            +{savingsGrowth.toFixed(1)}% vs período anterior
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Eficiencia Actual</span>
          </div>
          <div className="text-2xl font-bold text-blue-800">
            {avgEfficiency.toFixed(1)}%
          </div>
          <div className="text-xs text-blue-600">
            Promedio del período
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Ahorro Mensual</span>
          </div>
          <div className="text-2xl font-bold text-purple-800">
            S/ {lastPeriodSavings.toLocaleString()}
          </div>
          <div className="text-xs text-purple-600">
            Último período
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">ROI Acumulado</span>
          </div>
          <div className="text-2xl font-bold text-orange-800">
            {viewMode === 'monthly' ? '285%' : '340%'}
          </div>
          <div className="text-xs text-orange-600">
            Retorno de inversión
          </div>
        </div>
      </div>

      {/* Visual Chart */}
      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-[var(--foreground)]">
              Comparativa de Costos {viewMode === 'monthly' ? 'Mensual' : 'Anual'}
            </h4>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded"></div>
                <span className="text-[var(--muted-foreground)]">Sin optimización</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-[var(--muted-foreground)]">Costo real</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-[var(--muted-foreground)]">Ahorro</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-4">
            {currentData.map((item, index) => {
              const actualHeight = (item.actualCost / maxValue) * 100
              const projectedHeight = (item.projectedCost / maxValue) * 100
              const savingsHeight = (item.savings / maxValue) * 100

              return (
                <div key={item.period} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[var(--foreground)] w-12">{item.period}</span>
                    <div className="flex-1 mx-4 relative">
                      {/* Background bar (projected cost) */}
                      <div className="w-full bg-red-100 rounded-full h-8 relative overflow-hidden border border-red-200">
                        <div 
                          className="bg-red-400 h-8 rounded-full transition-all duration-1000"
                          style={{ width: `${projectedHeight}%` }}
                        ></div>
                      </div>
                      
                      {/* Actual cost bar */}
                      <div 
                        className="absolute top-0 bg-blue-500 h-8 rounded-full transition-all duration-1000 border-2 border-white"
                        style={{ width: `${actualHeight}%` }}
                      ></div>
                      
                      {/* Savings indicator */}
                      <div 
                        className="absolute top-0 right-0 bg-green-500 h-8 rounded-full transition-all duration-1000 flex items-center justify-center text-white font-bold text-xs"
                        style={{ width: `${savingsHeight}%`, minWidth: '60px' }}
                      >
                        -{((item.savings / item.projectedCost) * 100).toFixed(0)}%
                      </div>
                      
                      {/* Efficiency badge */}
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[var(--info)] text-white text-xs px-2 py-1 rounded-full">
                        {item.efficiency}%
                      </div>
                    </div>
                    
                    <div className="text-right w-32">
                      <div className="font-bold text-[var(--foreground)]">
                        S/ {item.actualCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        -S/ {item.savings.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend and totals */}
        <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center">
          <div className="text-sm text-[var(--muted-foreground)]">
            * Los valores incluyen todas las sedes seleccionadas
          </div>
          <div className="text-right">
            <div className="text-sm text-[var(--muted-foreground)]">Ahorro total acumulado</div>
            <div className="text-xl font-bold text-green-600">
              S/ {totalSavings.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
          <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Tendencia Positiva
          </h4>
          <p className="text-sm text-green-700 mb-3">
            Los ahorros han aumentado consistentemente {savingsGrowth.toFixed(1)}% en el período analizado.
          </p>
          <div className="text-lg font-bold text-green-800">
            Proyección: S/ {(lastPeriodSavings * 1.15).toLocaleString()}/mes
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Próximo Objetivo
          </h4>
          <p className="text-sm text-blue-700 mb-3">
            Alcanzar 95% de eficiencia podría generar S/ 1,200 adicionales/mes.
          </p>
          <div className="text-lg font-bold text-blue-800">
            Meta: S/ {(lastPeriodSavings + 1200).toLocaleString()}/mes
          </div>
        </div>
      </div>
    </div>
  )
}