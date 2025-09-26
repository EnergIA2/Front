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

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onCollapseChange?: (collapsed: boolean) => void
}

export function Sidebar({ activeSection, onSectionChange, onCollapseChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems: SidebarItem[] = [
    {
      icon: BarChart3,
      label: "Vista General",
      href: "dashboard"
    },
    {
      icon: TrendingUp,
      label: "Optimización",
      href: "optimization"
    },
    {
      icon: Shield,
      label: "Alertas",
      href: "alerts",
      badge: 3
    },
    {
      icon: FileText,
      label: "Reportes",
      href: "reports"
    }
  ]

  const bottomItems: SidebarItem[] = [
    {
      icon: Settings,
      label: "Configuración",
      href: "settings"
    }
  ]

  return (
    <>
    <aside
      className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] border-r border-[var(--border)] bg-[var(--card)] backdrop-blur-sm transition-all duration-300 z-40 hidden md:block ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => {
          const newCollapsed = !isCollapsed
          setIsCollapsed(newCollapsed)
          onCollapseChange?.(newCollapsed)
        }}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)] transition-colors flex items-center justify-center z-50"
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
              <button
                onClick={() => onSectionChange(item.href)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  activeSection === item.href
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${
                  activeSection === item.href ? '' : 'group-hover:scale-110'
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
              </button>

              {/* Subitems */}
              {!isCollapsed && item.subItems && activeSection === item.href && (
                <div className="ml-8 space-y-1 animate-slide-up">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.href}
                      onClick={() => onSectionChange(subItem.href)}
                      className="w-full text-left block px-3 py-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors rounded-md hover:bg-[var(--muted)]"
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>


        {/* Bottom navigation */}
        <nav className="px-3 py-4 border-t border-[var(--border)] space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.href}
              onClick={() => onSectionChange(item.href)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-all duration-200 group"
            >
              <item.icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </button>
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

    {/* Mobile Navigation */}
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-[var(--border)] bg-[var(--card)] backdrop-blur-sm z-40">
      <div className="flex items-center justify-around py-2">
        {menuItems.slice(0, 5).map((item) => (
          <button
            key={item.href}
            onClick={() => onSectionChange(item.href)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
              activeSection === item.href
                ? 'text-[var(--primary)]'
                : 'text-[var(--muted-foreground)]'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
            {item.badge && (
              <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--accent-foreground)] text-xs px-1.5 py-0.5 rounded-full font-medium">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
    </>
  )
}