"use client"

import { useState } from "react"
import { Bell, Menu, Search, User, Settings, HelpCircle } from "lucide-react"
import { ThemeToggle } from "../theme-toggle"

export function Header() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications] = useState([
    {
      id: 1,
      title: "Pico de consumo detectado",
      message: "El consumo ha aumentado 15% en la última hora",
      time: "hace 5 min",
      type: "warning"
    },
    {
      id: 2,
      title: "Optimización completada",
      message: "Se ha implementado la recomendación de HVAC",
      time: "hace 20 min",
      type: "success"
    },
    {
      id: 3,
      title: "Análisis mensual listo",
      message: "Tu reporte de eficiencia energética está disponible",
      time: "hace 2 horas",
      type: "info"
    }
  ])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] glass-effect">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo y navegación */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
              Pachoc Energy
            </h1>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#dashboard"
              className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#analytics"
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
            >
              Análisis
            </a>
            <a
              href="#recommendations"
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
            >
              Recomendaciones
            </a>
            <a
              href="#devices"
              className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
            >
              Dispositivos
            </a>
          </nav>
        </div>

        {/* Búsqueda */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Buscar dispositivos, métricas..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
            />
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          {/* Notificaciones */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted)] transition-all duration-200 flex items-center justify-center group relative"
            >
              <Bell className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--destructive)] text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 top-12 w-80 rounded-lg border border-[var(--border)] glass-effect shadow-lg animate-slide-up">
                <div className="p-4 border-b border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--foreground)]">Notificaciones</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-[var(--border)] hover:bg-[var(--muted)] transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'warning' ? 'bg-[var(--warning)]' :
                            notification.type === 'success' ? 'bg-[var(--success)]' :
                            'bg-[var(--info)]'
                          }`}
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-[var(--foreground)]">
                            {notification.title}
                          </h4>
                          <p className="text-xs text-[var(--muted-foreground)] mt-1">
                            {notification.message}
                          </p>
                          <span className="text-xs text-[var(--muted-foreground)] mt-2">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-[var(--border)]">
                  <button className="text-sm text-[var(--primary)] hover:underline">
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Toggle de tema */}
          <ThemeToggle />

          {/* Configuración */}
          <button className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted)] transition-all duration-200 flex items-center justify-center group">
            <Settings className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] group-hover:rotate-90 transition-all duration-200" />
          </button>

          {/* Usuario */}
          <button className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted)] transition-all duration-200 flex items-center justify-center group">
            <User className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]" />
          </button>

          {/* Menú móvil */}
          <button className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted)] transition-all duration-200 flex items-center justify-center group md:hidden">
            <Menu className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]" />
          </button>
        </div>
      </div>

      {/* Barra de búsqueda móvil */}
      <div className="lg:hidden px-6 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all"
          />
        </div>
      </div>
    </header>
  )
}