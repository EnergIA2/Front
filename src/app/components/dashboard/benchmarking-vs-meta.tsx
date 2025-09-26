"use client"

import { useState, useEffect } from "react"

export function BenchmarkingVsMeta() {
  const [mounted, setMounted] = useState(false)

  // Colores de la paleta del logo
  const colors = {
    primary: '#ff9a9e',    // Rosa coral suave
    secondary: '#a8e6cf',  // Verde menta
    tertiary: '#88d8f3',   // Azul cielo
    quaternary: '#f7dc6f'  // Amarillo suave
  }

  // Data from the image
  const currentConsumption = 86 // kWh/m²/mes actual
  const previousConsumption = 92 // kWh/m²/mes anterior
  const targetConsumption = 85  // Meta: 85 kWh/m²/mes
  const efficiency = "Buena"

  // Calculate if we're exceeding target
  const isOverTarget = currentConsumption > targetConsumption
  const progressPercentage = Math.min((currentConsumption / 100) * 100, 100)
  const monthChangeValue = ((currentConsumption - previousConsumption) / previousConsumption * 100)
  const monthChange = monthChangeValue.toFixed(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        <div className="animate-pulse">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-[var(--muted)] rounded-full"></div>
            <div className="w-32 h-4 bg-[var(--muted)] rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="w-full h-4 bg-[var(--muted)] rounded"></div>
            <div className="w-24 h-6 bg-[var(--muted)] rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.primary}20` }}>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>
          <h3 className="text-base md:text-lg font-semibold text-[var(--foreground)]">
            Rendimiento
          </h3>
        </div>
        <p className="text-sm text-[var(--muted-foreground)]">
          Comparación y tendencias
        </p>
      </div>

      {/* Promedio General Section */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4">
          Promedio General
        </h4>

        {/* Consumption vs Target with alert */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
          <span className="text-sm text-[var(--muted-foreground)]">
            Consumo Actual vs Meta
          </span>
          {isOverTarget && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${colors.quaternary}40`, color: '#D97706' }}>
              ⚠ Fuera de Meta
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="relative mb-4">
          <div className="w-full bg-[var(--muted)] rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{ 
                backgroundColor: colors.primary,
                width: `${progressPercentage}%` 
              }}
            />
          </div>

          {/* Progress labels */}
          <div className="flex justify-between text-xs text-[var(--muted-foreground)] mt-2">
            <span>0 kWh/m²</span>
            <span className="text-[var(--muted-foreground)] font-medium">Meta: {targetConsumption} kWh/m²</span>
            <span className="font-bold text-[var(--foreground)]">{currentConsumption} kWh/m²</span>
          </div>
        </div>

        {/* Additional metrics */}
        <div className="text-center mb-4">
          <div className="text-base md:text-lg font-bold text-[var(--foreground)]">
            {currentConsumption} / {targetConsumption} kWh/m²/mes
          </div>
          <div className="text-xs text-[var(--muted-foreground)] mt-1">
            {monthChangeValue > 0 ? '+' : ''}{monthChange}% vs mes anterior
          </div>
        </div>

        {/* Efficiency */}
        <div className="mb-4">
          <div className="text-sm text-[var(--muted-foreground)] mb-2">Eficiencia</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.quaternary }}></div>
            <span className="text-sm font-semibold text-[var(--foreground)]">{efficiency}</span>
          </div>
        </div>
      </div>

      {/* Comparación */}
      <div className="mb-4 md:mb-6">
        <h4 className="text-sm font-semibold text-[var(--foreground)] mb-4">
          Comparación
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {/* Actual */}
          <div className="text-center p-3 md:p-4 rounded-lg border" style={{ 
            backgroundColor: `${colors.primary}15`, 
            borderColor: `${colors.primary}40` 
          }}>
            <div className="text-lg md:text-2xl font-bold mb-1" style={{ color: colors.primary }}>
              {currentConsumption}
            </div>
            <div className="text-xs" style={{ color: colors.primary }}>
              Mes Actual
            </div>
          </div>

          {/* Mes Anterior */}
          <div className="text-center p-3 md:p-4 rounded-lg border" style={{ 
            backgroundColor: `${colors.tertiary}15`, 
            borderColor: `${colors.tertiary}40` 
          }}>
            <div className="text-lg md:text-2xl font-bold mb-1" style={{ color: colors.tertiary }}>
              {previousConsumption}
            </div>
            <div className="text-xs" style={{ color: colors.tertiary }}>
              Mes Anterior
            </div>
          </div>

          {/* Meta */}
          <div className="text-center p-3 md:p-4 rounded-lg border" style={{ 
            backgroundColor: `${colors.secondary}15`, 
            borderColor: `${colors.secondary}40` 
          }}>
            <div className="text-lg md:text-2xl font-bold mb-1" style={{ color: colors.secondary }}>
              {targetConsumption}
            </div>
            <div className="text-xs" style={{ color: colors.secondary }}>
              Meta
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}