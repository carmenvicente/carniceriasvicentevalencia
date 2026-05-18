'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type FavoritosContextType = {
  favoritoIds: Set<number>;
  toggleFavorito: (productoId: number) => Promise<void>;
};

const FavoritosContext = createContext<FavoritosContextType>({
  favoritoIds: new Set(),
  toggleFavorito: async () => {},
});

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritoIds, setFavoritoIds] = useState<Set<number>>(new Set());
  const tokenRef = useRef<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Solo re-carga si el token cambió (login/logout)
    if (token === tokenRef.current) return;
    tokenRef.current = token;

    if (!token) {
      setFavoritoIds(new Set());
      return;
    }

    fetch('/api/favoritos', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.ok ? res.json() : [])
      .then((data: { producto_id: number }[]) =>
        setFavoritoIds(new Set(data.map(f => f.producto_id)))
      )
      .catch(() => {});
  }, [pathname]);

  const toggleFavorito = async (productoId: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const esFavorito = favoritoIds.has(productoId);

    setFavoritoIds(prev => {
      const next = new Set(prev);
      esFavorito ? next.delete(productoId) : next.add(productoId);
      return next;
    });

    try {
      await fetch('/api/favoritos', {
        method: esFavorito ? 'DELETE' : 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productoId }),
      });
    } catch {
      setFavoritoIds(prev => {
        const next = new Set(prev);
        esFavorito ? next.add(productoId) : next.delete(productoId);
        return next;
      });
    }
  };

  return (
    <FavoritosContext.Provider value={{ favoritoIds, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export const useFavoritos = () => useContext(FavoritosContext);
