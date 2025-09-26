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
  Filler,
  ChartOptions,
  TooltipItem
} from "chart.js"

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

export function RecentConsumptionChart() {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  // Generate time labels for 3-hour window (from 05:53 to 08:53, every 10 minutes)
  const generateTimeLabels = () => {
    const labels = []
    const now = new Date()
    
    // Create 3-hour window: 1.5 hours before current time, 1.5 hours after
    const startTime = new Date(now.getTime() - 1.5 * 60 * 60 * 1000) // 1.5 hours ago
    const endTime = new Date(now.getTime() + 1.5 * 60 * 60 * 1000) // 1.5 hours ahead
    
    for (let time = new Date(startTime); time <= endTime; time.setMinutes(time.getMinutes() + 10)) {
      const hours = time.getHours().toString().padStart(2, '0')
      const minutes = time.getMinutes().toString().padStart(2, '0')
      labels.push(`${hours}:${minutes}`)
    }
    
    return labels
  }

  const timeLabels = generateTimeLabels()

  // Generate main consumption data (historical)
  const generateMainConsumptionData = useCallback(() => {
    const data = []
    const currentTimeIndex = Math.floor(timeLabels.length / 2) // Current time is in the middle

    for (let i = 0; i < timeLabels.length; i++) {
      if (i <= currentTimeIndex) {
        // Historical data with realistic pattern
        const baseValue = 60
        
        // Add some variation based on time pattern
        const timeVariation = Math.sin(i * 0.3) * 8
        const randomVariation = (Math.random() - 0.5) * 6
        
        const value = Math.max(50, Math.min(75, baseValue + timeVariation + randomVariation))
        data.push(Math.round(value))
      } else {
        // No historical data after current time
        data.push(null)
      }
    }
    return data
  }, [timeLabels])

  // Generate forecast data
  const generateForecastData = useCallback(() => {
    const data = []
    const currentTimeIndex = Math.floor(timeLabels.length / 2)

    for (let i = 0; i < timeLabels.length; i++) {
      if (i < currentTimeIndex) {
        // No forecast before current time
        data.push(null)
      } else {
        // Forecast data with declining pattern
        const futurePoints = i - currentTimeIndex
        const baseValue = 50 - (futurePoints * 2)
        const variation = Math.sin(futurePoints * 0.4) * 4
        const value = Math.max(3, Math.min(15, baseValue + variation))
        data.push(Math.round(value))
      }
    }
    return data
  }, [timeLabels])


  const [chartData, setChartData] = useState(() => ({
    labels: timeLabels,
    datasets: [
      {
        label: 'Consumo Actual',
        data: generateMainConsumptionData(),
        borderColor: '#6B7280', // Gris como en la imagen
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#6B7280',
        pointBorderColor: '#6B7280',
        pointBorderWidth: 1,
        borderWidth: 2,
        spanGaps: false
      },
      {
        label: 'Pronóstico',
        data: generateForecastData(),
        borderColor: '#3B82F6', // Azul para pronóstico
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#3B82F6',
        pointBorderWidth: 1,
        borderWidth: 2,
        borderDash: [5, 5], // Línea punteada
        spanGaps: false
      }
    ]
  }))

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          color: '#6B7280',
          font: {
            size: 12
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          label: function(context: TooltipItem<'line'>) {
            if (context.parsed.y === null) return ''
            return `${context.parsed.y} kWh`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: '#F3F4F6'
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 10
          },
          maxTicksLimit: 10
        }
      },
      y: {
        min: 0,
        max: 80,
        grid: {
          display: true,
          color: '#F3F4F6'
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          },
          stepSize: 20
        },
        title: {
          display: true,
          text: 'kWh',
          color: '#6B7280',
          font: {
            size: 12
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  }

  useEffect(() => {
    setMounted(true)

    // Update current time
    const updateTime = () => {
      const now = new Date()
      const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      setCurrentTime(timeString)
    }

    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    // Update data every 30 seconds to simulate real-time
    const dataInterval = setInterval(() => {
      setChartData(prev => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: generateMainConsumptionData()
          },
          {
            ...prev.datasets[1],
            data: generateForecastData()
          }
        ]
      }))
    }, 30000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(dataInterval)
    }
  }, [generateMainConsumptionData, generateForecastData])

  if (!mounted) {
    return (
      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">
            Consumo Horario
          </h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            Cargando datos...
          </p>
        </div>
        <div className="h-80 bg-[var(--muted)] rounded-lg animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#ff9a9e' }}></div>
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            Consumo en Tiempo Real
          </h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <span>Actualizado: {currentTime}</span>
        </div>
      </div>

      <div className="h-64 sm:h-80 relative">
        <Line data={chartData} options={chartOptions} />
        {/* Current time vertical line - red dashed like in the image */}
        <div
          className="absolute w-px bg-red-500 opacity-70"
          style={{
            left: '50%', // Current time is in the middle
            top: '20px',
            height: 'calc(100% - 60px)',
            zIndex: 10,
            borderLeft: '2px dashed #EF4444'
          }}
        >
          {/* Top label */}
          <div className="absolute -top-6 -left-12 text-red-500 text-xs font-medium whitespace-nowrap">
            Tiempo Actual
          </div>
        </div>
      </div>

      {/* Métricas por hora */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-border/30" style={{ backgroundColor: 'rgba(255, 154, 158, 0.15)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: '#ff9a9e' }}>Consumo por Hora</p>
              <p className="text-2xl font-bold" style={{ color: '#e08a8e' }}>127 kWh</p>
            </div>
            <div style={{ color: '#ff9a9e' }}>⚡</div>
          </div>
          <p className="text-xs mt-1" style={{ color: '#c67a7e' }}>Promedio última hora</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Costo por Hora</p>
              <p className="text-2xl font-bold text-green-700">$18.05</p>
            </div>
            <div className="text-green-500">💰</div>
          </div>
          <p className="text-xs text-green-600 mt-1">Basado en tarifa actual</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">CO₂ por Hora</p>
              <p className="text-2xl font-bold text-purple-700">57 kg</p>
            </div>
            <div className="text-purple-500">🌱</div>
          </div>
          <p className="text-xs text-purple-600 mt-1">Emisiones estimadas</p>
        </div>
      </div>
    </div>
  )
}