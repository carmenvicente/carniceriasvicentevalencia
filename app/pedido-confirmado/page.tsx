// app/pedido-confirmado/page.tsx
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'

// Componente principal de la página
export default function PedidoConfirmadoPage() {
  return (
    // Envuelve el contenido que usa useSearchParams en Suspense
    <Suspense fallback={<div>Cargando confirmación de pedido...</div>}>
      <PedidoConfirmadoContent />
    </Suspense>
  )
}

// Componente que maneja la lógica y renderiza el contenido
function PedidoConfirmadoContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [cargando, setCargando] = useState(true)
  const [email, setEmail] = useState('')
  const [total, setTotal] = useState<number | null>(null)
  const [estadoPedido, setEstadoPedido] = useState<string>('') // Nuevo estado para almacenar el estado del pedido
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPedidoDetails = async () => {
      if (!sessionId) {
        setError(true)
        setCargando(false)
        return
      }

      try {
        // Llama a tu endpoint API para obtener los detalles del pedido confirmados por el webhook
        const res = await fetch('/api/pedidos/confirmar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })

        const data = await res.json()

        if (res.ok) {
          setEmail(data.email)
          setTotal(data.total)
          setEstadoPedido(data.estado) // Almacena el estado recibido del backend
        } else {
          console.error('Error del backend al confirmar pedido:', data.error);
          setError(true)
        }
      } catch (err) {
        console.error('Error en el frontend al obtener detalles del pedido:', err)
        setError(true)
      } finally {
        setCargando(false)
      }
    }

    fetchPedidoDetails()
  }, [sessionId]) // Dependencia para que se ejecute cuando el sessionId esté disponible

  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] bg-[rgb(22,22,22)] text-white flex flex-col items-center justify-center px-6 py-20">
        {cargando ? (
          <p className="text-lg font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Confirmando tu pedido...</p>
        ) : error ? (
          <div className="text-red-500 text-center space-y-4">
            <p className="text-xl font-bold">¡Lo sentimos!</p>
            <p className="text-lg" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Hubo un error al confirmar tu pedido o al obtener sus detalles.</p>
            <p className="text-base" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Por favor, revisa tu correo electrónico para ver si recibiste una confirmación de pago o contáctanos si la necesitas.</p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
            <p className="text-lg" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Hemos recibido tu pedido correctamente.</p>

            {/* Mensaje condicional basado en el estado del pedido */}
            {estadoPedido === 'pagado' && (
                <p className="text-green-400 font-semibold text-base" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>El pago se ha procesado con éxito.</p>
            )}
            {estadoPedido === 'pendiente' && (
                <p className="text-yellow-400 font-semibold text-base" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Tu pedido está pendiente de confirmación de pago. Revisa tu correo.</p>
            )}
            {estadoPedido && estadoPedido !== 'pagado' && estadoPedido !== 'pendiente' && (
                <p className="text-gray-400 font-semibold text-base" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Estado del pedido: {estadoPedido}</p>
            )}


            <p className="text-sm text-gray-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Se ha enviado un email de confirmación a:</p>
            <p className="text-base font-semibold">{email}</p>
            {total !== null && (
              <p className="text-sm text-gray-400">
                Importe total:{' '}
                <span className="text-white font-semibold">{total.toFixed(2)} €</span>
              </p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}