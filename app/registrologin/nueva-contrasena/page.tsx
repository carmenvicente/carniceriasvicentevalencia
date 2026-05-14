'use client'

import { useState, FormEvent, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/app/componentes/navbar'
import Footer from '@/app/componentes/footer'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function NuevaContrasenaForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!token) {
      setErrorMsg('Enlace de recuperación inválido.')
      return
    }

    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/nueva-contrasena', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => router.push('/registrologin/login'), 3000)
      } else {
        setErrorMsg(data.message || 'Ha ocurrido un error. Inténtalo de nuevo.')
      }
    } catch {
      setErrorMsg('Error de red. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="mx-auto w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg p-6 mb-71 text-center">
        <p className="text-red-600 font-semibold mb-4">Enlace de recuperación inválido o expirado.</p>
        <Link href="/registrologin/recuperar-contrasena" className="text-[#990000] hover:underline text-sm">
          Solicitar un nuevo enlace
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg p-6 mb-71">
      {success ? (
        <div className="text-center space-y-4">
          <div className="p-4 bg-green-50 text-green-700 rounded" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            ¡Contraseña actualizada correctamente!
          </div>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
            Redirigiendo al inicio de sesión...
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
            Introduce tu nueva contraseña. Debe tener al menos 6 caracteres.
          </p>

          {errorMsg && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-gray-800 mb-1">
                Nueva contraseña*
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded text-black px-3 py-2 pr-10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#990000]"
                  required
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-800 mb-1">
                Confirmar contraseña*
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded text-black px-3 py-2 pr-10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#990000]"
                  required
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(prev => !prev)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                >
                  {showConfirm ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#990000] text-white py-2 rounded hover:bg-[#aa0000] transition disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar nueva contraseña'}
            </button>
          </form>
        </>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        <Link href="/registrologin/login" className="text-[#990000] hover:underline">
          Volver al inicio de sesión
        </Link>
      </p>
    </div>
  )
}

export default function NuevaContrasena() {
  return (
    <>
      <Navbar />
      <div className="h-22 w-full bg-black" />
      <div className="bg-white">
        <div className="w-full py-3 bg-white">
          <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
            <h1 className="text-xl md:text-2xl font-bold text-black">
              NUEVA CONTRASEÑA
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
                Nueva Contraseña
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white px-4 mt-10">
          <Suspense fallback={<div className="text-center text-gray-500 py-10">Cargando...</div>}>
            <NuevaContrasenaForm />
          </Suspense>
        </div>

        <div className="mt-30">
          <Footer />
        </div>
      </div>
    </>
  )
}
