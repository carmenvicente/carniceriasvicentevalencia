'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Correo y contraseña son obligatorios.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 200) {
        const { token, user } = await res.json();

        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(user));

        setTimeout(() => {
          router.push('/micuenta');
        }, 100);
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Credenciales inválidas.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de red. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-22 w-full bg-black" />
      <div className=" bg-white"> 
      <div className="w-full py-3 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-black" >
            INICIO DE SESIÓN
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
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              Inicio de Sesión
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white px-4 mt-10">
        <div className="mx-auto w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg p-6 mb-71">
          {errorMsg && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-800 mb-1" >
                Correo electrónico*
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded text-black px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#990000]"
                required
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-800 mb-1" >
                Contraseña*
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border text-black border-gray-300 rounded px-3 py-2 pr-10 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#990000]"
                  required
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#990000] text-white py-2 rounded hover:bg-[#aa0000] transition disabled:opacity-50"
              
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            <Link href="/registrologin/recuperar-contrasena" className="text-[#990000] hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </p>

          <p className="mt-2 text-center text-sm text-gray-600" >
            ¿Aún no tienes cuenta?{' '}
            <Link href="/registrologin/register" className="text-[#990000] hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-30">
        <Footer />
      </div>
      </div>
    </>
  );
}
