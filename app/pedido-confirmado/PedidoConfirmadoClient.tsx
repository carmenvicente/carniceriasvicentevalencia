'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'

export default function PedidoConfirmadoClient() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [cargando, setCargando] = useState(true)
  const [email, setEmail] = useState('')
  const [total, setTotal] = useState<number | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const confirmarPedido = async () => {
      if (!sessionId) {
        setError(true)
        setCargando(false)
        return
      }

      try {
        const res = await fetch('/api/pedidos/confirmar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })

        const data = await res.json()

        if (res.ok) {
          setEmail(data.email)
          setTotal(data.total)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error confirmando el pedido:', err)
        setError(true)
      } finally {
        setCargando(false)
      }
    }

    confirmarPedido()
  }, [sessionId])

  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] bg-[rgb(22,22,22)] text-white flex flex-col items-center justify-center px-6 py-20">
        {cargando ? (
          <p className="text-lg font-semibold">Confirmando tu pedido...</p>
        ) : error ? (
          <p className="text-red-500 text-center text-lg font-semibold">Hubo un error al confirmar tu pedido.</p>
        ) : (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
            <p className="text-lg">Hemos recibido tu pedido correctamente.</p>
            <p className="text-sm text-gray-300">Se ha enviado un email de confirmación a:</p>
            <p className="text-base font-semibold">{email}</p>
            {total !== null && (
              <p className="text-sm text-gray-400">Importe total: <span className="text-white font-semibold">{total.toFixed(2)} €</span></p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
