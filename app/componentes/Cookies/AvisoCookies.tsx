'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AvisoCookies() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const aceptadas = localStorage.getItem('acepto_cookies');
    if (!aceptadas) setVisible(true);
  }, []);

  const aceptarCookies = () => {
    localStorage.setItem('acepto_cookies', 'true');
    localStorage.setItem(
      'preferenciasCookies',
      JSON.stringify({ necesarias: true, analiticas: true, marketing: true })
    );
    setVisible(false);
  };

  const denegarCookies = () => {
    localStorage.setItem('acepto_cookies', 'true');
    localStorage.setItem(
      'preferenciasCookies',
      JSON.stringify({ necesarias: true, analiticas: false, marketing: false })
    );
    setVisible(false);
  };

  const gestionarCookies = () => {
    localStorage.setItem('acepto_cookies', 'true');
    setVisible(false);
    setTimeout(() => {
      router.push('/micuenta/ajustes-cookies');
    }, 100);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-sm p-6 z-50 flex flex-col items-center justify-center text-center space-y-4"
      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl w-full px-4">
        <p className="flex-1 text-left md:text-center mr-0 md:mr-4 mb-4 md:mb-0 text-xs">
          Utilizamos cookies propias y de terceros para entender mejor sus gustos, mejorar su experiencia de navegación y ofrecerle
          productos que se ajusten a sus preferencias. Puede aceptar, rechazar o configurar el uso de cookies en nuestra Política de Cookies.
        </p>
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={aceptarCookies}
            className="bg-green-600 px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Aceptar
          </button>
          <button
            onClick={denegarCookies}
            className="bg-red-600 px-5 py-2 rounded hover:bg-red-700 transition"
          >
            Denegar
          </button>
          <button
            onClick={gestionarCookies}
            className="bg-gray-300 text-black px-5 py-2 rounded hover:bg-gray-400 transition"
          >
            Gestionar Cookies
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-xs">
        <a href="/politica-de-cookies" className="text-white hover:underline">Política de Cookies</a>
        <a href="/politica-de-privacidad" className="text-white hover:underline">Política de Privacidad</a>
        <a href="/aviso-legal" className="text-white hover:underline">Aviso Legal</a>
      </div>
    </div>
  );
}
