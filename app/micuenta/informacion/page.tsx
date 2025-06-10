'use client';

import { useEffect, useState } from 'react';

interface Usuario {
  nombre: string;
  apellidos: string;
  email: string;
  tratamiento?: string;
}

export default function InformacionUsuarioPage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsuario({
          nombre: payload.nombre,
          apellidos: payload.apellidos,
          email: payload.email,
          tratamiento: payload.tratamiento,
        });
      } catch (err) {
        console.error('Error al leer el token', err);
      }
    }
  }, []);

  if (!usuario) {
    return <p className="p-4 text-gray-700">Cargando datos del usuario...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-8">
      <h1 className="text-2xl font-bold mb-4">Información personal</h1>

      <div className="space-y-2 text-gray-800">
        <p><strong>Nombre:</strong> {usuario.tratamiento} {usuario.nombre} {usuario.apellidos}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
      </div>
    </div>
  );
}
