'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function CrearProducto() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('true'); // default: hay stock
  const [subcategoria, setSubcategoria] = useState('1');
  const [imagen, setImagen] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState('');

  const subcategorias = [
    { id: 1, nombre: 'Ternera' },
    { id: 2, nombre: 'Cerdo' },
    { id: 3, nombre: 'Cordero' },
    { id: 4, nombre: 'Aves y Conejos' },
    { id: 5, nombre: 'Embutidos Caseros' },
    { id: 6, nombre: 'Elaborados' },
    { id: 7, nombre: 'Charcutería' },
  ];

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imagen) {
      setMensaje('Por favor, selecciona una imagen.');
      return;
    }

    try {
      const nombreImagen = imagen.name;
      const formData = new FormData();
      formData.append('file', imagen);

      // Simula subida a public/imagenes/productos (esto solo funcionará si haces el backend o lo subes manualmente)
      // Aquí solo construimos la URL
      const nuevaURL = `/imagenes/productos/${nombreImagen}`;

      const response = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio: parseFloat(precio),
          stock: stock === 'true',
          subcategoria_id: parseInt(subcategoria),
          imagen_url: nuevaURL,
        }),
      });

      if (response.ok) {
        setMensaje('Producto creado correctamente.');
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setStock('true');
        setSubcategoria('1');
        setImagen(null);
      } else {
        setMensaje('Error al crear el producto.');
      }
    } catch (error) {
      setMensaje('Error en el envío.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-gray-50 p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <label className="w-32 font-semibold">Nombre:</label>
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <label className="w-32 font-semibold">Descripción:</label>
        <textarea
          className="flex-1 border px-3 py-2 rounded"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <label className="w-32 font-semibold">Precio (€):</label>
        <input
          type="number"
          step="0.01"
          className="flex-1 border px-3 py-2 rounded"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <label className="w-32 font-semibold">Stock:</label>
        <select
          className="flex-1 border px-3 py-2 rounded"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        >
          <option value="true">Hay stock</option>
          <option value="false">No hay stock</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <label className="w-32 font-semibold">Subcategoría:</label>
        <select
          className="flex-1 border px-3 py-2 rounded"
          value={subcategoria}
          onChange={(e) => setSubcategoria(e.target.value)}
        >
          {subcategorias.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <label className="w-32 font-semibold">Imagen:</label>
        <input
          type="file"
          accept="image/*"
          className="flex-1"
          onChange={handleImagenChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Crear producto
      </button>

      

      {mensaje && <p className="text-center text-sm text-red-600">{mensaje}</p>}
    </form>
  );
}
