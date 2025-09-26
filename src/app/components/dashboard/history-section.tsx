"use client"

import { useState, useEffect } from "react"
import { ConsumptionHistoryChart } from "./consumption-history-chart"

export function HistorySection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Only the main consumption history chart */}
      <ConsumptionHistoryChart />
    </div>
  )
}