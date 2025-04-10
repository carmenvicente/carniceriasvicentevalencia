"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/navbar.css"; // Ruta de los estilos CSS

export default function Navbar() {
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [productosElaboradosOpen, setProductosElaboradosOpen] = useState<boolean>(false);
  const [contactoOpen, setContactoOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => setMenuOpen(true);
  const handleMouseLeave = () => setTimeout(() => setMenuOpen(false), 500);
  const handleProductosElaboradosEnter = () => setProductosElaboradosOpen(true);
  const handleProductosElaboradosLeave = () =>
    setTimeout(() => setProductosElaboradosOpen(false), 500);
  const handleContactoEnter = () => setContactoOpen(true);
  const handleContactoLeave = () =>
    setTimeout(() => setContactoOpen(false), 500);

  return (
    <nav
      className={`fixed top-0 left-0 w-full py-0.5 transition-all duration-300 text-white`}
      style={{
        backgroundColor: scrolling ? "rgba(0, 0, 0, 0.8)" : "transparent",
        zIndex: 1000,
      }}
    >
      <div className="flex items-center justify-between w-full px-4 text-xs font-semibold">
        {/* Parte Izquierda: Logo */}
        <div className="flex items-center">
          <Link href="/" className="navbar-link">
            <img
              src="/imagenes/logos/logoblancocolor.png"
              alt="Logo de la empresa"
              className="h-20"
            />
          </Link>
        </div>

        {/* Parte Central: Enlaces de navegación */}
<div className="flex-grow text-center">
  <ul className="inline-flex items-center space-x-6">
    <li>
      <Link href="/" className="navbar-link">
        INICIO
      </Link>
    </li>

    {/* Menú desplegable de Productos Frescos */}
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="navbar-link cursor-default">
        PRODUCTOS FRESCOS▼
      </span>
      {menuOpen && (
        <ul className="absolute left-0 mt-1 space-y-1 bg-white text-black p-2 rounded-lg transition-all duration-300 min-w-[150px] text-center">
          <li>
            <Link
              href="/productos-frescos/ternera"
              className="navbar-dropdown-link hover:text-red-400 transition"
            >
              TERNERA
            </Link>
          </li>
          <li>
            <Link
              href="/productos-frescos/cerdo"
              className="navbar-dropdown-link hover:text-red-400 transition"
            >
              CERDO
            </Link>
          </li>
          <li>
            <Link
              href="/productos-frescos/cordero"
              className="navbar-dropdown-link hover:text-red-400 transition"
            >
              CORDERO
            </Link>
          </li>
          <li>
            <Link
              href="/productos-frescos/avesyconejos"
              className="navbar-dropdown-link hover:text-red-400 transition"
            >
              AVES Y CONEJOS
            </Link>
          </li>
        </ul>
      )}
    </li>

    {/* Menú desplegable de Productos Elaborados */}
    <li
      className="relative"
      onMouseEnter={handleProductosElaboradosEnter}
      onMouseLeave={handleProductosElaboradosLeave}
    >
      <span className="navbar-link cursor-default">
        PRODUCTOS ELABORADOS▼
      </span>
      {productosElaboradosOpen && (
        <ul className="absolute left-0 mt-1 space-y-1 bg-white text-black p-2 rounded-lg transition-all duration-300 min-w-[150px] text-center">
          <li>
            <Link
              href="/productos-elaborados/embutidoscaseros"
              className="navbar-dropdown-link hover:text-red-400 transition"
            >
              EMBUTIDOS CASEROS
            </Link>
          </li>
          <li>
            <Link
              href="/productos-elaborados/elaborados"
              className="navbar-dropdown-link hover:text-red-400 transition"
            >
              ELABORADOS
            </Link>
          </li>
        </ul>
      )}
    </li>

    <li>
      <Link href="/charcuteria" className="navbar-link">
        CHARCUTERÍA
      </Link>
    </li>
    <li>
      <Link href="/comida-semanal" className="navbar-link">
        COMIDA SEMANAL
      </Link>
    </li>
    <li>
      <Link href="/contacto" className="navbar-link">
        CONTACTO
      </Link>
    </li>
  </ul>
</div>


        {/* Parte Derecha: Íconos de buscar, perfil y cesta */}
        <div className="flex items-center space-x-2 gap-3" >
          <Link href="/search" className="navbar-link">
            <img
              src="/imagenes/iconos/busqueda.png"
              alt="Buscar"
              className="navbar-icon h-6 w-6"
            />
          </Link>
          <Link href="/profile" className="navbar-link">
            <img
              src="/imagenes/iconos/usuario.png"
              alt="Perfil"
              className="navbar-icon h-6 w-6"
            />
          </Link>
          <Link href="/cart" className="navbar-link">
            <img
              src="/imagenes/iconos/carrito-de-compras.png"
              alt="Cesta"
              className="navbar-icon h-6 w-6"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
