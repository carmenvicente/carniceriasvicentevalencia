'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


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
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
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
