"use client";
import { useEffect, useState } from 'react';
import Navbar from '@/app/componentes/navbar';
import Link from 'next/link';

export default function Charcuteria() {
  const [productos, setProductos] = useState([]);
  const categoriaId = 3;
  const subcategoriaId = 7;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('/api/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            categoria_id: categoriaId,
            subcategoria_id: subcategoriaId,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }

        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
      

        {/* Línea divisoria vertical */}
        <div className="divider"></div>

        <main className="product-container">
          <h1>Ternera</h1>
          {productos.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            <div className="product-grid">
              {productos.map((producto: any) => (
                <Link key={producto.id} href={`/producto/${producto.id}`} passHref>
                  <div className="product-card">
                    <img src={producto.imagen} alt={producto.nombre} className="product-image" />
                    <h2>{producto.nombre}</h2>
                    <p>{producto.descripcion}</p>
                    <p><strong>Precio:</strong> {producto.precio} €</p>
                    <button>Añadir a la cesta</button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .page-container {
          display: flex;
          background-color:rgb(0, 0, 0);
          color: white;
          min-height: 100vh;
          flex-direction: row;
          align-items: center; /* Centra el contenido verticalmente */
          justify-content: center; /* Asegura que los elementos se distribuyan de forma centrada horizontalmente */
        }

        .sidebar {
          width: 250px;
          padding: 20px;
          border-right: 2px solid white;
          height: 100%;
        }

        .sidebar h2 {
          font-size: 20px;
          margin-bottom: 15px;
        }

        .sidebar ul {
          list-style: none;
          padding: 0;
        }

        .sidebar li {
          margin: 10px 0;
        }

        /* Línea divisoria vertical */
        .divider {
          width: 1px;
          background-color: white;
          height: 100%;
          margin-left: 10px;
        }

        .product-container {
          flex: 1;
          padding: 40px 20px;
          background-color: white;
          margin-left: 20px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .product-card {
          background: white;
          color: black;
          border-radius: 5px;
          padding: 10px;
          text-align: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-image {
          width: 100%;
          height: auto;
          border-bottom: 1px solid #ccc;
          margin-bottom: 10px;
        }

        button {
          background-color:rgb(255, 255, 255);
          color: white;
          border: none;
          padding: 10px 15px;
          cursor: pointer;
          margin-top: 10px;
        }

        .navbar {
          background-color: rgb(0, 0, 0);
          padding: 20px;
        }
      `}</style>
    </>
  );
}
