'use client';

import { useEffect, useState } from 'react';

export default function AjustesCookiesPage() {
  const [acepto, setAcepto] = useState(false);

  useEffect(() => {
    const estado = localStorage.getItem('acepto_cookies');
    setAcepto(estado === 'true');
  }, []);

  const guardarPreferencias = (valor: boolean) => {
    localStorage.setItem('acepto_cookies', valor ? 'true' : 'false');
    setAcepto(valor);
    alert('Tus preferencias se han guardado.');
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="max-w-xl w-full bg-white p-6 rounded shadow"
         style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
      <h1 className="text-2xl font-bold mb-4">Ajustes de cookies</h1>
      <p className="mb-4">
        Puedes cambiar tus preferencias de cookies cuando quieras.
      </p>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => guardarPreferencias(true)}
          className={`px-4 py-2 rounded ${acepto ? 'bg-[#990000] text-white' : 'bg-gray-200 text-black'}`}
        >
          Aceptar cookies
        </button>
        <button
          onClick={() => guardarPreferencias(false)}
          className={`px-4 py-2 rounded ${!acepto ? 'bg-[#990000] text-white' : 'bg-gray-200 text-black'}`}
        >
          Rechazar cookies
        </button>
      </div>
    </div>
  </div>
);
}
