"use client"

import { useState, useEffect } from "react"

export function LiveTime() {
  const [time, setTime] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('es-PE'))
    }
    
    updateTime() // Initial call
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return <span>--:--:--</span>
  }

  return <span>{time}</span>
}