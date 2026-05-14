'use client';

import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavoritos } from '@/app/contextos/FavoritosContexto';

export default function BotonFavorito({ productoId }: { productoId: number }) {
  const { favoritoIds, toggleFavorito } = useFavoritos();
  const [avisoVisible, setAvisoVisible] = useState(false);

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

    await toggleFavorito(productoId);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 transition"
        aria-label={esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        {esFavorito
          ? <FaHeart size={16} className="text-[#990000]" />
          : <FaRegHeart size={16} className="text-white" />
        }
      </button>
      {avisoVisible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-white text-gray-800 text-sm rounded-lg shadow-lg px-4 py-2 border border-gray-200 whitespace-nowrap">
          Regístrate para guardar favoritos
        </div>
      )}
    </>
  );
}
