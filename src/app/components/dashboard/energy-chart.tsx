"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"

interface ChartData {
  time: string
  consumption: number
  prediction: number
  efficiency: number
}

export function EnergyChart() {
  const [data, setData] = useState<ChartData[]>([])
  const [chartType, setChartType] = useState<'line' | 'area'>('area')

  // Generar datos iniciales
  useEffect(() => {
    const generateData = () => {
      const now = new Date()
      const newData: ChartData[] = []

      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000)
        newData.push({
          time: time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          consumption: 800 + Math.sin(i * 0.5) * 200 + Math.random() * 100,
          prediction: 750 + Math.sin(i * 0.5) * 180 + Math.random() * 80,
          efficiency: 85 + Math.sin(i * 0.3) * 10 + Math.random() * 5
        })
      }

      setData(newData)
    }

    generateData()

    // Actualizar cada 30 segundos
    const interval = setInterval(() => {
      setData(prevData => {
        const newPoint = {
          time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          consumption: 800 + Math.sin(Date.now() * 0.001) * 200 + Math.random() * 100,
          prediction: 750 + Math.sin(Date.now() * 0.001) * 180 + Math.random() * 80,
          efficiency: 85 + Math.sin(Date.now() * 0.0008) * 10 + Math.random() * 5
        }

        return [...prevData.slice(1), newPoint]
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 rounded-lg glass-effect border border-[var(--border)]">
          <p className="text-sm font-medium text-[var(--foreground)] mb-2">
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name === 'consumption' && 'Consumo: '}
              {entry.name === 'prediction' && 'Predicción IA: '}
              {entry.name === 'efficiency' && 'Eficiencia: '}
              {entry.value.toFixed(1)}
              {entry.name === 'efficiency' ? '%' : ' kWh'}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="col-span-full lg:col-span-2 p-6 rounded-2xl glass-effect border border-[var(--border)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Consumo Energético
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              chartType === 'area'
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]'
            }`}
          >
            Área
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              chartType === 'line'
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]'
            }`}
          >
            Línea
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="time"
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="consumption"
                stroke="var(--primary)"
                fillOpacity={1}
                fill="url(#consumptionGradient)"
                strokeWidth={2}
                name="consumption"
              />
              <Area
                type="monotone"
                dataKey="prediction"
                stroke="var(--accent)"
                fillOpacity={1}
                fill="url(#predictionGradient)"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="prediction"
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="time"
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="consumption"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }}
                name="consumption"
              />
              <Line
                type="monotone"
                dataKey="prediction"
                stroke="var(--accent)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'var(--accent)', strokeWidth: 2, r: 3 }}
                name="prediction"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
          <span className="text-sm text-[var(--muted-foreground)]">Consumo Real</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 rounded-full" style={{ backgroundColor: 'var(--accent)' }}></div>
          <span className="text-sm text-[var(--muted-foreground)]">Predicción IA</span>
        </div>
      </div>
    </div>
  )
}