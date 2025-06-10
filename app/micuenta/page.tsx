'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Usuario = {
  nombre: string;
  role: string;
};

export default function MiCuenta() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsuario({
          nombre: payload.nombre,
          role: payload.role,
        });
      } else {
        router.push('/registrologin/login');
      }
    } catch (error) {
      console.error('Error al leer token', error);
      router.push('/registrologin/login');
    }
  }, [router]);

  if (!usuario) return null;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Hola, {usuario.nombre}</h1>

      <section className="space-y-4">
        <Link href="/mi-cuenta/informacion" className="block hover:underline text-gray-700">
          Información del usuario
        </Link>

        {usuario.role === 'admin' ? (
          <Link href="/admin/editar-productos" className="block hover:underline text-red-700 font-semibold">
            Editar productos
          </Link>
        ) : (
          <Link href="/mi-cuenta/pedidos" className="block hover:underline text-gray-700">
            Historial y detalles de mis pedidos
          </Link>
        )}

        <Link href="/mi-cuenta/cookies" className="block hover:underline text-gray-700">
          Ajustes de cookies
        </Link>

        <button
          onClick={() => {
            const confirmado = window.confirm('¿Seguro que deseas cerrar sesión?');
            if (confirmado) {
              localStorage.removeItem('token');
              setUsuario(null);
              router.push('/');
            }
          }}
          className="block text-left text-gray-700 hover:underline"
        >
          Desconectar
        </button>
      </section>
    </main>
  );
}
