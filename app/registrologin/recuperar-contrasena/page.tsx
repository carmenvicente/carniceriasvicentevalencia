'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'

export default function RecuperarContrasena() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!email.trim()) {
      setErrorMsg('Introduce tu correo electrónico.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/recuperar-contrasena', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setSuccessMsg(data.message)
      } else {
        setErrorMsg(data.message || 'Ha ocurrido un error. Inténtalo de nuevo.')
      }
    } catch {
      setErrorMsg('Error de red. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="h-22 w-full bg-black" />
      <div className="bg-white">
        <div className="w-full py-3 bg-white">
          <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
            <h1 className="text-xl md:text-2xl font-bold text-black">
              RECUPERAR CONTRASEÑA
            </h1>
            <div className="mt-1 text-black text-sm">
              <Link
                href="/"
                className="hover:text-gray-700"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Home
              </Link>
              <span className="mx-1">/</span>
              <Link
                href="/registrologin/login"
                className="hover:text-gray-700"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Inicio de Sesión
              </Link>
              <span className="mx-1">/</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                Recuperar Contraseña
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white px-4 mt-10">
          <div className="mx-auto w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg p-6 mb-71">
            {!successMsg ? (
              <>
                <p className="text-gray-600 text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                  Introduce el correo electrónico asociado a tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
                </p>

                {errorMsg && (
                  <div className="mb-4 p-2 bg-red-100 text-red-700 rounded" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-gray-800 mb-1">
                      Correo electrónico*
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded text-black px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#990000]"
                      required
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#990000] text-white py-2 rounded hover:bg-[#aa0000] transition disabled:opacity-50"
                  >
                    {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-50 text-green-700 rounded" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  {successMsg}
                </div>
                <p className="text-gray-500 text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                  Revisa también tu carpeta de spam si no lo encuentras en el buzón principal.
                </p>
              </div>
            )}

            <p className="mt-6 text-center text-sm text-gray-600">
              <Link href="/registrologin/login" className="text-[#990000] hover:underline">
                Volver al inicio de sesión
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-30">
          <Footer />
        </div>
      </div>
    </>
  )
}
