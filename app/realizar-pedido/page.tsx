'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'
import { Eye, EyeOff } from 'lucide-react'
import { useCarrito } from '@/app/contextos/CarritoContexto'

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

  const { carrito } = useCarrito()
  const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  useEffect(() => {
    const userStr = localStorage.getItem('usuario')
    if (userStr) {
      const user = JSON.parse(userStr)
      setUsuario(user)
      setDatosCompletados(true)
      setSeccionPagoAbierta(true)
      setModoInvitado(false)
      setMostrarLogin(false)
    }

    const datosGuardados = localStorage.getItem('datosInvitado')
    if (datosGuardados && !userStr) {
      setDatosInvitado(JSON.parse(datosGuardados))
    }
  }, [])

  const guardarDatosInvitado = () => {
    if (datosInvitado.tratamiento && datosInvitado.nombre && datosInvitado.apellidos && datosInvitado.correo) {
      localStorage.setItem('datosInvitado', JSON.stringify(datosInvitado))
      setDatosCompletados(true)
      setSeccionPagoAbierta(true)
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
      const res = await fetch(
        metodoPago === 'tienda' ? '/api/pedido/manual' : '/api/pedido',
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }
      )
      if (!res.ok) throw new Error('Fallo al procesar el pedido')
      const data = await res.json()
      if (data?.url) window.location.href = data.url
      else window.location.href = '/pedido-confirmado'
    } catch (err) {
      console.error('Error al procesar el pedido:', err)
      alert('Hubo un error al procesar el pedido.')
    }
  }

  return (
    <>
      <Navbar />

      {/* Cabecera */}
      <div className="w-full py-3 bg-[rgb(22,22,22)]">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-30">
          <h1 className="text-xl md:text-2xl font-bold text-white">Realizar Pedido</h1>
          <div className="mt-1 text-white text-sm">
            <Link href="/" className="hover:text-gray-300 font-semibold">Home</Link>
            <span className="mx-1">/</span>
            <span className="font-semibold">Realizar Pedido</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
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
                  <div className="space-y-2">
                    <p className="text-sm font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      Conectado como <span className="font-bold">{usuario.nombre} {usuario.apellidos}</span>.
                    </p>
                    <button onClick={cerrarSesion} className="text-sm text-red-600 hover:underline font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      ¿No eres tú? Cierra sesión
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center gap-4 mb-10">
                      <button
  className={`px-4 py-2 rounded text-sm font-semibold transition-colors 
    ${modoInvitado ? 'bg-[#990000] text-white hover:bg-red-700' : 'bg-gray-100 text-[#990000] hover:bg-gray-200'}`}
  onClick={() => { setModoInvitado(true); setMostrarLogin(false) }}
>
  Pedir como invitado
</button>

<button
  className={`px-4 py-2 rounded text-sm font-semibold transition-colors 
    ${mostrarLogin ? 'bg-[#990000] text-white hover:bg-red-700' : 'bg-gray-100 text-[#990000] hover:bg-gray-200'}`}
  onClick={() => { setMostrarLogin(true); setModoInvitado(false) }}
>
  Iniciar sesión
</button>

                    </div>

                    {/* Formulario Invitado */}
                    {modoInvitado && (
                      <form className="space-y-4 text-sm">
                        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                          <label className="text-sm font-medium">Tratamiento:</label>
                          <div className="flex gap-4">
                            {['Sr.', 'Sra.'].map((valor) => (
                              <label key={valor} className="flex items-center gap-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                                <input type="radio" name="tratamiento" value={valor} required checked={datosInvitado.tratamiento === valor} onChange={() => setDatosInvitado({ ...datosInvitado, tratamiento: valor })} />
                                {valor}
                                
                              </label>
                            ))}
                          </div>

                          <label htmlFor="nombre" className="text-sm font-medium">Nombre:</label>
                          <input id="nombre" type="text" required value={datosInvitado.nombre} onChange={(e) => setDatosInvitado({ ...datosInvitado, nombre: e.target.value })} className="w-full p-2 rounded bg-gray-100 text-black" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }} />

                          <label htmlFor="apellidos" className="text-sm font-medium">Apellidos:</label>
                          <input id="apellidos" type="text" required value={datosInvitado.apellidos} onChange={(e) => setDatosInvitado({ ...datosInvitado, apellidos: e.target.value })} className="w-full p-2 rounded bg-gray-100 text-black"  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}/>

                          <label htmlFor="correo" className="text-sm font-medium">Correo:</label>
                          <input id="correo" type="email" required value={datosInvitado.correo} onChange={(e) => setDatosInvitado({ ...datosInvitado, correo: e.target.value })} className="w-full p-2 rounded bg-gray-100 text-black" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }} />
                        </div>

                        <button type="button" onClick={guardarDatosInvitado} className="w-full bg-[#990000] hover:bg-red-700 text-white py-2 rounded font-bold mt-2">
                          Continuar
                        </button>
                      </form>
                    )}

                    {/* Formulario Login */}
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
                        <div className="grid grid-cols-[180px_1fr] items-center gap-2">
                          <label htmlFor="email" className="text-sm font-medium">Correo electrónico:</label>
                          <input name="email" type="email" id="email" required className="w-full p-2 rounded bg-gray-100 text-black" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }} />

                          <label htmlFor="password" className="text-sm font-medium">Contraseña:</label>
                          <div className="relative w-full" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                            <input name="password" type={mostrarPassword ? 'text' : 'password'} id="password" required className="w-full p-2 pr-10 rounded bg-gray-100 text-black" />
                            <button type="button" onClick={() => setMostrarPassword(!mostrarPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600">
                              {mostrarPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                          </div>
                        </div>

                        <button type="submit" className="w-full bg-[#990000] hover:bg-red-700 text-white py-2 rounded font-bold">
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
            <button className="w-full text-left px-6 py-4 font-semibold transition bg-white hover:bg-gray-300 cursor-default">
              2. DIRECCIÓN
            </button>
            <div className="px-6 pb-6 pt-2 text-sm text-gray-800" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              <p className="mb-5 font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                Los pedidos se recogen exclusivamente en nuestra tienda física.
              </p>
              <p className="mt-2 text-gray-700">
                Dirección: <span className="font-semibold" >Av. de Castilla-la Mancha, N° 27, Bajo, 16003 Cuenca</span>
              </p>
              <p className="text-gray-600 font-semibold">Recuerda venir en horario comercial para recoger tu pedido.</p>
            </div>
          </div>

          {/* PAGO */}
          <div className="bg-white text-black rounded shadow-md overflow-hidden">
            <button
              onClick={() => { if (datosCompletados) setSeccionPagoAbierta(!seccionPagoAbierta) }}
              disabled={!datosCompletados}
              className={`w-full text-left px-6 py-4 font-semibold transition ${datosCompletados ? 'bg-white hover:bg-gray-300' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              3. PAGO
            </button>
            {seccionPagoAbierta && (
              <div className="px-6 pb-6 pt-2">
                <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-800">
                  <p className="text-sm text-gray-700">Selecciona tu método de pago:</p>
                  {['tarjeta', 'apple', 'google', 'tienda'].map((m) => (
                    <label key={m} className="flex items-center gap-2">
                      <input type="radio" name="metodoPago" value={m} onChange={(e) => setMetodoPago(e.target.value)} required />
                      {m === 'tarjeta' ? 'Tarjeta 💳' : m === 'apple' ? 'Apple Pay 🍎' : m === 'google' ? 'Google Pay 🔵' : 'Pagar al recoger 🏬'}
                    </label>
                  ))}
                  <label className="flex items-center gap-2 text-xs text-gray-600">
                    <input type="checkbox" required /> Estoy de acuerdo con los términos del servicio y los acepto sin reservas.
                  </label>
                  <button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded font-bold">
                    Finalizar pedido
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* RESUMEN */}
        <div className="bg-white text-black p-6 rounded shadow-md h-fit">
          <h3 className="text-xl font-bold mb-5">RESUMEN DEL PEDIDO</h3>
          <p className="text-sm text-gray-700 mb-2">{totalArticulos} artículo{totalArticulos !== 1 ? 's' : ''}</p>
          <div className="mb-4">
            <p className="text-base font-bold">Total: {subtotal.toFixed(2)} €</p>
            <p className="text-xs text-gray-400 mt-1">Impuestos incluidos</p>
          </div>
          <div className="mt-4 text-xs text-gray-600 space-y-1">
            <p>💳 Pago: 100% seguro</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
