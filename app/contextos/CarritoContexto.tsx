'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Tipo del producto
type Producto = {
  id: number
  nombre: string
  precio: number
  imagen: string
  cantidad: number
}

// Tipo del contexto
type CarritoContextType = {
  carrito: Producto[]
  añadirAlCarrito: (producto: Omit<Producto, 'cantidad'>) => void
  eliminarDelCarrito: (id: number) => void
  vaciarCarrito: () => void
}

// Crear el contexto
const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export function useCarrito() {
  const context = useContext(CarritoContext)
  if (!context) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return context
}

// Provider
export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [carrito, setCarrito] = useState<Producto[]>([])

  // Añadir producto al carrito
  const añadirAlCarrito = (producto: Omit<Producto, 'cantidad'>) => {
    setCarrito(prev => {
      const existente = prev.find(p => p.id === producto.id)
      if (existente) {
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id: number) => {
    setCarrito(prev => prev.filter(p => p.id !== id))
  }

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([])
  }

  return (
    <CarritoContext.Provider value={{ carrito, añadirAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  )
}
