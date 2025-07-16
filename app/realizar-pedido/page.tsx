// app/realizar-pedido/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'
import { useCarrito } from '@/app/contextos/CarritoContexto'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function CheckoutPage() {
  const [seccionDatosAbierta, setSeccionDatosAbierta] = useState(true)
  const [seccionPagoAbierta, setSeccionPagoAbierta] = useState(false)
  const [modoInvitado, setModoInvitado] = useState(true)
  const [mostrarLogin, setMostrarLogin] = useState(false)
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [datosCompletados, setDatosCompletados] = useState(false)
  const [metodoPago, setMetodoPago] = useState('')

  const [usuario, setUsuario] = useState<{ nombre: string; apellidos: string; email: string } | null>(null)
  const [datosInvitado, setDatosInvitado] = useState({ tratamiento: '', nombre: '', apellidos: '', correo: '' })

  const { carrito, setCarrito } = useCarrito()
  const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito')
    if (carritoGuardado) {
      try {
        const productos = JSON.parse(carritoGuardado)
        if (Array.isArray(productos) && productos.length > 0 && carrito.length === 0) {
          setCarrito(productos)
        }
      } catch (e) {
        console.error('❌ Carrito corrupto en localStorage', e)
      }
    }

    const seccionGuardada = localStorage.getItem('seccionPedido')
    if (seccionGuardada === 'pago') {
      setDatosCompletados(true)
      setSeccionPagoAbierta(true)
      setSeccionDatosAbierta(false)
      localStorage.removeItem('seccionPedido')
      setTimeout(() => {
        const pago = document.getElementById('seccion-pago')
        if (pago) pago.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }

    const userStr = localStorage.getItem('usuario')
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        if (user?.nombre && user?.apellidos && user?.email) {
          setUsuario(user)
          setDatosCompletados(true)
          setSeccionPagoAbierta(true)
          setModoInvitado(false)
          setMostrarLogin(false)
        }
      } catch (err) {
        console.error('❌ Error al parsear usuario:', err)
      }
    }

    const datosGuardados = localStorage.getItem('datosInvitado')
    if (datosGuardados && !userStr) {
      setDatosInvitado(JSON.parse(datosGuardados))
    }
  }, [])

  useEffect(() => {
    if (modoInvitado) {
      localStorage.setItem('datosInvitado', JSON.stringify(datosInvitado))
    }
  }, [datosInvitado, modoInvitado])

  const guardarDatosInvitado = () => {
    if (datosInvitado.tratamiento && datosInvitado.nombre && datosInvitado.apellidos && datosInvitado.correo) {
      localStorage.setItem('datosInvitado', JSON.stringify(datosInvitado))
      setDatosCompletados(true)
      setSeccionPagoAbierta(true)
      localStorage.setItem('seccionPedido', 'pago')
    }
  }

  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    localStorage.removeItem('token')
    setUsuario(null)
    setDatosCompletados(false)
    setSeccionPagoAbierta(false)
    setModoInvitado(true)
    setSeccionDatosAbierta(true)
    window.location.reload()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!metodoPago) return alert('Por favor, selecciona un método de pago.')
    if (!datosCompletados) return alert('Por favor, completa tus datos personales.')

    const email = usuario?.email || datosInvitado.correo
    const body = JSON.stringify({ productos: carrito, email, metodoPago })

    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Fallo al procesar el pedido');
      }
      const data = await res.json()

      localStorage.setItem('carrito', JSON.stringify(carrito))
      if (!usuario) {
        localStorage.setItem('datosInvitado', JSON.stringify(datosInvitado))
      }
      localStorage.setItem('seccionPedido', 'pago')

      if (data?.url) {
        window.location.href = data.url
      } else {
        window.location.href = '/pedido-confirmado'
      }
    } catch (err: any) {
      console.error('Error al procesar el pedido:', err)
      alert('Hubo un error al procesar el pedido: ' + err.message)
    }
  }

  return (
    <>
      <Navbar />

      {/* CABECERA */}
      <div className="w-full py-3 bg-[rgb(22,22,22)]">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-30">
          <h1 className="text-xl md:text-2xl font-bold text-white">Realizar Pedido</h1>
          <div className="mt-1 text-white text-sm">
            <Link href="/" className="hover:text-gray-300 font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Home</Link>
            <span className="mx-1">/</span>
            <span className="font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Realizar Pedido</span>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      {/* Ajustado el responsive de las columnas principales: una columna por defecto, dos en pantallas lg */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 bg-[rgb(22,22,22)] px-6 md:px-20 py-10">
        <div className="space-y-6">

          {/* DATOS PERSONALES */}
          <div className="bg-white text-black rounded shadow-md overflow-hidden">
            <button
              onClick={() => setSeccionDatosAbierta(!seccionDatosAbierta)}
              className="w-full text-left px-6 py-4 font-semibold transition bg-white hover:bg-gray-300"
            >
              1. DATOS PERSONALES
            </button>

            {seccionDatosAbierta && (
              <div className="px-6 pb-6 pt-2">
                {usuario ? (
                  // ✅ Usuario ya logueado
                  <div className="space-y-2">
                    <p className="text-sm font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      Conectado como <span className="font-bold">{usuario.nombre} {usuario.apellidos}</span>.
                    </p>
                    <button
                      onClick={cerrarSesion}
                      className="text-sm text-red-600 hover:underline font-semibold"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                    >
                      ¿No eres tú? Cierra sesión
                    </button>
                  </div>
                ) : (
                  // ❌ No logueado → Mostrar formulario completo
                  <>
                    {/* Botones de Invitado/Login - Flex en móviles, gap ajustado */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                      <button
                        className={`px-4 py-2 rounded text-sm font-semibold transition-colors w-full sm:w-auto
                          ${modoInvitado ? 'bg-[#990000] text-white hover:bg-red-700' : 'bg-gray-100 text-[#990000] hover:bg-gray-200'}`}
                        onClick={() => { setModoInvitado(true); setMostrarLogin(false) }}
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                      >
                        Pedir como invitado
                      </button>

                      <button
                        className={`px-4 py-2 rounded text-sm font-semibold transition-colors w-full sm:w-auto
                          ${mostrarLogin ? 'bg-[#990000] text-white hover:bg-red-700' : 'bg-gray-100 text-[#990000] hover:bg-gray-200'}`}
                        onClick={() => { setMostrarLogin(true); setModoInvitado(false) }}
                        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                      >
                        Iniciar sesión
                      </button>
                    </div>

                    {modoInvitado && (
                      <form className="space-y-4 text-sm">
                        {/* Ajuste para grid en móvil y desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] items-center gap-2">
                          <label className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Tratamiento:</label>
                          <div className="flex gap-4">
                            {['Sr.', 'Sra.'].map((valor) => (
                              <label key={valor} className="flex items-center gap-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                                <input
                                  type="radio"
                                  name="tratamiento"
                                  value={valor}
                                  required
                                  checked={datosInvitado.tratamiento === valor}
                                  onChange={() => setDatosInvitado({ ...datosInvitado, tratamiento: valor })}
                                />
                                {valor}
                              </label>
                            ))}
                          </div>

                          <label htmlFor="nombre" className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Nombre:</label>
                          <input id="nombre" type="text" required value={datosInvitado.nombre} onChange={(e) => setDatosInvitado({ ...datosInvitado, nombre: e.target.value })} className="w-full p-2 rounded bg-gray-100 text-black" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }} />

                          <label htmlFor="apellidos" className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Apellidos:</label>
                          <input id="apellidos" type="text" required value={datosInvitado.apellidos} onChange={(e) => setDatosInvitado({ ...datosInvitado, apellidos: e.target.value })} className="w-full p-2 rounded bg-gray-100 text-black" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }} />

                          <label htmlFor="correo" className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Correo:</label>
                          <input id="correo" type="email" required value={datosInvitado.correo} onChange={(e) => setDatosInvitado({ ...datosInvitado, correo: e.target.value })} className="w-full p-2 rounded bg-gray-100 text-black" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }} />
                        </div>

                        <button
                          type="button"
                          onClick={guardarDatosInvitado}
                          className="w-full bg-[#990000] hover:bg-red-700 text-white py-2 rounded font-bold mt-2"
                          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                        >
                          Continuar
                        </button>
                      </form>
                    )}

                    {mostrarLogin && (
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault()
                          const email = (e.currentTarget.email as HTMLInputElement).value
                          const password = (e.currentTarget.password as HTMLInputElement).value
                          if (!email || !password) return
                          try {
                            const res = await fetch('/api/auth/login', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ email, password }),
                            })
                            if (res.status === 200) {
                              const { user, token } = await res.json()
                              localStorage.setItem('usuario', JSON.stringify(user))
                              localStorage.setItem('token', token)
                              setUsuario(user)
                              setDatosCompletados(true)
                              setSeccionPagoAbierta(true)
                              setMostrarLogin(false)
                              setModoInvitado(false)
                            } else {
                              alert('Correo o contraseña incorrectos.')
                            }
                          } catch {
                            alert('Error de conexión.')
                          }
                        }}
                        className="space-y-4 text-sm mt-6"
                      >
                        {/* Ajuste para grid en móvil y desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-2">
                          <label htmlFor="email" className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Correo electrónico:</label>
                          <input name="email" type="email" id="email" required className="w-full p-2 rounded bg-gray-100 text-black" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }} />

                          <label htmlFor="password" className="text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Contraseña:</label>
                          <div className="relative w-full" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                            <input
                              name="password"
                              type={mostrarPassword ? 'text' : 'password'}
                              id="password"
                              required
                              className="w-full p-2 pr-10 rounded bg-gray-100 text-black"
                            />
                            <button
                              type="button"
                              onClick={() => setMostrarPassword(!mostrarPassword)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                            >
                              {mostrarPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                          </div>

                        </div>

                        <button type="submit" className="w-full bg-[#990000] hover:bg-red-700 text-white py-2 rounded font-bold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                          Iniciar sesión y continuar
                        </button>
                      </form>
                    )}
                  </>
                )}
              </div>
            )}

          </div>

          {/* DIRECCIÓN */}
          <div className="bg-white text-black rounded shadow-md overflow-hidden">
            <button className="w-full text-left px-6 py-4 font-semibold transition bg-white hover:bg-gray-300 cursor-default" >
              2. DIRECCIÓN
            </button>
            <div className="px-6 pb-6 pt-2 text-sm text-gray-800" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              <p className="mb-5 font-semibold">Los pedidos se recogen exclusivamente en nuestra tienda física.</p>
              <p className="mt-2 text-gray-700">
                Dirección: <span className="font-semibold">Av. de Castilla-la Mancha, N° 27, Bajo, 16003 Cuenca</span>
              </p>
              <p className="text-gray-600 font-semibold">Recuerda venir en horario comercial para recoger tu pedido.</p>
            </div>
          </div>

          {/* PAGO */}
          <div className="bg-white text-black rounded shadow-md overflow-hidden">
            <button
              onClick={() => datosCompletados && setSeccionPagoAbierta(!seccionPagoAbierta)}
              disabled={!datosCompletados}
              className={`w-full text-left px-6 py-4 font-semibold transition ${datosCompletados ? 'bg-white hover:bg-gray-300' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              3. PAGO
            </button>

            {seccionPagoAbierta && (
              <div className="px-6 pb-6 pt-2">
                <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-800" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  <p className="text-sm text-gray-700">Selecciona tu método de pago:</p>
                  {/* Contenedor para los radio buttons, ahora se apilan en móvil y luego son flex */}
                  <div className="flex flex-col gap-2"> {/* Modificado: flex-col para apilar en móvil */}
                    {['tarjeta', 'tienda'].map((m) => (
                      <label key={m} className="flex items-center gap-2">
                        <input type="radio" name="metodoPago" value={m} onChange={(e) => setMetodoPago(e.target.value)} required />
                        {m === 'tarjeta' ? 'Pago online 💳 (Tarjeta, Apple Pay, Link)' : 'Pagar al recoger 🏬'}
                      </label>
                    ))}
                  </div>

                  {/* LÍNEA DE TÉRMINOS Y CONDICIONES: MODIFICADA AQUÍ */}
                  <div className="flex items-start text-xs text-gray-600" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                    <input type="checkbox" required className="mt-1 mr-2 flex-shrink-0" /> {/* Añadimos mt-1 para alinear con el texto */}
                    <span>
                      Estoy de acuerdo con los
                      <Link href="/informacionlegal/terminos-y-condiciones" className="text-gray-600 hover:underline mx-1" target="_blank" rel="noopener noreferrer">
                        términos del servicio
                      </Link>
                      los acepto sin reservas.
                    </span>
                  </div>

                  <button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded font-bold">
                    Finalizar pedido
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* RESUMEN DEL PEDIDO */}
        {/* En móvil, el resumen puede ir abajo del todo o ser menos prominente, pero aquí mantenemos la estructura original con responsive */}
        <div className="bg-white text-black p-6 rounded shadow-md h-fit">
          <h3 className="text-xl font-bold mb-5" >
            RESUMEN DEL PEDIDO
          </h3>

          {carrito.length === 0 ? (
            <p className="text-sm text-gray-700">Tu cesta está vacía.</p>
          ) : (
            <>
              {carrito.map((item, index) => (
                <div key={index} className="flex items-start gap-4 mb-4"> {/* items-start para que la imagen y texto se alineen arriba */}
                  <img
                    src={item.imagen.startsWith('http') ? item.imagen : `/imagenes/productos/${item.imagen}`}
                    alt={item.nombre}
                    className="w-16 h-16 object-cover rounded border flex-shrink-0" // flex-shrink-0 para que la imagen no se encoja
                  />
                  <div className="flex-1 min-w-0"> {/* min-w-0 para permitir el encogimiento del texto */}
                    <p className="font-semibold text-sm truncate" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}> {/* truncate para evitar desbordamiento del nombre */}
                      {item.nombre}
                    </p>
                    <p className="text-xs text-gray-600" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                      Cantidad: {item.cantidad} × {item.precio.toFixed(2)} €
                    </p>
                  </div>
                  <p className="font-semibold text-sm flex-shrink-0" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}> {/* flex-shrink-0 para el precio final */}
                    {(item.precio * item.cantidad).toFixed(2)} €
                  </p>
                </div>
              ))}

              <hr className="my-4" />

              <p className="text-sm text-gray-700 mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                Total de artículos: {totalArticulos}
              </p>

              <div className="mb-4">
                <p className="text-base font-bold">{subtotal.toFixed(2)} €</p>
                <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Impuestos incluidos</p>
              </div>

              <div className="mt-4 text-xs text-gray-600 space-y-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                <p>💳 Pago: 100% seguro</p>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}