'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';

export default function RegisterPage() {
  const router = useRouter();

  // Estados de cada campo del formulario
  const [tratamiento, setTratamiento] = useState<'Sr.' | 'Sra.'>('Sr.');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Enviar formulario de registro
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validación mínima
    if (!nombre.trim() || !apellidos.trim() || !email.trim() || !password) {
      setErrorMsg('Todos los campos marcados con * son obligatorios.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tratamiento,
          nombre,
          apellidos,
          email,
          password,
        }),
      });

      if (res.status === 201) {
        // Registro exitoso: redirige al login
        router.push('/registrologin/login');
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Error al registrar. Inténtalo de nuevo.');
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

      {/* 40px de altura en negro arriba */}
      <div className="h-22 w-full bg-black" />

      {/* Cabecera */}
      <div className="w-full py-3 bg-white">
        <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
          <h1 className="text-xl md:text-2xl font-bold text-black">CREAR CUENTA</h1>
          <div className="mt-1 text-black text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span className="mx-1">/</span>
            <span>Registro</span>
          </div>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white px-4 mt-10">
        {/* Contenedor más ancho: ocupa hasta 2/3 en md, 1/2 en lg */}
        <div className="mx-auto w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg p-6">
          {/* Mensaje de error, si lo hay */}
          {errorMsg && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {errorMsg}
            </div>
          )}

          {/* Formulario de registro */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tratamiento */}
            <div>
              <label className="block text-gray-800 mb-1">Tratamiento*</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tratamiento"
                    value="Sr."
                    checked={tratamiento === 'Sr.'}
                    onChange={() => setTratamiento('Sr.')}
                    className="mr-2"
                  />
                  Sr.
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tratamiento"
                    value="Sra."
                    checked={tratamiento === 'Sra.'}
                    onChange={() => setTratamiento('Sra.')}
                    className="mr-2"
                  />
                  Sra.
                </label>
              </div>
            </div>

            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-gray-800 mb-1">
                Nombre*
              </label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#990000]"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                required
              />
            </div>

            {/* Apellidos */}
            <div>
              <label htmlFor="apellidos" className="block text-gray-800 mb-1">
                Apellidos*
              </label>
              <input
                id="apellidos"
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#990000]"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-800 mb-1">
                Correo electrónico*
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#990000]"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                required
              />
            </div>

            {/* Contraseña con toggle de visibilidad */}
            <div className="relative">
              <label htmlFor="password" className="block text-gray-800 mb-1">
                Contraseña*
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#990000]"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.176-6.125M17.387 17.387A9.96 9.96 0 0122 12c0 5.523-4.477 10-10 10-.72 0-1.421-.07-2.1-.21m7.487-5.403a4 4 0 10-5.657-5.657m1.768 7.07A4 4 0 0112 16a4 4 0 01-3.182-6.5M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.952-.72 1.847-1.314 2.648M15.536 15.536A9.97 9.97 0 0112 17c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 012.707-3.776" />
                  </svg>
                )}
              </button>
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#990000] text-white py-2 rounded hover:bg-[#aa0000] transition disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Crear cuenta'}
            </button>
          </form>

          {/* Enlace a login */}
          <p className="mt-4 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link href="/registrologin/login" className="text-[#990000] hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>

      {/* Footer más cerca del contenedor */}
      <div className="mt-30">
        <Footer />
      </div>
    </>
  );
}
