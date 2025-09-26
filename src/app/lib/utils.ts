import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  // Para evitar problemas de hidratación, usamos formato consistente
  if (num >= 1000) {
    return Math.floor(num / 100) / 10 + 'K'
  }
  return num.toString()
}

export function formatCurrency(num: number): string {
  // Formato simple para evitar problemas de localización
  return '$' + num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatPercentage(num: number): string {
  return num.toFixed(1) + '%'
}