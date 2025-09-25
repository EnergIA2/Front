"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--background)] flex items-center justify-center">
        <Sun className="h-4 w-4" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted)] transition-all duration-200 flex items-center justify-center group"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-[var(--warning)] group-hover:rotate-12 transition-transform duration-200" />
      ) : (
        <Moon className="h-4 w-4 text-[var(--primary)] group-hover:-rotate-12 transition-transform duration-200" />
      )}
    </button>
  )
}