"use client"

import { Header } from "./components/layout/header"
import { Sidebar } from "./components/layout/sidebar"
import { EnergyMetrics } from "./components/dashboard/energy-metrics"
import { EnergyChart } from "./components/dashboard/energy-chart"
import { AIRecommendations } from "./components/ai/recommendations"
import { IoTDevices } from "./components/devices/iot-devices"
import { RealTimeAlerts } from "./components/alerts/real-time-alerts"

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 md:ml-64 ml-0 p-4 md:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                Dashboard de Energía
              </h1>
              <p className="text-[var(--muted-foreground)]">
                Optimiza tu consumo energético con inteligencia artificial
              </p>
            </div>

            {/* Energy Metrics */}
            <EnergyMetrics />

            {/* Charts and Recommendations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Energy Chart - Takes 2 columns */}
              <EnergyChart />

              {/* AI Recommendations */}
              <div className="lg:col-span-1">
                <AIRecommendations />
              </div>

              {/* IoT Devices */}
              <div className="lg:col-span-1">
                <IoTDevices />
              </div>
            </div>

            {/* Additional Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Efficiency Widget */}
              <div className="p-6 rounded-2xl glass-effect border border-[var(--border)] animate-slide-up">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--success)] to-[var(--accent)] flex items-center justify-center">
                    <span className="text-white font-bold">89%</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Eficiencia</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">Última semana</p>
                  </div>
                </div>
                <div className="w-full bg-[var(--muted)] rounded-full h-2">
                  <div className="bg-gradient-to-r from-[var(--success)] to-[var(--accent)] h-2 rounded-full w-[89%] animate-pulse-slow"></div>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-2">
                  +5.2% respecto al mes anterior
                </p>
              </div>

              {/* Cost Savings Widget */}
              <div className="p-6 rounded-2xl glass-effect border border-[var(--border)] animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--info)] to-[var(--primary)] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">$2.8K</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Ahorro</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">Este mes</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-[var(--foreground)] mb-1">
                  $2,847
                </div>
                <p className="text-xs text-[var(--success)]">
                  ↗ 12% más que el mes pasado
                </p>
              </div>

              {/* Weather Impact Widget */}
              <div className="p-6 rounded-2xl glass-effect border border-[var(--border)] animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--info)] to-[var(--primary)] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">☀️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Clima & Energía</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">Impacto climático</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--muted-foreground)]">Temperatura:</span>
                    <span className="font-medium text-[var(--foreground)]">24°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--muted-foreground)]">Ajuste HVAC:</span>
                    <span className="font-medium text-[var(--success)]">-12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--muted-foreground)]">Solar:</span>
                    <span className="font-medium text-[var(--warning)]">8.4 kW</span>
                  </div>
                </div>
                <p className="text-xs text-[var(--info)] mt-2">
                  Condiciones óptimas para eficiencia
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 hidden" id="sidebar-overlay"></div>

      {/* Real-time Alerts */}
      <RealTimeAlerts />
    </div>
  )
}
