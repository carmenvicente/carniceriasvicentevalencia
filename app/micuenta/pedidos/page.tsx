'use client';

import { useEffect, useState } from 'react';

interface Pedido {
  id: number;
  fecha: string;
  total: number;
  estado: string;
}

export default function PedidosUsuarioPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const usuarioId = payload.id;

    // Aquí suponemos que existe un endpoint de API para obtener pedidos por ID de usuario
    fetch(`/api/pedidos?usuarioId=${usuarioId}`)
      .then(res => res.json())
      .then(data => {
        setPedidos(data);
        setCargando(false);
      })
      .catch(() => {
        console.error('Error al cargar pedidos');
        setCargando(false);
      });
  }, []);

  if (cargando) return <p className="p-4 text-gray-700">Cargando pedidos...</p>;

  if (pedidos.length === 0) {
    return <p className="p-4 text-gray-700">No tienes pedidos registrados.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-8">
      <h1 className="text-2xl font-bold mb-4">Mis pedidos</h1>

      <ul className="space-y-4">
        {pedidos.map(pedido => (
          <li key={pedido.id} className="border border-gray-200 rounded p-4">
            <p><strong>Pedido #{pedido.id}</strong></p>
            <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleDateString()}</p>
            <p><strong>Total:</strong> {pedido.total.toFixed(2)} €</p>
            <p><strong>Estado:</strong> {pedido.estado}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
