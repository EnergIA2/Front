"use client"

import { useState, useEffect } from "react"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"
import { Calendar, TrendingUp } from "lucide-react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export function ConsumptionHistoryChart() {
  const [mounted, setMounted] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<'weeks' | 'months'>('months')
  const [activeTab, setActiveTab] = useState<'consumption' | 'cost' | 'co2' | 'comparison'>('consumption')

  // Colores de la paleta del logo
  const colors = {
    primary: '#ff9a9e',    // Rosa coral suave
    secondary: '#a8e6cf',  // Verde menta
    tertiary: '#88d8f3',   // Azul cielo
    quaternary: '#f7dc6f'  // Amarillo suave
  }

  // Data structures - los totales/promedios/tendencias solo cambian por período, NO por tab
  const periodData = {
    weeks: {
      // Datos generales del período (NO cambian por tab)
      totalConsumption: 13500,  // kWh total del período
      totalCost: 2025,         // $ total del período  
      averageConsumption: 1038, // kWh promedio semanal
      trend: 28.5,             // % tendencia del período
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10', 'Sem 11', 'Sem 12', 'Sem 13'],
      // Datos específicos por tab (SÍ cambian según el tab)
      consumption: [1100, 1950, 2800, 3600, 3950, 3800, 3200, 2300, 600, 400, 700, 1500, 1100],
      cost: [165, 293, 420, 540, 593, 570, 480, 345, 90, 60, 105, 225, 165],
      co2: [495, 877, 1260, 1620, 1777, 1710, 1440, 1035, 270, 180, 315, 675, 495],
      comparisonActual: [1100, 1950, 2800, 3600, 3950, 3800, 3200, 2300, 600, 400, 700, 1500, 1100],
      comparisonTarget: [2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500]
    },
    months: {
      // Datos generales del período (NO cambian por tab)
      totalConsumption: 27040,  // kWh total del período
      totalCost: 4056,         // $ total del período
      averageConsumption: 2080, // kWh promedio mensual
      trend: 42.4,             // % tendencia del período
      labels: ['Sept', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept'],
      // Datos específicos por tab (SÍ cambian según el tab)
      consumption: [150, 290, 440, 590, 600, 580, 480, 330, 75, 50, 90, 210, 150],
      cost: [22, 44, 66, 89, 90, 87, 72, 50, 11, 7, 14, 32, 22],
      co2: [675, 1305, 1980, 2655, 2700, 2610, 2160, 1485, 337, 225, 405, 945, 675],
      comparisonActual: [150, 290, 440, 590, 600, 580, 480, 330, 75, 50, 90, 210, 150],
      comparisonTarget: [3050, 3050, 3050, 3050, 3050, 3050, 3050, 3050, 3050, 3050, 3050, 3050, 3050]
    }
  }

  const currentPeriodData = periodData[selectedPeriod]

  const getChartData = () => {
    if (activeTab === 'comparison') {
      return {
        labels: currentPeriodData.labels,
        datasets: [
          {
            label: 'Actual',
            data: currentPeriodData.comparisonActual,
            backgroundColor: `${colors.primary}80`, // 50% opacity
            borderColor: colors.primary,
            borderWidth: 2
          },
          {
            label: 'Objetivo',
            data: currentPeriodData.comparisonTarget,
            backgroundColor: `${colors.secondary}80`, // 50% opacity
            borderColor: colors.secondary,
            borderWidth: 2
          }
        ]
      }
    } else {
      // Asignar colores según el tab
      const getTabColor = () => {
        switch (activeTab) {
          case 'consumption': return colors.primary   // Rosa coral
          case 'cost': return colors.secondary        // Verde menta
          case 'co2': return colors.tertiary         // Azul cielo
          default: return colors.primary
        }
      }

      const tabColor = getTabColor()
      const isAreaChart = activeTab === 'consumption' || activeTab === 'co2'
      
      return {
        labels: currentPeriodData.labels,
        datasets: [
          {
            data: currentPeriodData[activeTab],
            borderColor: tabColor,
            backgroundColor: isAreaChart ? `${tabColor}40` : 'transparent', // 25% opacity para área
            fill: isAreaChart,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: tabColor,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            borderWidth: 3
          }
        ]
      }
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: activeTab === 'comparison',
        position: 'top' as const,
        labels: {
          color: '#6B7280',
          font: { size: 12 },
          usePointStyle: true,
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function(context: any) {
            const value = context.parsed.y
            const unit = activeTab === 'cost' ? '$' : activeTab === 'co2' ? ' kg CO₂' : ' kWh'
            return `${value}${unit}`
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280',
          font: { size: 11 }
        }
      },
      y: {
        display: true,
        grid: {
          display: true,
          color: '#F3F4F6'
        },
        ticks: {
          color: '#6B7280',
          font: { size: 11 },
          callback: function(value: string | number) {
            const unit = activeTab === 'cost' ? '$' : activeTab === 'co2' ? '' : ''
            return `${value}${unit}`
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
  }, [])

  if (!mounted) {
    return (
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    )
  }

  const ChartComponent = activeTab === 'comparison' ? Bar : Line

  return (
    <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg text-[var(--muted-foreground)] mb-1">
              Tendencias Históricas
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  Histórico de Consumo
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: colors.secondary }} />
                <span className="text-sm font-medium" style={{ color: colors.secondary }}>
                  {currentPeriodData.trend}% vs período anterior
                </span>
              </div>
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedPeriod('weeks')}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                selectedPeriod === 'weeks'
                  ? 'text-white border-transparent'
                  : 'bg-white text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]'
              }`}
              style={selectedPeriod === 'weeks' ? { backgroundColor: colors.primary } : {}}
            >
              Últimas Semanas
            </button>
            <button
              onClick={() => setSelectedPeriod('months')}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                selectedPeriod === 'months'
                  ? 'text-white border-transparent'
                  : 'bg-white text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]'
              }`}
              style={selectedPeriod === 'months' ? { backgroundColor: colors.primary } : {}}
            >
              Últimos Meses
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-6 p-1 bg-[var(--muted)] rounded-lg">
          {[
            { key: 'consumption', label: 'Consumo' },
            { key: 'cost', label: 'Costo' },
            { key: 'co2', label: 'CO₂' },
            { key: 'comparison', label: 'Comparación' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'consumption' | 'cost' | 'co2' | 'comparison')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-[var(--foreground)] shadow-sm'
                  : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-6">
        <ChartComponent data={getChartData()} options={chartOptions} />
      </div>

      {/* Bottom Metrics - ESTOS NO CAMBIAN AL CAMBIAR TAB, SOLO AL CAMBIAR PERÍODO */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">
            {currentPeriodData.totalConsumption.toLocaleString()}
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">
            Total kWh
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">
            ${currentPeriodData.totalCost.toLocaleString()}
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">
            Costo Total
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">
            {currentPeriodData.averageConsumption.toLocaleString()}
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">
            Promedio {selectedPeriod === 'weeks' ? 'Semanal' : 'Mensual'}
          </p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4" style={{ color: colors.secondary }} />
            <p className="text-2xl font-bold" style={{ color: colors.secondary }}>
              {currentPeriodData.trend}%
            </p>
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">
            Tendencia
          </p>
        </div>
      </div>
    </div>
  )
}