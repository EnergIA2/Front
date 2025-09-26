"use client"

import { useState } from "react"
import { TrendingUp, Target, Award, AlertTriangle, CheckCircle } from "lucide-react"
import { useCityContext } from "../layout/city-selector"

interface EfficiencyData {
  category: string
  current: number
  target: number
  benchmark: number
  status: 'excellent' | 'good' | 'warning' | 'critical'
  improvement: number
}

export function EfficiencyVisualChart() {
  const { selectedCity } = useCityContext()

  const efficiencyData: EfficiencyData[] = [
    {
      category: 'HVAC',
      current: 87,
      target: 90,
      benchmark: 85,
      status: 'good',
      improvement: 12
    },
    {
      category: 'Iluminación',
      current: 94,
      target: 95,
      benchmark: 88,
      status: 'excellent',
      improvement: 8
    },
    {
      category: 'Equipos',
      current: 78,
      target: 85,
      benchmark: 80,
      status: 'warning',
      improvement: 18
    },
    {
      category: 'Servidores',
      current: 91,
      target: 92,
      benchmark: 89,
      status: 'excellent',
      improvement: 5
    },
    {
      category: 'Base Nocturna',
      current: 65,
      target: 80,
      benchmark: 75,
      status: 'critical',
      improvement: 35
    }
  ]

  const getStatusColor = (status: EfficiencyData['status']) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200'
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
    }
  }

  const getStatusIcon = (status: EfficiencyData['status']) => {
    switch (status) {
      case 'excellent': return CheckCircle
      case 'good': return CheckCircle
      case 'warning': return AlertTriangle
      case 'critical': return AlertTriangle
    }
  }

  const getProgressColor = (current: number, target: number) => {
    const ratio = current / target
    if (ratio >= 0.95) return 'bg-green-500'
    if (ratio >= 0.85) return 'bg-blue-500'
    if (ratio >= 0.75) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const overallEfficiency = efficiencyData.reduce((sum, item) => sum + item.current, 0) / efficiencyData.length
  const overallTarget = efficiencyData.reduce((sum, item) => sum + item.target, 0) / efficiencyData.length

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-[var(--primary)]5 to-[var(--accent)]5 border border-[var(--primary)]20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">
              Eficiencia General
            </h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Rendimiento por categoría vs objetivos
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[var(--primary)]">
              {overallEfficiency.toFixed(1)}%
            </div>
            <div className="text-sm text-[var(--muted-foreground)]">
              Meta: {overallTarget.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className={`h-3 rounded-full ${getProgressColor(overallEfficiency, overallTarget)} transition-all duration-500`}
              style={{ width: `${Math.min((overallEfficiency / 100) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
            <span>0%</span>
            <span className="text-[var(--primary)] font-medium">
              {(overallEfficiency - overallTarget) >= 0 ? '+' : ''}{(overallEfficiency - overallTarget).toFixed(1)}% vs meta
            </span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-4">
        {efficiencyData.map((item, index) => {
          const StatusIcon = getStatusIcon(item.status)
          const progressWidth = Math.min((item.current / 100) * 100, 100)
          const targetPosition = (item.target / 100) * 100
          const benchmarkPosition = (item.benchmark / 100) * 100

          return (
            <div
              key={item.category}
              className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:shadow-md transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${getStatusColor(item.status)}`}>
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--foreground)]">{item.category}</h4>
                    <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                      <span>Actual: {item.current}%</span>
                      <span>Meta: {item.target}%</span>
                      <span>Sector: {item.benchmark}%</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-[var(--foreground)]">
                    {item.current}%
                  </div>
                  <div className={`text-sm font-medium ${
                    item.improvement > 20 ? 'text-red-600' :
                    item.improvement > 10 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {item.improvement}% potencial
                  </div>
                </div>
              </div>

              {/* Visual Progress Bar with Markers */}
              <div className="relative mb-3">
                <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                  {/* Current Progress */}
                  <div 
                    className={`h-4 rounded-full ${getProgressColor(item.current, item.target)} transition-all duration-700`}
                    style={{ width: `${progressWidth}%` }}
                  ></div>
                  
                  {/* Target Marker */}
                  <div 
                    className="absolute top-0 h-4 w-1 bg-gray-800 opacity-70"
                    style={{ left: `${targetPosition}%` }}
                    title={`Meta: ${item.target}%`}
                  ></div>
                  
                  {/* Benchmark Marker */}
                  <div 
                    className="absolute top-0 h-4 w-1 bg-blue-600 opacity-70"
                    style={{ left: `${benchmarkPosition}%` }}
                    title={`Benchmark: ${item.benchmark}%`}
                  ></div>
                </div>

                {/* Progress Labels */}
                <div className="flex justify-between mt-1">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-800 rounded"></div>
                      <span className="text-[var(--muted-foreground)]">Meta</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-600 rounded"></div>
                      <span className="text-[var(--muted-foreground)]">Sector</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-[var(--muted-foreground)]">
                    {item.current > item.target ? 
                      `+${(item.current - item.target).toFixed(1)}% sobre meta` :
                      `${(item.target - item.current).toFixed(1)}% para meta`
                    }
                  </div>
                </div>
              </div>

              {/* Action Recommendation */}
              <div className="p-3 rounded-lg bg-[var(--muted)] border-l-4 border-l-[var(--info)]">
                <div className="text-sm text-[var(--foreground)]">
                  {item.status === 'critical' && 
                    `⚠️ Crítico: Implementar mejoras inmediatas puede ahorrar S/ ${(item.improvement * 45).toFixed(0)}/mes`
                  }
                  {item.status === 'warning' && 
                    `⚡ Oportunidad: Optimizar para alcanzar S/ ${(item.improvement * 25).toFixed(0)}/mes en ahorros`
                  }
                  {item.status === 'good' && 
                    `✅ Buen rendimiento: Mantener nivel actual, potencial adicional de S/ ${(item.improvement * 15).toFixed(0)}/mes`
                  }
                  {item.status === 'excellent' && 
                    `🏆 Excelente: Líder en eficiencia, oportunidad de S/ ${(item.improvement * 10).toFixed(0)}/mes`
                  }
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-green-50 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-green-600" />
            <span className="font-bold text-green-800">Fortalezas</span>
          </div>
          <p className="text-sm text-green-700">
            Iluminación y servidores operando por encima del benchmark sectorial
          </p>
        </div>

        <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-yellow-800">Oportunidades</span>
          </div>
          <p className="text-sm text-yellow-700">
            Base nocturna y equipos con mayor potencial de mejora
          </p>
        </div>

        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-800">Impacto</span>
          </div>
          <p className="text-sm text-blue-700">
            Implementar todas las mejoras: <strong>+S/ 3,500/mes</strong>
          </p>
        </div>
      </div>
    </div>
  )
}