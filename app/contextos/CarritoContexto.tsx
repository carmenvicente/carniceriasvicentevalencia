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

// Tipo del contexto incluyendo setCarrito
type CarritoContextType = {
  carrito: Producto[]
  añadirAlCarrito: (producto: Omit<Producto, 'cantidad'>) => void
  eliminarDelCarrito: (id: number) => void
  vaciarCarrito: () => void
  actualizarCantidad: (id: number, nuevaCantidad: number) => void
  setCarrito: (carrito: Producto[]) => void
}

// Crear el contexto
const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

// Hook personalizado
export function useCarrito() {
  const context = useContext(CarritoContext)
  if (!context) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return context
}

// Provider
export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [carrito, setCarrito] = useState<Producto[]>([])

  useEffect(() => {
    try {
      const carritoGuardado = localStorage.getItem('carrito')
      if (carritoGuardado) {
        setCarrito(JSON.parse(carritoGuardado))
      }
    } catch (err) {
      console.error('❌ Error al cargar el carrito desde localStorage:', err)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(carrito))
    } catch (err) {
      console.error('❌ Error al guardar el carrito en localStorage:', err)
    }
  }, [carrito])

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

  const eliminarDelCarrito = (id: number) => {
    setCarrito(prev => prev.filter(p => p.id !== id))
  }

  const vaciarCarrito = () => {
    try {
      localStorage.removeItem('carrito')
    } catch (err) {
      console.error('❌ Error al limpiar carrito en localStorage:', err)
    }
    setCarrito([])
  }

  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    setCarrito(prev =>
      prev.map(p =>
        p.id === id ? { ...p, cantidad: nuevaCantidad } : p
      )
    )
  }

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        añadirAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        actualizarCantidad,
        setCarrito, // ✅ añadido al contexto
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}
