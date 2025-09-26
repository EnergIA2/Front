"use client"

import { useState, useContext, createContext, ReactNode } from "react"
import { MapPin, ChevronDown } from "lucide-react"

interface City {
  id: string
  name: string
  consumption: number
  cost: number
  co2: number
  status: 'Normal' | 'Alerta' | 'Crítico'
}

interface CityContextType {
  selectedCity: string
  setSelectedCity: (city: string) => void
  cities: City[]
  getCityData: (cityId: string) => City | null
}

const CityContext = createContext<CityContextType | undefined>(undefined)

export function useCityContext() {
  const context = useContext(CityContext)
  if (!context) {
    throw new Error('useCityContext must be used within a CityProvider')
  }
  return context
}

const cities: City[] = [
  {
    id: 'lima',
    name: 'Lima',
    consumption: 12.92,
    cost: 1359.37,
    co2: 557.34,
    status: 'Normal'
  },
  {
    id: 'arequipa',
    name: 'Arequipa',
    consumption: 10.23,
    cost: 2637.18,
    co2: 554.35,
    status: 'Normal'
  },
  {
    id: 'trujillo',
    name: 'Trujillo',
    consumption: 15.07,
    cost: 2619.25,
    co2: 553.55,
    status: 'Normal'
  }
]

interface CityProviderProps {
  children: ReactNode
}

export function CityProvider({ children }: CityProviderProps) {
  const [selectedCity, setSelectedCity] = useState<string>('todas')

  const getCityData = (cityId: string): City | null => {
    return cities.find(city => city.id === cityId) || null
  }

  return (
    <CityContext.Provider value={{
      selectedCity,
      setSelectedCity,
      cities,
      getCityData
    }}>
      {children}
    </CityContext.Provider>
  )
}

export function CitySelector() {
  const { selectedCity, setSelectedCity, cities } = useCityContext()
  const [isOpen, setIsOpen] = useState(false)

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId)
    setIsOpen(false)
  }

  const getSelectedCityName = () => {
    if (selectedCity === 'todas') return 'Todas'
    return cities.find(city => city.id === selectedCity)?.name || 'Todas'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      >
        <MapPin className="w-4 h-4 text-[var(--primary)]" />
        <span className="font-medium">{getSelectedCityName()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 w-48 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg z-50 animate-slide-up">
            <div className="py-2">
              <button
                onClick={() => handleCitySelect('todas')}
                className={`w-full text-left px-4 py-2 hover:bg-[var(--muted)] transition-colors ${
                  selectedCity === 'todas' ? 'bg-[var(--muted)] text-[var(--primary)]' : 'text-[var(--foreground)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                  <div>
                    <div className="font-medium">Todas</div>
                    <div className="text-xs text-[var(--muted-foreground)]">Vista consolidada</div>
                  </div>
                </div>
              </button>
              
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city.id)}
                  className={`w-full text-left px-4 py-2 hover:bg-[var(--muted)] transition-colors ${
                    selectedCity === city.id ? 'bg-[var(--muted)] text-[var(--primary)]' : 'text-[var(--foreground)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--info)] to-[var(--success)] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{city.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-medium">{city.name}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">
                        {city.consumption} kWh • {city.status}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}