"use client"

import { useState, useEffect, useCallback } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"
import { useCityContext } from "../layout/city-selector"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface EquipmentData {
  name: string
  consumption: number
  percentage: number
  color: string
  status: 'normal' | 'high' | 'low'
}

export function RecentConsumptionChart() {
  const { selectedCity } = useCityContext()
  const [mounted, setMounted] = useState(false)
  const [timeLabels] = useState([
    '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00'
  ])

  // Datos simulados de consumo por equipo con paleta verde-naranja
  const equipmentData: EquipmentData[] = [
    {
      name: 'HVAC Principal',
      consumption: 15.2,
      percentage: 42,
      color: '#F97316', // Naranja principal para el mayor consumo
      status: 'high'
    },
    {
      name: 'Iluminación',
      consumption: 8.7,
      percentage: 24,
      color: '#10B981', // Verde principal
      status: 'normal'
    },
    {
      name: 'Equipos Oficina',
      consumption: 6.3,
      percentage: 17,
      color: '#FB923C', // Naranja claro
      status: 'normal'
    },
    {
      name: 'Servidores',
      consumption: 4.2,
      percentage: 12,
      color: '#22C55E', // Verde claro
      status: 'normal'
    },
    {
      name: 'Otros',
      consumption: 1.8,
      percentage: 5,
      color: '#16A34A', // Verde oscuro
      status: 'low'
    }
  ]

  // Generar datos de línea de tiempo
  const generateTimelineData = useCallback(() => {
    const baseValue = selectedCity === 'todas' ? 38 : 
                     selectedCity === 'lima' ? 12.8 :
                     selectedCity === 'arequipa' ? 10.4 : 15.3

    return timeLabels.map((_, index) => {
      // Use deterministic variation based on index and city to avoid hydration mismatch
      const variation = Math.sin(index * 0.8) * 2 + Math.sin(index * 1.2) * 1.5
      return Math.max(baseValue + variation, baseValue * 0.8)
    })
  }, [selectedCity, timeLabels])

  const [chartData, setChartData] = useState(() => ({
    labels: timeLabels,
    datasets: [
      {
        label: 'Consumo (kWh)',
        data: generateTimelineData(),
        borderColor: '#10B981', // Verde principal
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      }
    ]
  }))

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(16, 185, 129, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: { parsed: { y: number } }) {
            return `${context.parsed.y.toFixed(2)} kWh`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11
          },
          callback: function(value: string | number) {
            return Number(value).toFixed(1) + ' kWh'
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  }

  // Set mounted state and update data when city changes
  useEffect(() => {
    setMounted(true)
    setChartData(prev => ({
      ...prev,
      datasets: [{
        ...prev.datasets[0],
        data: generateTimelineData()
      }]
    }))
  }, [selectedCity, generateTimelineData])

  const getStatusColor = (status: EquipmentData['status']) => {
    switch (status) {
      case 'high': return 'text-red-500'
      case 'low': return 'text-yellow-500'
      default: return 'text-green-500'
    }
  }

  const getStatusLabel = (status: EquipmentData['status']) => {
    switch (status) {
      case 'high': return 'Alto'
      case 'low': return 'Bajo'
      default: return 'Normal'
    }
  }

  if (!mounted) {
    return (
      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">
              Monitoreo en Tiempo Real
            </h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Consumo por equipos • Última hora
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-[var(--foreground)]">
              --.- kWh
            </div>
            <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[var(--muted)]"></div>
              Cargando...
            </div>
          </div>
        </div>
        <div className="h-48 mb-6 bg-[var(--muted)] rounded-lg animate-pulse"></div>
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-medium text-[var(--foreground)]">
            Consumo por Equipo
          </h4>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)] animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[var(--secondary)]" />
                <span className="w-20 h-4 bg-[var(--secondary)] rounded"></span>
              </div>
              <div className="text-right">
                <div className="w-12 h-4 bg-[var(--secondary)] rounded mb-1"></div>
                <div className="w-8 h-3 bg-[var(--secondary)] rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-[var(--foreground)]">
            Monitoreo en Tiempo Real
          </h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            Consumo por equipos • Última hora
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-[var(--foreground)]">
            {chartData.datasets[0].data[chartData.datasets[0].data.length - 1].toFixed(1)} kWh
          </div>
          <div className="text-xs text-[var(--success)] flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></div>
            Ahora • {selectedCity === 'todas' ? 'Todas las sedes' : 'Sede actual'}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Equipment Breakdown */}
      <div className="space-y-3 mb-4">
        <h4 className="text-sm font-medium text-[var(--foreground)]">
          Consumo por Equipo
        </h4>
        
        {equipmentData.map((equipment) => (
          <div
            key={equipment.name}
            className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)] hover:bg-[var(--secondary)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: equipment.color }}
              />
              <span className="text-sm font-medium text-[var(--foreground)]">
                {equipment.name}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(equipment.status)}`}>
                {getStatusLabel(equipment.status)}
              </span>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-bold text-[var(--foreground)]">
                {equipment.consumption.toFixed(1)} kWh
              </div>
              <div className="text-xs text-[var(--muted-foreground)]">
                {equipment.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-[var(--border)]">
        <div className="text-center text-xs text-[var(--muted-foreground)] leading-relaxed">
          Costo = kWh+tarifa • CO₂ = kWh+factor • Ahorro = actual – simulado •
          <br />
          Pronóstico = promedio móvil
        </div>
      </div>
    </div>
  )
}