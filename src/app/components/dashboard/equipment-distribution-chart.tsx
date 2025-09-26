"use client"

import { useState, useEffect } from "react"
import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

interface EquipmentData {
  name: string
  percentage: number
  kwh: number
  color: string
}

export function EquipmentDistributionChart() {
  const [mounted, setMounted] = useState(false)

  // Colores de la paleta del logo
  const colors = {
    primary: '#ff9a9e',    // Rosa coral suave
    secondary: '#a8e6cf',  // Verde menta
    tertiary: '#88d8f3',   // Azul cielo
    quaternary: '#f7dc6f', // Amarillo suave
    quinary: '#dda0dd'     // Lavanda suave
  }

  const equipmentData: EquipmentData[] = [
    { name: "HVAC", percentage: 45, kwh: 113, color: colors.primary },
    { name: "Iluminación", percentage: 25, kwh: 63, color: colors.secondary },
    { name: "Equipos de Oficina", percentage: 15, kwh: 38, color: colors.tertiary },
    { name: "Refrigeración", percentage: 10, kwh: 25, color: colors.quaternary },
    { name: "Otros", percentage: 5, kwh: 13, color: colors.quinary }
  ]

  const chartData = {
    labels: equipmentData.map(item => item.name),
    datasets: [
      {
        data: equipmentData.map(item => item.percentage),
        backgroundColor: equipmentData.map(item => item.color),
        borderColor: '#ffffff',
        borderWidth: 2
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // We'll create custom legend
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: true,
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function(context: any) {
            return `${context.label}: ${context.parsed}% (~${equipmentData[context.dataIndex].kwh} kWh/día)`
          }
        }
      }
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-[var(--foreground)]">
            Por Categorías
          </h3>
          <button className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            Ver Detalle
          </button>
        </div>
        <div className="h-64 bg-[var(--muted)] rounded-lg animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-[var(--foreground)] mb-1">
            Por Categorías
          </h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            Distribución del consumo
          </p>
        </div>
        <button 
          className="text-sm text-white hover:opacity-90 transition-opacity border border-transparent px-3 py-1 rounded-md"
          style={{ backgroundColor: colors.primary }}
        >
          Ver Detalle
        </button>
      </div>

      {/* Pie Chart */}
      <div className="h-40 sm:h-48 mb-6 flex justify-center">
        <div className="w-40 h-40 sm:w-48 sm:h-48">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Custom Legend with percentages and kWh */}
      <div className="space-y-3">
        {equipmentData.map((item) => (
          <div key={item.name} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-[var(--foreground)]">
                {item.name}
              </span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-[var(--foreground)]">
                {item.percentage}%
              </div>
              <div className="text-xs text-[var(--muted-foreground)]">
                ~{item.kwh} kWh/día
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom insight box */}
      <div className="mt-4 md:mt-6 pt-4 border-t border-[var(--border)]">
        <div className="rounded-lg p-3 md:p-4" style={{ backgroundColor: `${colors.primary}15` }}>
          <div className="text-sm font-medium mb-1" style={{ color: colors.primary }}>
            Principales consumidores
          </div>
          <div className="text-sm font-semibold text-[var(--foreground)]">
            HVAC y Iluminación representan el 70% del consumo
          </div>
        </div>
      </div>
    </div>
  )
}