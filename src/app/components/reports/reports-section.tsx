"use client"

import { useState } from "react"
import { FileText, Download, Calendar, Filter, TrendingUp } from "lucide-react"

export function ReportsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const reports = [
    {
      id: 1,
      title: "Reporte Mensual de Consumo",
      description: "Análisis completo del consumo energético del mes",
      date: "Enero 2024",
      size: "2.3 MB",
      type: "PDF",
      status: "ready"
    },
    {
      id: 2,
      title: "Análisis de Eficiencia Energética",
      description: "Evaluación de la eficiencia y recomendaciones",
      date: "Enero 2024",
      size: "1.8 MB",
      type: "PDF",
      status: "ready"
    },
    {
      id: 3,
      title: "Reporte de Costos y Ahorros",
      description: "Desglose detallado de costos y ahorros obtenidos",
      date: "Enero 2024",
      size: "1.5 MB",
      type: "Excel",
      status: "generating"
    },
    {
      id: 4,
      title: "Predicciones y Tendencias",
      description: "Pronósticos basados en IA para los próximos meses",
      date: "Enero 2024",
      size: "3.1 MB",
      type: "PDF",
      status: "ready"
    }
  ]

  const quickStats = [
    { label: "Reportes Generados", value: "24", change: "+3" },
    { label: "Ahorros Documentados", value: "$12,840", change: "+$2,347" },
    { label: "Eficiencia Promedio", value: "87.3%", change: "+2.1%" },
    { label: "Próxima Evaluación", value: "5 días", change: "-2 días" }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
            Reportes y Documentación
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Genera y descarga reportes detallados de tu consumo energético
          </p>
        </div>

        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          >
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensual</option>
            <option value="quarterly">Trimestral</option>
            <option value="yearly">Anual</option>
          </select>

          <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Nuevo Reporte
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm text-[var(--muted-foreground)] font-medium">
                {stat.label}
              </h3>
              <span className="text-xs text-[var(--success)] font-medium">
                {stat.change}
              </span>
            </div>
            <div className="text-xl font-bold text-[var(--foreground)]">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Reports List */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl">
        <div className="p-6 border-b border-[var(--border)]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[var(--foreground)]">Reportes Disponibles</h3>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] transition-colors">
                <Filter className="w-4 h-4 text-[var(--muted-foreground)]" />
              </button>
              <button className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)] transition-colors">
                <Calendar className="w-4 h-4 text-[var(--muted-foreground)]" />
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {reports.map((report, index) => (
            <div
              key={report.id}
              className="p-6 hover:bg-[var(--muted)] transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-[var(--primary)]20">
                    <FileText className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--foreground)] mb-1">
                      {report.title}
                    </h4>
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">
                      {report.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
                      <span>{report.date}</span>
                      <span>{report.size}</span>
                      <span className="px-2 py-1 rounded bg-[var(--muted)] font-medium">
                        {report.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {report.status === 'ready' ? (
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity">
                      <Download className="w-4 h-4" />
                      Descargar
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-[var(--warning)]20 text-[var(--warning)] rounded-lg">
                      <div className="w-4 h-4 border-2 border-[var(--warning)] border-t-transparent rounded-full animate-spin"></div>
                      Generando...
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Custom Report */}
      <div className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-[var(--info)]" />
          <h3 className="text-lg font-bold text-[var(--foreground)]">Generar Reporte Personalizado</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Tipo de Reporte
            </label>
            <select className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]">
              <option>Consumo Energético</option>
              <option>Análisis de Costos</option>
              <option>Eficiencia Operacional</option>
              <option>Predicciones IA</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Período
            </label>
            <select className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]">
              <option>Último mes</option>
              <option>Últimos 3 meses</option>
              <option>Último año</option>
              <option>Personalizado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Formato
            </label>
            <select className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]">
              <option>PDF</option>
              <option>Excel</option>
              <option>PowerPoint</option>
            </select>
          </div>
        </div>

        <button className="w-full md:w-auto px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <FileText className="w-4 h-4" />
          Generar Reporte
        </button>
      </div>
    </div>
  )
}