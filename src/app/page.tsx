"use client"

import { useState } from "react"
import { Header } from "./components/layout/header"
import { Sidebar } from "./components/layout/sidebar"
import { CityProvider } from "./components/layout/city-selector"
import { EnergyMetrics } from "./components/dashboard/energy-metrics"
import { EnergyChart } from "./components/dashboard/energy-chart"
import { RecentConsumptionChart } from "./components/dashboard/recent-consumption-chart"
import { ConsumptionHeatMap } from "./components/dashboard/consumption-heatmap"
import { EfficiencyVisualChart } from "./components/dashboard/efficiency-visual-chart"
import { CostSavingsChart } from "./components/dashboard/cost-savings-chart"
import { ReportsSection } from "./components/reports/reports-section"
import { EmisSection } from "./components/emis/emis-section"
import { PredictionSection } from "./components/prediction/prediction-section"
import { AlertsSection } from "./components/alerts/alerts-section"
import { OptimizationSection } from "./components/optimization/optimization-section"
import { Chatbot } from "./components/chatbot/chatbot"
import { LiveTime } from "./components/live-time"

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "alerts":
        return <AlertsSection />
      case "prediction":
        return <PredictionSection />
      case "emis":
        return <EmisSection />
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
                <EfficiencyVisualChart />
              </div>

              {/* Análisis Costo-Beneficio */}
              <div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 p-6 rounded-xl border-l-4 border-orange-500 mb-4">
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
                    💰 Análisis de Ahorros
                  </h2>
                  <p className="text-sm text-[var(--muted-foreground)] mb-2">
                    Oportunidades de ahorro identificadas y proyección de beneficios
                  </p>
                </div>
                <CostSavingsChart />
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
      case "optimization":
        return <OptimizationSection />
      default: // dashboard
        return (
          <>
            {/* Welcome Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                    Vista General
                  </h1>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Panel de control energético empresarial
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[var(--muted-foreground)]">Última actualización</div>
                  <div className="text-sm font-medium text-[var(--foreground)]">
                    <LiveTime />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics - Simplified */}
            <EnergyMetrics />

            {/* Quick Actions & Alerts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              {/* Quick Status */}
              <div className="xl:col-span-2">
                <RecentConsumptionChart />
              </div>

              {/* Action Center */}
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    ⚡ Acciones Rápidas
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveSection('optimization')}
                      className="w-full p-4 text-left rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-950/30 dark:hover:to-emerald-950/30 transition-all duration-200"
                    >
                      <div className="font-medium text-green-700 dark:text-green-300">Ver Optimizaciones</div>
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">S/ 4,977/mes ahorro potencial</div>
                    </button>

                    <button
                      onClick={() => setActiveSection('alerts')}
                      className="w-full p-4 text-left rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200 dark:border-orange-800 hover:from-orange-100 hover:to-amber-100 dark:hover:from-orange-950/30 dark:hover:to-amber-950/30 transition-all duration-200"
                    >
                      <div className="font-medium text-orange-700 dark:text-orange-300">3 Alertas Activas</div>
                      <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">Revisar base nocturna elevada</div>
                    </button>

                    <button
                      onClick={() => setActiveSection('reports')}
                      className="w-full p-4 text-left rounded-lg bg-[var(--muted)] hover:bg-[var(--secondary)] border border-[var(--border)] transition-all duration-200"
                    >
                      <div className="font-medium text-[var(--foreground)]">Generar Reporte</div>
                      <div className="text-xs text-[var(--muted-foreground)] mt-1">Resumen mensual</div>
                    </button>
                  </div>
                </div>

                {/* Current Status */}
                <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    📊 Estado Actual
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--muted-foreground)]">Eficiencia</span>
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-[var(--muted)] rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full w-[89%]"></div>
                        </div>
                        <span className="text-sm font-bold text-green-600 min-w-[35px]">89%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--muted-foreground)]">vs. Meta Sectorial</span>
                      <span className="text-sm font-bold text-green-600">+12.2%</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--muted-foreground)]">Ahorro Este Mes</span>
                      <span className="text-sm font-bold text-orange-600">S/ 2,847</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Performance Chart */}
            <div className="w-full">
              <EnergyChart />
            </div>

          
          </>
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
