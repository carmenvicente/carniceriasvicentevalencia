'use client';

import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavoritos } from '@/app/contextos/FavoritosContexto';

export default function BotonFavorito({
  productoId,
  sinFondo = false,
}: {
  productoId: number;
  sinFondo?: boolean;
}) {
  const { favoritoIds, toggleFavorito } = useFavoritos();
  const [avisoVisible, setAvisoVisible] = useState(false);
  const [beating, setBeating] = useState(false);

  const esFavorito = favoritoIds.has(productoId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('token');
    if (!token) {
      setAvisoVisible(true);
      setTimeout(() => setAvisoVisible(false), 3000);
      return;
    }

    setBeating(true);
    setTimeout(() => setBeating(false), 400);
    await toggleFavorito(productoId);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={
          sinFondo
            ? 'p-1.5 transition'
            : 'p-1.5 rounded-full bg-black/60 hover:bg-black/80 transition'
        }
        aria-label={esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        <span className={beating ? 'heartbeat inline-flex' : 'inline-flex'}>
          {esFavorito
            ? <FaHeart size={16} className="text-[#990000]" />
            : <FaRegHeart size={16} className={sinFondo ? 'text-[#990000]' : 'text-white'} />
          }
        </span>
      </button>
      {avisoVisible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-[#222] text-white text-sm font-semibold rounded-lg shadow-lg px-4 py-2 whitespace-nowrap">
          Regístrate para guardar favoritos
        </div>
      )}
    </>
  );
}
