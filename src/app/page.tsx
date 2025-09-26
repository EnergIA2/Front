"use client"

import { useState } from "react"
import { Header } from "./components/layout/header"
import { Sidebar } from "./components/layout/sidebar"
import { CityProvider } from "./components/layout/city-selector"
import { EnergyMetrics } from "./components/dashboard/energy-metrics"
import { RecentConsumptionChart } from "./components/dashboard/recent-consumption-chart"
import { ConsumptionHeatMap } from "./components/dashboard/consumption-heatmap"
import { EquipmentDistributionChart } from "./components/dashboard/equipment-distribution-chart"
import { BenchmarkingVsMeta } from "./components/dashboard/benchmarking-vs-meta"
import { HistorySection } from "./components/dashboard/history-section"
import { AIRecommendations } from "./components/ai/recommendations"
import { ReportsSection } from "./components/reports/reports-section"
import { AlertsSection } from "./components/alerts/alerts-section"
import { Chatbot } from "./components/chatbot/chatbot"

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "history":
        return <HistorySection />
      case "alerts":
        return <AlertsSection />
      case "reports":
        return <ReportsSection />
      case "analytics":
        return (
          <div className="space-y-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                Análisis Visual Avanzado
              </h1>
              <p className="text-base text-[var(--muted-foreground)]">
                Visualización inteligente de patrones, eficiencia y oportunidades de ahorro
              </p>
            </div>

            {/* Grid Layout para mejor organización */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Mapa de Calor - Ocupa todo el ancho en mobile, mitad en desktop */}
              <div className="xl:col-span-2">
                <div className="bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-950/20 dark:to-green-950/20 p-6 rounded-xl border-l-4 border-orange-500 mb-4">
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
                    🔥 Patrones de Consumo por Hora
                  </h2>
                  <p className="text-sm text-[var(--muted-foreground)] mb-4">
                    Identifica los picos de consumo y patrones de uso a lo largo del día
                  </p>
                </div>
                <ConsumptionHeatMap />
              </div>

              {/* Eficiencia Visual */}
              <div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-xl border-l-4 border-green-500 mb-4">
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
                    ⚡ Eficiencia Energética
                  </h2>
                  <p className="text-sm text-[var(--muted-foreground)] mb-2">
                    Visualiza tu rendimiento energético comparado con estándares del sector
                  </p>
                </div>
                <EquipmentDistributionChart />
              </div>
            </div>
          </div>
        )
      case "settings":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                Configuración
              </h1>
              <p className="text-sm text-[var(--muted-foreground)]">
                Personaliza tu experiencia y configura preferencias
              </p>
            </div>
            <div className="p-8 rounded-xl bg-[var(--card)] border border-[var(--border)] text-center">
              <p className="text-[var(--muted-foreground)]">
                Panel de configuración en desarrollo
              </p>
            </div>
          </div>
        )
      case "recommendations":
        return <AIRecommendations />
      default: // dashboard
        return (
          <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div className="px-1">
              <h1 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-1">
                Dashboard Energético
              </h1>
              <p className="text-xs md:text-sm text-[var(--muted-foreground)]">
                Monitoreo, análisis y proyecciones de consumo
              </p>
            </div>

            {/* KPIs Principales */}
            <div className="w-full">
              <EnergyMetrics />
            </div>

            {/* Main Charts Grid - Responsive */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
              {/* Gráfico de Consumo */}
              <div className="xl:col-span-2 bg-[var(--card)] rounded-lg md:rounded-xl border border-[var(--border)] shadow-sm">
                <RecentConsumptionChart />
              </div>
            </div>

            {/* Secondary Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Patrones de Uso */}
              <div className="lg:col-span-2 bg-[var(--card)] rounded-lg md:rounded-xl border border-[var(--border)] shadow-sm">
                <ConsumptionHeatMap />
              </div>
            </div>

            {/* Metrics Grid - Mobile First */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
              {/* Rendimiento vs Objetivos */}
              <div className="bg-[var(--card)] rounded-lg md:rounded-xl border border-[var(--border)] shadow-sm">
                <BenchmarkingVsMeta />
              </div>

              {/* Distribución por Categorías */}
              <div className="bg-[var(--card)] rounded-lg md:rounded-xl border border-[var(--border)] shadow-sm">
                <EquipmentDistributionChart />
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <CityProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <Header />

        <div className="flex">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            onCollapseChange={setSidebarCollapsed}
          />

          {/* Main Content */}
          <main className={`flex-1 transition-all duration-300 ease-in-out p-4 md:p-6 pb-20 md:pb-6 animate-fade-in ${
            sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
          }`}>
            <div className="max-w-none space-y-6" id="main-content">
              {renderContent()}
            </div>
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 hidden" id="sidebar-overlay"></div>

        {/* Chatbot */}
        <Chatbot />
      </div>
    </CityProvider>
  )
}