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
import { AnalyticsSection } from "./components/analytics/analytics-section"
import { ReportsSection } from "./components/reports/reports-section"
import { EmisSection } from "./components/emis/emis-section"
import { PredictionSection } from "./components/prediction/prediction-section"
import { AlertsSection } from "./components/alerts/alerts-section"
import { OptimizationSection } from "./components/optimization/optimization-section"
import { Chatbot } from "./components/chatbot/chatbot"

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
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                Análisis Visual Avanzado
              </h1>
              <p className="text-sm text-[var(--muted-foreground)]">
                Visualización inteligente de patrones, eficiencia y oportunidades de ahorro
              </p>
            </div>
            
            {/* Mapa de Calor */}
            <ConsumptionHeatMap />
            
            {/* Eficiencia Visual */}
            <EfficiencyVisualChart />
            
            {/* Análisis Costo-Beneficio */}
            <CostSavingsChart />
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
                    {new Date().toLocaleTimeString('es-PE')}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics - Simplified */}
            <EnergyMetrics />

            {/* Quick Actions & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Quick Status */}
              <div className="lg:col-span-2">
                <RecentConsumptionChart />
              </div>
              
              {/* Action Center */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                  <h3 className="font-bold text-[var(--foreground)] mb-3">Acciones Rápidas</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setActiveSection('optimization')}
                      className="w-full p-3 text-left rounded-lg bg-[var(--success)]10 border border-[var(--success)]30 hover:bg-[var(--success)]20 transition-colors"
                    >
                      <div className="font-medium text-[var(--success)]">Ver Optimizaciones</div>
                      <div className="text-xs text-[var(--muted-foreground)]">S/ 4,977/mes ahorro potencial</div>
                    </button>
                    
                    <button 
                      onClick={() => setActiveSection('alerts')}
                      className="w-full p-3 text-left rounded-lg bg-[var(--warning)]10 border border-[var(--warning)]30 hover:bg-[var(--warning)]20 transition-colors"
                    >
                      <div className="font-medium text-[var(--warning)]">3 Alertas Activas</div>
                      <div className="text-xs text-[var(--muted-foreground)]">Revisar base nocturna elevada</div>
                    </button>
                    
                    <button 
                      onClick={() => setActiveSection('reports')}
                      className="w-full p-3 text-left rounded-lg bg-[var(--muted)] hover:bg-[var(--secondary)] transition-colors"
                    >
                      <div className="font-medium text-[var(--foreground)]">Generar Reporte</div>
                      <div className="text-xs text-[var(--muted-foreground)]">Resumen mensual</div>
                    </button>
                  </div>
                </div>

                {/* Current Status */}
                <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                  <h3 className="font-bold text-[var(--foreground)] mb-3">Estado Actual</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--muted-foreground)]">Eficiencia</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[var(--muted)] rounded-full h-2">
                          <div className="bg-[var(--success)] h-2 rounded-full w-[89%]"></div>
                        </div>
                        <span className="text-sm font-medium text-[var(--success)]">89%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--muted-foreground)]">vs. Meta Sectorial</span>
                      <span className="text-sm font-medium text-[var(--success)]">+12.2%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[var(--muted-foreground)]">Ahorro Este Mes</span>
                      <span className="text-sm font-medium text-[var(--info)]">S/ 2,847</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Performance Chart */}
            <div className="w-full">
              <EnergyChart />
            </div>

            {/* Heat Map - Quick View */}
            <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Patrones de Consumo
                </h3>
                <button 
                  onClick={() => setActiveSection('analytics')}
                  className="text-sm text-[var(--primary)] hover:underline flex items-center gap-1"
                >
                  Ver análisis completo →
                </button>
              </div>
              <div className="text-center py-8 bg-gradient-to-r from-[var(--muted)] to-[var(--secondary)] rounded-lg">
                <div className="text-sm text-[var(--muted-foreground)] mb-2">
                  Mapa de calor disponible en sección de Análisis
                </div>
                <div className="text-xs text-[var(--info)]">
                  📊 Visualiza patrones por hora • 🎯 Identifica picos • 💰 Encuentra ahorros
                </div>
              </div>
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
