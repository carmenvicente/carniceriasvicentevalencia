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
  const metodoPagoParam = searchParams.get('metodo') // Nuevo: para detectar pago en tienda
  const emailParam = searchParams.get('email') // Nuevo: email para pago en tienda
  const totalParam = searchParams.get('total') // Nuevo: total para pago en tienda

  const [cargando, setCargando] = useState(true)
  const [email, setEmail] = useState('')
  const [total, setTotal] = useState<number | null>(null)
  const [estadoPedido, setEstadoPedido] = useState<string>('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const handleConfirmation = async () => {
      // Si es un pedido de "tienda" (recoger en tienda)
      if (metodoPagoParam === 'tienda') {
        console.log('Detectado método de pago: tienda');
        if (emailParam && totalParam) {
          setEmail(decodeURIComponent(emailParam));
          setTotal(parseFloat(totalParam));
          setEstadoPedido('pagado_en_tienda'); // O el estado que uses para "pago en tienda"
          setCargando(false);
          setError(false);
        } else {
          console.error('Faltan parámetros para la confirmación de pedido en tienda.');
          setError(true);
          setCargando(false);
        }
        return; // Salir de la función, ya hemos manejado el caso 'tienda'
      }

      // Si es un pedido de Stripe (se requiere sessionId)
      if (!sessionId) {
        console.error('No se encontró session_id ni metodo=tienda. Error.');
        setError(true);
        setCargando(false);
        return;
      }

      try {
        const res = await fetch('/api/pedidos/confirmar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (res.ok) {
          setEmail(data.email);
          setTotal(data.total);
          setEstadoPedido(data.estado);
        } else {
          console.error('Error del backend al confirmar pedido (Stripe):', data.error);
          setError(true);
        }
      } catch (err) {
        console.error('Error en el frontend al obtener detalles del pedido (Stripe):', err);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    handleConfirmation();
  }, [sessionId, metodoPagoParam, emailParam, totalParam]); // Añadir las nuevas dependencias

  return (
    <>
      <Navbar />
      <div className="min-h-[110vh] bg-[rgb(22,22,22)] text-white flex flex-col items-center justify-center px-6 py-20">
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
            {estadoPedido === 'pagado_en_tienda' && ( // Nuevo mensaje para pago en tienda
              <p className="text-blue-400 font-semibold text-base" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Tu pedido ha sido registrado para pagar al recoger en tienda.</p>
            )}
            {estadoPedido === 'pendiente' && (
              <p className="text-yellow-400 font-semibold text-base" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Tu pedido está pendiente de confirmación de pago. Revisa tu correo.</p>
            )}
            {estadoPedido && estadoPedido !== 'pagado' && estadoPedido !== 'pendiente' && estadoPedido !== 'pagado_en_tienda' && (
              <p className="text-gray-400 font-semibold text-base" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Estado del pedido: {estadoPedido}</p>
            )}


            <p className="text-sm text-gray-300" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Se ha enviado un email de confirmación a:</p>
            <p className="text-base font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>{email}</p>
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