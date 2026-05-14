// app/micuenta/editar-pedidos/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'
import Link from 'next/link'

// Definición de la interfaz Pedido actualizada
interface Pedido {
  id: number
  email: string // Usamos email como identificador del cliente
  total: number
  productos: any[] // Ahora será un array de objetos (parseado)
  metodo_pago: string
  estado: string
  creado_en: string // Añadido para mostrar la fecha de creación
}

export default function GestionPedidos() {
  const [pendientes, setPendientes] = useState<Pedido[]>([])
  const [listos, setListos] = useState<Pedido[]>([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState(false)

  const cargarPedidos = async () => {
    setCargando(true);
    setErrorCarga(false);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/pedidos', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setPendientes(data.pendientes || []);
      setListos(data.listos || []);
    } catch (err) {
      console.error('Error al cargar pedidos:', err);
      setErrorCarga(true);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  const marcarComoListo = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/pedidos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ estado: 'listo' })
      })

      if (res.ok) {
        // Recargar los pedidos después de la actualización para reflejar los cambios
        await cargarPedidos();
      } else {
        const errorData = await res.json();
        alert(`Error al marcar como listo: ${errorData.error || 'Error desconocido'}`);
        console.error('Error al marcar como listo:', errorData);
      }
    } catch (error) {
      console.error('Error actualizando el estado del pedido:', error);
      alert('Hubo un error al actualizar el estado del pedido.');
    }
  }

  // --- MODIFICACIÓN CLAVE DE renderMetodo ---
  const renderMetodo = (m: string, isForEstado: boolean = false, pedidoMetodoPago?: string) => {
    if (isForEstado) { // Si estamos renderizando el estado del pedido
      if (pedidoMetodoPago === 'tienda') { // Si el método de pago original es 'tienda'
        if (m === 'listo') {
          return 'Pagado en tienda 🏬'; // Cuando está listo, si se paga en tienda
        } else {
          return 'Pagar en tienda 🏬'; // Cuando está pendiente, si se paga en tienda
        }
      } else { // Si el método de pago original NO es 'tienda' (online)
        switch (m) {
          case 'pagado': return 'Pagado Online ✅';
          case 'pendiente': return 'Pendiente ⏳';
          case 'listo': return 'Listo para recoger ✨'; // Para pedidos pagados online que están listos
          default: return m;
        }
      }
    } else { // Si estamos renderizando el método de pago (no el estado)
      switch (m) {
        case 'tarjeta': return 'Tarjeta 💳';
        case 'apple': return 'Apple Pay 🍎';
        case 'google': return 'Google Pay 🔵';
        case 'tienda': return 'Pagar al recoger 🏬';
        // 'pagado_en_tienda' no debería usarse como un método de pago, sino como un estado interno
        default: return m;
      }
    }
  };
  // --- FIN DE LA MODIFICACIÓN CLAVE ---

  // Función para renderizar un pedido individual
  const renderPedido = (pedido: Pedido, esPendiente: boolean) => (
    <div key={pedido.id} className="border rounded-md p-4 bg-white shadow">
      <p className="font-semibold text-black">Cliente: {pedido.email}</p>
      <p className="text-sm text-gray-600 text-black">Creado: {new Date(pedido.creado_en).toLocaleString()}</p>
      <div className="mt-2 mb-2">
        <p className="font-medium text-black">🧾 Productos:</p>
        <ul className="list-disc list-inside text-sm ml-4 text-black">
          {pedido.productos && pedido.productos.length > 0 ? (
            pedido.productos.map((prod: any, idx: number) => (
              <li key={idx}>{prod.nombre} (x{prod.cantidad}) - {prod.precio.toFixed(2)} €/ud</li>
            ))
          ) : (
            <li>No hay detalles de productos.</li>
          )}
        </ul>
      </div>
      <p className="text-black">💰 Total: {pedido.total.toFixed(2)} €</p>
      {/* Pasar el segundo argumento a renderMetodo para el método de pago */}
      <p className="text-black">💳 Método de pago: {renderMetodo(pedido.metodo_pago, false)}</p>
      {/* Pasar el segundo y tercer argumento a renderMetodo para el estado */}
      <p className="text-black">📦 Estado: {renderMetodo(pedido.estado, true, pedido.metodo_pago)}</p>
      {esPendiente && (
        <button
          onClick={() => marcarComoListo(pedido.id)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Marcar como listo
        </button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="h-20 w-full bg-black" /> {/* Espacio para el Navbar fijo */}

      <div className="max-w-screen-xl mx-auto py-10 px-6">
        {/* CABECERA */}
      <div className="w-full py-3 bg-white mb-10">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-black">Gestión de Pedidos</h1>
          <div className="mt-1 text-black text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/micuenta" className="hover:text-gray-700">Mi cuenta</Link>
            <span className="mx-1">/</span>
            <span>Gestión de Pedidos</span>
          </div>
        </div>
      </div>
        
        {cargando ? (
          <p className="text-center text-gray-700">Cargando pedidos...</p>
        ) : errorCarga ? (
          <p className="text-center text-red-600" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Error al cargar los pedidos. Inténtalo de nuevo más tarde.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-red-700">Pedidos pendientes de preparar</h2>
              <div className="space-y-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                {pendientes.length > 0 ? pendientes.map(p => renderPedido(p, true)) : <p className="text-gray-600">No hay pedidos pendientes de preparación.</p>}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-green-700">Pedidos listos</h2>
              <div className="space-y-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                {listos.length > 0 ? listos.map(p => renderPedido(p, false)) : <p className="text-gray-600" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>No hay pedidos listos aún.</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}