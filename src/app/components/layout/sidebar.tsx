"use client"

import { useState } from "react"
import {
  BarChart3,
  Brain,
  Cpu,
  Zap,
  Settings,
  HelpCircle,
  FileText,
  Calendar,
  Shield,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface SidebarItem {
  icon: React.ComponentType<any>
  label: string
  href: string
  badge?: number
  subItems?: Array<{
    label: string
    href: string
  }>
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("dashboard")

  const menuItems: SidebarItem[] = [
    {
      icon: BarChart3,
      label: "Dashboard",
      href: "#dashboard"
    },
    {
      icon: Brain,
      label: "IA & Optimización",
      href: "#ai",
      badge: 3,
      subItems: [
        { label: "Recomendaciones", href: "#recommendations" },
        { label: "Predicciones", href: "#predictions" },
        { label: "Automatización", href: "#automation" }
      ]
    },
    {
      icon: TrendingUp,
      label: "Análisis",
      href: "#analytics",
      subItems: [
        { label: "Consumo por Área", href: "#consumption" },
        { label: "Eficiencia", href: "#efficiency" },
        { label: "Comparativas", href: "#comparisons" }
      ]
    },
    {
      icon: Cpu,
      label: "Dispositivos",
      href: "#devices",
      badge: 12
    },
    {
      icon: Calendar,
      label: "Programación",
      href: "#scheduling"
    },
    {
      icon: FileText,
      label: "Reportes",
      href: "#reports"
    },
    {
      icon: Shield,
      label: "Seguridad",
      href: "#security"
    }
  ]

  const bottomItems: SidebarItem[] = [
    {
      icon: Settings,
      label: "Configuración",
      href: "#settings"
    },
    {
      icon: HelpCircle,
      label: "Ayuda",
      href: "#help"
    }
  ]

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] border-r border-[var(--border)] glass-effect transition-all duration-300 z-40 md:block hidden ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted)] transition-colors flex items-center justify-center"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-[var(--muted-foreground)]" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-[var(--muted-foreground)]" />
        )}
      </button>

      <div className="flex flex-col h-full">
        {/* Main navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item, index) => (
            <div key={item.href} className="space-y-1">
              <a
                href={item.href}
                onClick={() => setActiveItem(item.href.replace('#', ''))}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  activeItem === item.href.replace('#', '')
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${
                  activeItem === item.href.replace('#', '') ? '' : 'group-hover:scale-110'
                } transition-transform duration-200`} />

                {!isCollapsed && (
                  <>
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-[var(--accent)] text-[var(--accent-foreground)] text-xs px-2 py-0.5 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </a>

              {/* Subitems */}
              {!isCollapsed && item.subItems && activeItem === item.href.replace('#', '') && (
                <div className="ml-8 space-y-1 animate-slide-up">
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem.href}
                      href={subItem.href}
                      className="block px-3 py-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors rounded-md hover:bg-[var(--muted)]"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Status indicator */}
        {!isCollapsed && (
          <div className="px-6 py-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--muted)]">
              <div className="w-3 h-3 rounded-full bg-[var(--success)] animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--foreground)]">
                  Sistema Activo
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Monitoreando 24/7
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom navigation */}
        <nav className="px-3 py-4 border-t border-[var(--border)] space-y-1">
          {bottomItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-all duration-200 group"
            >
              <item.icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <style jsx>{`
          .group:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            left: calc(100% + 8px);
            top: 50%;
            transform: translateY(-50%);
            background: var(--background);
            border: 1px solid var(--border);
            border-radius: 6px;
            padding: 4px 8px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            opacity: 0;
            animation: fadeIn 0.2s ease-in-out forwards;
          }
        `}</style>
      )}
    </aside>
  )
}