'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'

interface Pedido {
  id: number
  nombre: string
  apellidos: string
  total: number
  productos: string
  metodo_pago: string
  estado: string
}

export default function GestionPedidos() {
  const [pendientes, setPendientes] = useState<Pedido[]>([])
  const [listos, setListos] = useState<Pedido[]>([])

  useEffect(() => {
    fetch('/api/admin/pedidos')
      .then(res => res.json())
      .then(data => {
        setPendientes(data.pendientes || [])
        setListos(data.listos || [])
      })
      .catch(err => console.error('Error al cargar pedidos:', err))
  }, [])

  const marcarComoListo = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/pedidos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'listo' })
      })

      if (res.ok) {
        const pedidoActualizado = pendientes.find(p => p.id === id)
        if (pedidoActualizado) {
          setPendientes(pendientes.filter(p => p.id !== id))
          setListos([...listos, { ...pedidoActualizado, estado: 'listo' }])
        }
      }
    } catch (error) {
      console.error('Error actualizando el estado del pedido:', error)
    }
  }

  const renderMetodo = (m: string) => {
    return m === 'tarjeta'
      ? 'Tarjeta 💳'
      : m === 'apple'
      ? 'Apple Pay 🍎'
      : m === 'google'
      ? 'Google Pay 🔵'
      : 'Pagar al recoger 🏬'
  }

  const renderPedido = (pedido: Pedido, esPendiente: boolean) => (
    <div key={pedido.id} className="border rounded-md p-4 bg-white shadow">
      <p className="font-semibold">{pedido.nombre} {pedido.apellidos}</p>
      <p>🧾 Productos: {pedido.productos}</p>
      <p>💰 Total: {pedido.total.toFixed(2)} €</p>
      <p>💳 Método de pago: {renderMetodo(pedido.metodo_pago)}</p>
      <p>📦 Estado: {pedido.estado}</p>
      {esPendiente && (
        <button
          onClick={() => marcarComoListo(pedido.id)}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Marcar como listo
        </button>
      )}
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="h-20 w-full bg-black" />

      <div className="max-w-screen-xl mx-auto py-10 px-6">
        <h1 className="text-2xl font-bold text-center mb-10">Gestión de pedidos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-red-700">Pedidos pendientes de preparar</h2>
            <div className="space-y-4">
              {pendientes.length > 0 ? pendientes.map(p => renderPedido(p, true)) : <p>No hay pedidos pendientes.</p>}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-700">Pedidos listos</h2>
            <div className="space-y-4">
              {listos.length > 0 ? listos.map(p => renderPedido(p, false)) : <p>No hay pedidos listos aún.</p>}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
