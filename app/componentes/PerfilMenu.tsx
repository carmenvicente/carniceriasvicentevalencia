'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Usuario = {
  nombre: string;
  role: string;
};

export const PerfilMenu = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [open, setOpen] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // Leer el token del localStorage
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsuario({
          nombre: payload.nombre,
          role: payload.role,
        });
      }
    } catch (error) {
      console.error('Error al leer token', error);
      setUsuario(null);
    }
  }, []);

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const logout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; max-age=0';
    setUsuario(null);
    setOpen(false);
    router.push('/');
  };

  // Si no hay sesión, muestra solo el icono
  if (!usuario) {
    return (
      <Link href="/registrologin/login" className="navbar-link">
        <Image
          src="/imagenes/iconos/usuario.png"
          alt="Usuario"
          width={16}
          height={16}
          className="navbar-icon h-6 w-6"
        />
      </Link>
    );
  }

  // Si hay sesión, muestra menú controlado por clic
  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => { setOpen(o => !o); setConfirmando(false); }} className="navbar-link">
        <Image
          src="/imagenes/iconos/usuario.png"
          alt="Usuario"
          width={16}
          height={16}
          className="navbar-icon h-6 w-6"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md z-50 border">
          <Link href="/micuenta" className="block px-4 py-2 text-sm hover:bg-gray-100 transition">
            Mi cuenta
          </Link>
          {!confirmando ? (
            <button
              onClick={() => setConfirmando(true)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
            >
              Desconectarse
            </button>
          ) : (
            <div className="px-4 py-3">
              <p className="text-sm text-gray-600 mb-2">¿Seguro que quieres salir?</p>
              <div className="flex gap-2">
                <button
                  onClick={logout}
                  className="flex-1 bg-[#990000] text-white rounded py-1.5 text-xs font-semibold hover:bg-[#b30000] transition"
                >
                  Sí, salir
                </button>
                <button
                  onClick={() => setConfirmando(false)}
                  className="flex-1 bg-gray-100 text-gray-700 rounded py-1.5 text-xs font-semibold hover:bg-gray-200 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
