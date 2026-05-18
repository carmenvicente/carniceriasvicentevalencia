// app/micuenta/pedidos/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import Link from 'next/link';

// Define la interfaz para la estructura de un pedido
interface Pedido {
  id: number;
  fecha: string; // La fecha de creación del pedido
  total: number;
  estado: string;
  productos: { // Array de objetos que representan los productos del pedido
    nombre: string;
    cantidad: number;
    precio: number;
    // Puedes añadir aquí cualquier otra propiedad que tengan tus objetos de producto (ej. id, imagen)
  }[];
}

// Componente principal de la página de pedidos del usuario
export default function PedidosUsuarioPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]); // Estado para almacenar la lista de pedidos
  const [cargando, setCargando] = useState(true); // Estado para indicar si los datos se están cargando
  const [errorCarga, setErrorCarga] = useState(false); // Estado para indicar si hubo un error al cargar

  // Efecto que se ejecuta una vez al montar el componente para cargar los pedidos
  useEffect(() => {
    const fetchPedidos = async () => {
      const token = localStorage.getItem('token'); // Obtiene el token de autenticación del almacenamiento local
      if (!token) {
        // Si no hay token, el usuario no está autenticado
        console.warn('No hay token de autenticación. Redirigiendo o mostrando mensaje de login.');
        setCargando(false);
        setErrorCarga(true); // Establece el estado de error para mostrar el mensaje de no autenticado
        return;
      }

      try {
        // Realiza la petición GET a la API de pedidos, enviando el token en el encabezado de autorización
        const res = await fetch(`/api/pedidos`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Envía el token JWT
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          // Si la respuesta no es exitosa (ej. 401, 500), lanza un error
          const errorData = await res.json();
          throw new Error(`Error HTTP: ${res.status} - ${errorData.error || res.statusText}`);
        }

        const data = await res.json(); // Parsea la respuesta JSON
        setPedidos(data); // Actualiza el estado con los pedidos recibidos
        setCargando(false); // Finaliza el estado de carga
      } catch (err: any) { // Captura cualquier error durante la petición
        console.error('Error al cargar pedidos del usuario:', err);
        setErrorCarga(true); // Establece el estado de error
        setCargando(false); // Finaliza el estado de carga
      }
    };

    fetchPedidos(); // Llama a la función para cargar los pedidos
  }, []); // El array de dependencias vacío asegura que este efecto se ejecute solo una vez al montar

  // Función auxiliar para renderizar el estado del pedido de forma más legible
  const renderEstado = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'En espera de pago ⏳';
      case 'pagado':
        return 'En preparación 👨‍🍳'; // Pagado por Stripe, listo para ser preparado
      case 'listo':
        return 'Listo para recoger ✨'; // Marcado como listo por el admin
      case 'recogido':
        return 'Recogido ✅';
      case 'cancelado':
        return 'Cancelado ❌';
      case 'pagado_en_tienda':
        return 'Pagado en tienda 🏬'; // Estado para pagos en tienda
      default:
        return estado; // Si el estado no coincide con ninguno, muestra el valor original
    }
  };

  return (
    <>
      <Navbar />
      {/* Barra negra debajo del Navbar */}
      <div className="h-22 w-full bg-black" />

      {/* Cabecera blanca con título y navegación de migas de pan - SIEMPRE VISIBLE */}
      <div className="w-full py-3 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-black">Mis pedidos</h1>
          <div className="mt-1 text-black text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span className="mx-1">/</span>
            <Link href="/micuenta" className="hover:text-gray-700">
              Mi cuenta
            </Link>
            <span className="mx-1">/</span>
            <span>Mis Pedidos</span>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 pt-3 pb-0">
        <Link href="/micuenta" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-black transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Mi Cuenta
        </Link>
      </div>


      {/* Contenido principal condicional (cargando, error, sin pedidos, o lista de pedidos) */}
      {cargando ? (
        <div className="min-h-[60vh] bg-white flex items-center justify-center">
          <p className="p-4 text-gray-700 text-lg" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Cargando tus pedidos...</p>
        </div>
      ) : errorCarga ? (
        <div className="min-h-[60vh] bg-white flex flex-col items-center justify-center text-center">
          <p className="p-4 text-red-600 text-lg font-semibold">No se pudieron cargar tus pedidos.</p>
          <p className="text-gray-700" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Por favor, asegúrate de haber iniciado sesión correctamente.</p>
          <Link href="/registrologin/login" className="mt-4 text-blue-600 hover:underline">
            Ir a Iniciar Sesión
          </Link>
        </div>
      ) : pedidos.length === 0 ? (
        <div className="min-h-[60vh] bg-white flex flex-col items-center justify-center text-center">
          <p className="p-4 text-gray-700 text-lg font-semibold">No tienes pedidos registrados todavía.</p>
          <p className="text-gray-600" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>¡Explora nuestros productos y haz tu primer pedido!</p>
          <Link href="/productos-frescos/ternera" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Ver Productos
          </Link>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8 mb-8">
          <ul className="space-y-6">
            {pedidos.map(pedido => (
              <li key={pedido.id} className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-lg font-semibold text-gray-900">Pedido </p>
                  <p className={`font-medium ${pedido.estado === 'listo' ? 'text-green-600' : pedido.estado === 'pagado' ? 'text-blue-600' : 'text-gray-600'}`}>
                    {renderEstado(pedido.estado)}
                  </p>
                </div>
                
                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}><strong>Fecha del pedido:</strong> {new Date(pedido.fecha).toLocaleDateString()} a las {new Date(pedido.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-sm text-gray-600 mb-4"style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}><strong>Total pagado:</strong> <span className="font-bold text-gray-900">{pedido.total.toFixed(2)} €</span></p>

                <div className="mb-3">
                  <h3 className="text-base font-semibold text-gray-700 mb-2">Artículos:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                    {pedido.productos && pedido.productos.length > 0 ? (
                      pedido.productos.map((item, index) => (
                        <li key={index}>
                          {item.nombre} (x{item.cantidad}) - {item.precio.toFixed(2)} €/ud
                        </li>
                      ))
                    ) : (
                      <li>No se pudieron cargar los detalles de los productos.</li>
                    )}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </>
  );
}
