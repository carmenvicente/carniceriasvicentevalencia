'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function GestionCookies() {
  const [preferencias, setPreferencias] = useState({
    necesarias: true,
    analiticas: false,
    marketing: false,
  });

  const [abierto, setAbierto] = useState({
    necesarias: false,
    analiticas: false,
    marketing: false,
  });

  const [guardado, setGuardado] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const guardadas = localStorage.getItem('preferenciasCookies');
    if (guardadas) {
      setPreferencias(JSON.parse(guardadas));
    }
  }, []);

  const handleToggle = (tipo: 'analiticas' | 'marketing') => {
    setPreferencias((prev) => ({
      ...prev,
      [tipo]: !prev[tipo],
    }));
    setGuardado(false);
  };

  const guardarCambios = () => {
    localStorage.setItem('preferenciasCookies', JSON.stringify(preferencias));
    localStorage.setItem('acepto_cookies', 'true'); // Para que desaparezca el aviso si llegó desde allí
    setGuardado(true);

    const token = localStorage.getItem('token');
    setTimeout(() => {
      router.push(token ? '/micuenta' : '/');
    }, 1000);
  };

  const toggleDescripcion = (tipo: keyof typeof abierto) => {
    setAbierto((prev) => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  return (
    <div className="w-full bg-white flex justify-center px-4 py-8 mb-20">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl p-8 text-black space-y-4">

        {/* 🍪 Cookies necesarias */}
        <div className="border-b pb-3">
          <button onClick={() => toggleDescripcion('necesarias')} className="flex items-center justify-between w-full font-bold text-left">
            <div className="flex items-center gap-2">
              {abierto.necesarias ? <FaChevronUp /> : <FaChevronDown />}
              <span>Cookies necesarias</span>
            </div>
            <span className="text-sm text-green-700 font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Obligatorias</span>
          </button>
          {abierto.necesarias && (
            <p className="mt-2 text-sm text-gray-700" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              Estas cookies son esenciales para que el sitio web funcione correctamente. No se pueden desactivar.
            </p>
          )}
        </div>

        {/* 📊 Cookies analíticas */}
        <div className="border-b pb-3">
          <button onClick={() => toggleDescripcion('analiticas')} className="flex items-center justify-between w-full font-bold text-left">
            <div className="flex items-center gap-2">
              {abierto.analiticas ? <FaChevronUp /> : <FaChevronDown />}
              <span>Cookies estadísticas</span>
            </div>
            <div className="flex items-center gap-3">
              
              <input
                type="checkbox"
                checked={preferencias.analiticas}
                onChange={() => handleToggle('analiticas')}
                className="w-5 h-5"
              />
              
            </div>
          </button>
          {abierto.analiticas && (
            <p className="mt-2 text-sm text-gray-700" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              Las cookies estadísticas ayudan a los propietarios de páginas web a comprender cómo interactúan los visitantes, reuniendo información de forma anónima.
            </p>
          )}
        </div>

        {/* 🎯 Cookies de marketing */}
        <div className="border-b pb-3">
          <button onClick={() => toggleDescripcion('marketing')} className="flex items-center justify-between w-full font-bold text-left">
            <div className="flex items-center gap-2">
              {abierto.marketing ? <FaChevronUp /> : <FaChevronDown />}
              <span>Cookies de marketing</span>
            </div>
            <div className="flex items-center gap-3">
              
              <input
                type="checkbox"
                checked={preferencias.marketing}
                onChange={() => handleToggle('marketing')}
                className="w-5 h-5"
              />
              
            </div>
          </button>
          {abierto.marketing && (
            <p className="mt-2 text-sm text-gray-700" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              Estas cookies se utilizan para personalizar anuncios y rastrear la actividad del usuario con fines comerciales.
            </p>
          )}
        </div>

        {/* Botón guardar */}
        <button
          onClick={guardarCambios}
          className="mt-6 bg-[#990000] text-white px-5 py-2 rounded hover:bg-[#aa0000] transition"
        >
          Guardar cambios
        </button>

        {guardado && (
          <p className="mt-4 text-green-600 text-sm">
            Preferencias guardadas correctamente. Redirigiendo...
          </p>
        )}

        {/* Enlaces legales */}
        <div className="mt-8 text-sm text-gray-600 flex justify-center gap-x-6">
          <a href="/politica-de-cookies" className="hover:underline" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>Política de Cookies</a>
          <a href="/politica-de-privacidad" className="hover:underline" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>Política de Privacidad</a>
          <a href="/aviso-legal" className="hover:underline" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>Aviso Legal</a>
        </div>
      </div>
    </div>
  );
}
