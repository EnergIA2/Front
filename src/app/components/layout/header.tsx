"use client"

// import { useState } from "react"
// import { Bell, Search } from "lucide-react"
import { ThemeToggle } from "../theme-toggle"
import { CitySelector } from "./city-selector"

export function Header() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-[var(--border)] bg-[var(--card)] backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        {/* Logo simple */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            Pachoc
          </h1>
        </div>

        {/* City Selector & Quick Info */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--success)]10 text-[var(--success)]">
              <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></div>
            </div>
            <div className="text-[var(--muted-foreground)]">
              Ahorro: <span className="font-medium text-[var(--info)]">S/ 2,847</span>
            </div>
          </div>
          <CitySelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}