'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function AuthPage() {
  const [mode, setMode] = useState<'login'|'register'>('login')
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow">
      {/* Switch */}
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 ${mode==='login' ? 'border-b-2 border-[#990000] font-semibold' : 'text-gray-500'}`}
          onClick={()=>setMode('login')}
        >
          Entrar
        </button>
        <button
          className={`flex-1 py-2 ${mode==='register' ? 'border-b-2 border-[#990000] font-semibold' : 'text-gray-500'}`}
          onClick={()=>setMode('register')}
        >
          Registrarse
        </button>
      </div>

      {mode==='login'
        ? <LoginForm/>
        : <RegisterForm/>
      }
    </div>
  )
}

function LoginForm() {
  const [email, setEmail]   = useState('')
  const [password, setPass] = useState('')
  const [error, setError]   = useState<string|null>(null)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials',{
      redirect: false,
      email, password
    })
    if (res?.error) {
      setError(res.error)
    } else {
      router.push('/')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e=>setPass(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button type="submit" className="w-full bg-[#990000] text-white py-2 rounded hover:bg-red-700 transition">
        Entrar
      </button>
    </form>
  )
}

function RegisterForm() {
  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [nombre, setNombre]   = useState('')
  const [error, setError]     = useState<string|null>(null)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth/register',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email, password, nombre })
    })
    if (res.ok) {
      // Al registrarse, podrías hacer un auto-login o redirigir al login:
      setError(null)
      setEmail(''); setPass(''); setNombre('')
      router.push('/auth?mode=login')
    } else {
      const { message } = await res.json()
      setError(message)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">Registro</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={e=>setNombre(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e=>setPass(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button type="submit" className="w-full bg-[#990000] text-white py-2 rounded hover:bg-red-700 transition">
        Crear cuenta
      </button>
    </form>
  )
}
