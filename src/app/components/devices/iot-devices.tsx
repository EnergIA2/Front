"use client"

import { useState, useEffect } from "react"
import {
  Wifi,
  WifiOff,
  Lightbulb,
  ThermometerSun,
  Fan,
  Cpu,
  Battery,
  Power,
  MoreVertical,
  Gauge
} from "lucide-react"

interface IoTDevice {
  id: string
  name: string
  type: 'hvac' | 'lighting' | 'security' | 'sensor' | 'other'
  status: 'online' | 'offline' | 'warning'
  consumption: number
  lastUpdate: string
  location: string
  temperature?: number
  humidity?: number
  brightness?: number
  icon: React.ComponentType<any>
}

export function IoTDevices() {
  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      id: '1',
      name: 'Sistema HVAC Principal',
      type: 'hvac',
      status: 'online',
      consumption: 2.4,
      lastUpdate: 'hace 2 min',
      location: 'Planta Baja',
      temperature: 22.5,
      icon: ThermometerSun
    },
    {
      id: '2',
      name: 'Iluminación LED Oficina 1',
      type: 'lighting',
      status: 'online',
      consumption: 0.8,
      lastUpdate: 'hace 1 min',
      location: 'Oficina 1',
      brightness: 85,
      icon: Lightbulb
    },
    {
      id: '3',
      name: 'Ventilador Industrial A3',
      type: 'other',
      status: 'warning',
      consumption: 1.2,
      lastUpdate: 'hace 5 min',
      location: 'Almacén',
      icon: Fan
    },
    {
      id: '4',
      name: 'Servidor Principal',
      type: 'other',
      status: 'online',
      consumption: 0.6,
      lastUpdate: 'hace 1 min',
      location: 'Sala de Servidores',
      temperature: 18.2,
      icon: Cpu
    },
    {
      id: '5',
      name: 'Sensor Temperatura Zona B',
      type: 'sensor',
      status: 'offline',
      consumption: 0.0,
      lastUpdate: 'hace 2 horas',
      location: 'Zona B',
      temperature: 0,
      humidity: 0,
      icon: Gauge
    }
  ])

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(device => ({
        ...device,
        consumption: device.status === 'online'
          ? device.consumption + (Math.random() - 0.5) * 0.2
          : device.consumption,
        temperature: device.temperature
          ? device.temperature + (Math.random() - 0.5) * 2
          : undefined,
        brightness: device.brightness
          ? Math.max(10, Math.min(100, device.brightness + (Math.random() - 0.5) * 10))
          : undefined,
        lastUpdate: device.status === 'online' ? 'hace 1 min' : device.lastUpdate
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: IoTDevice['status']) => {
    switch (status) {
      case 'online': return 'var(--success)'
      case 'warning': return 'var(--warning)'
      case 'offline': return 'var(--destructive)'
    }
  }

  const getStatusIcon = (status: IoTDevice['status']) => {
    return status === 'offline' ? WifiOff : Wifi
  }

  const toggleDevice = (deviceId: string) => {
    setDevices(prev => prev.map(device =>
      device.id === deviceId
        ? {
            ...device,
            status: device.status === 'online' ? 'offline' : 'online',
            consumption: device.status === 'online' ? 0 : device.consumption
          }
        : device
    ))
  }

  const onlineDevices = devices.filter(d => d.status === 'online').length
  const totalConsumption = devices.reduce((sum, d) => sum + d.consumption, 0)

  return (
    <div className="p-4 md:p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-[var(--foreground)]">
            Dispositivos IoT
          </h2>
          <p className="text-xs md:text-sm text-[var(--muted-foreground)] mt-1">
            {onlineDevices} de {devices.length} dispositivos activos
          </p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-[var(--primary)]">
            {totalConsumption.toFixed(1)} kW
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">
            Consumo total
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {devices.map((device, index) => {
          const StatusIcon = getStatusIcon(device.status)

          return (
            <div
              key={device.id}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--muted)] hover:bg-[var(--secondary)] transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${getStatusColor(device.status)}20` }}
                  >
                    <device.icon
                      className="w-5 h-5"
                      style={{ color: getStatusColor(device.status) }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[var(--foreground)] text-sm truncate">
                      {device.name}
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {device.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StatusIcon
                    className="w-4 h-4"
                    style={{ color: getStatusColor(device.status) }}
                  />
                  <button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Device Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                <div>
                  <span className="text-[var(--muted-foreground)]">Consumo:</span>
                  <p className="font-medium text-[var(--foreground)]">
                    {device.consumption.toFixed(1)} kW
                  </p>
                </div>

                <div>
                  <span className="text-[var(--muted-foreground)]">Estado:</span>
                  <p
                    className="font-medium capitalize"
                    style={{ color: getStatusColor(device.status) }}
                  >
                    {device.status === 'online' ? 'Activo' :
                     device.status === 'warning' ? 'Alerta' : 'Inactivo'}
                  </p>
                </div>

                {device.temperature && (
                  <div>
                    <span className="text-[var(--muted-foreground)]">Temp:</span>
                    <p className="font-medium text-[var(--foreground)]">
                      {device.temperature.toFixed(1)}°C
                    </p>
                  </div>
                )}

                {device.brightness && (
                  <div>
                    <span className="text-[var(--muted-foreground)]">Brillo:</span>
                    <p className="font-medium text-[var(--foreground)]">
                      {device.brightness.toFixed(0)}%
                    </p>
                  </div>
                )}

                {device.humidity && (
                  <div>
                    <span className="text-[var(--muted-foreground)]">Humedad:</span>
                    <p className="font-medium text-[var(--foreground)]">
                      {device.humidity}%
                    </p>
                  </div>
                )}
              </div>

              {/* Device Controls */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <span className="text-xs text-[var(--muted-foreground)]">
                  {device.lastUpdate}
                </span>

                <button
                  onClick={() => toggleDevice(device.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    device.status === 'online'
                      ? 'bg-[var(--success)] text-white hover:opacity-90'
                      : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]'
                  }`}
                  title={device.status === 'online' ? 'Desactivar' : 'Activar'}
                >
                  <Power className="w-3 h-3" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-[var(--border)]">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="text-2xl font-bold text-[var(--success)]">
              {onlineDevices}
            </div>
            <div className="text-[var(--muted-foreground)]">Activos</div>
          </div>

          <div>
            <div className="text-2xl font-bold text-[var(--warning)]">
              {devices.filter(d => d.status === 'warning').length}
            </div>
            <div className="text-[var(--muted-foreground)]">Alertas</div>
          </div>

          <div>
            <div className="text-2xl font-bold text-[var(--destructive)]">
              {devices.filter(d => d.status === 'offline').length}
            </div>
            <div className="text-[var(--muted-foreground)]">Inactivos</div>
          </div>
        </div>
      </div>
    </div>
  )
}