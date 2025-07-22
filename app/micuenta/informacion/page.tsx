'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

export default function InformacionUsuario() {
  const [usuarioOriginal, setUsuarioOriginal] = useState<any>(null);
  const [formData, setFormData] = useState({
    tratamiento: '',
    nombre: '',
    apellidos: '',
    email: '',
    contraseñaActual: '',
    password1: '',
    password2: '',
  });

  const router = useRouter();
  const [verActual, setVerActual] = useState(false);
  const [verNueva, setVerNueva] = useState(false);
  const [verRepetida, setVerRepetida] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/registrologin/login');
      return;
    }
    const base64 = token.split('.')[1];
    const json = decodeURIComponent(escape(atob(base64)));
    const payload = JSON.parse(json);

    console.log(payload);
    setUsuarioOriginal(payload);
    setFormData((prev) => ({
      ...prev,
      tratamiento: payload.tratamiento || '',
      nombre: payload.nombre || '',
      apellidos: payload.apellidos || '',
      email: payload.email || '',
    }));
  }, [router]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const campoModificado = (campo: string) =>
    formData[campo as keyof typeof formData] !== (usuarioOriginal?.[campo] ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if ((formData.password1 || formData.password2) && !formData.contraseñaActual) {
      alert('Para cambiar la contraseña, primero debes introducir tu contraseña actual.');
      return;
    }

    if (formData.password1 !== formData.password2) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const res = await fetch('/api/auth/actualizarinfousuario', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: usuarioOriginal.id,
          tratamiento: formData.tratamiento,
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          contraseñaActual: formData.contraseñaActual || undefined,
          nuevaPassword: formData.password1 || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Datos actualizados correctamente.');
        localStorage.setItem('token', data.token);
        router.push('/micuenta');
      } else {
        alert(data.message || 'Error al actualizar.');
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error inesperado.');
    }
  };

  return (
    <>
      {/* Navbar y cabecera */}
      <Navbar />

      {/* 40px de altura en negro arriba */}
      <div className="h-22 w-full bg-black" />
<div className="bg-white" >
      {/* Cabecera blanca */}
<div className="w-full py-3 bg-white">
  <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
    <h1 className="text-xl md:text-2xl font-bold text-black">Información de mi cuenta</h1>
    <div className="mt-1 text-black text-sm" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
      <Link href="/" className="hover:text-gray-700">
        Home
      </Link>
      <span className="mx-1">/</span>
      <Link href="/micuenta" className="hover:text-gray-700">
        Mi cuenta
      </Link>
      <span className="mx-1">/</span>
      <span>Información de mi cuenta</span>
    </div>
  </div>
</div>


      <main className="max-w-screen-md mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tratamiento */}
          <div>
            <label className="block mb-1 text-black">Tratamiento*</label>
            <div className="flex space-x-4 text-black">
              {['Sr.', 'Sra.'].map((op) => (
                <label key={op} className="flex items-center">
                  <input
                    type="radio"
                    name="tratamiento"
                    value={op}
                    checked={formData.tratamiento === op}
                    onChange={() => handleChange('tratamiento', op)}
                    className="mr-2 text-black"
                  />
                  {op}
                </label>
              ))}
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label className="block mb-1 text-black">Nombre*</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              placeholder={usuarioOriginal?.nombre}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              className={`text-black w-full border rounded px-3 py-2 bg-gray-100 ${campoModificado('nombre') ? 'border-orange-400' : 'border-gray-300'
                }`}
              required
            />
          </div>

          {/* Apellidos */}
          <div>
            <label className="block mb-1 text-black">Apellidos*</label>
            <input
              type="text"
              value={formData.apellidos}
              onChange={(e) => handleChange('apellidos', e.target.value)}
              placeholder={usuarioOriginal?.apellidos}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              className={`text-black w-full border rounded px-3 py-2 bg-gray-100 ${campoModificado('apellidos') ? 'border-orange-400' : 'border-gray-300'
                }`}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-black">Correo electrónico*</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder={usuarioOriginal?.email}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              className={`text-black w-full border rounded px-3 py-2 bg-gray-100 ${campoModificado('email') ? 'border-orange-400' : 'border-gray-300'
                }`}
              required
            />
          </div>

          {/* Info sobre cambio de contraseña */}
          <div className="text-sm mt-20 text-gray-600 italic">
            Si deseas cambiar tu contraseña, primero debes introducir la actual.
          </div>

          {/* Contraseña actual */}
          <div>
            <label className="block mb-1 text-black">Contraseña actual</label>
            <div className="relative">
              <input
                type={verActual ? 'text' : 'password'}
                value={formData.contraseñaActual}
                onChange={(e) => handleChange('contraseñaActual', e.target.value)}
                className="text-black w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 pr-10"
                placeholder="Introduce tu contraseña actual"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              />
              <button
                type="button"
                onClick={() => setVerActual(!verActual)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
              >
                {verActual ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Nueva contraseña */}
          <div>
            <label className="block mb-1 text-black">Nueva contraseña</label>
            <div className="relative">
              <input
                type={verNueva ? 'text' : 'password'}
                value={formData.password1}
                onChange={(e) => handleChange('password1', e.target.value)}
                className="text-black w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 pr-10"
                placeholder="Escribe nueva contraseña"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              />
              <button
                type="button"
                onClick={() => setVerNueva(!verNueva)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
              >
                {verNueva ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>


          {/* Confirmar nueva contraseña */}
          <div>
            <label className="block mb-1 text-black">Repite la nueva contraseña</label>
            <div className="relative">
              <input
                type={verRepetida ? 'text' : 'password'}
                value={formData.password2}
                onChange={(e) => handleChange('password2', e.target.value)}
                className="text-black w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 pr-10"
                placeholder="Repite la contraseña"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              />
              <button
                type="button"
                onClick={() => setVerRepetida(!verRepetida)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
              >
                {verRepetida ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>


          <button
            type="submit"
            className="bg-[#990000] hover:bg-[#b30000] text-white font-semibold py-2 px-4 rounded w-full"
          >
            Guardar cambios
          </button>
        </form>
      </main>

      <Footer />
      </div>
    </>
  );
}
