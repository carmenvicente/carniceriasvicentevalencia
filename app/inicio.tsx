"use client";
import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Inicio() {
  return (
    <div className="w-full min-h-screen overflow-y-auto">
      {/* Navbar */}
      <Navbar />

      {/* Imagen de fondo a pantalla completa */}
      <div className="relative w-full h-screen">
        <Image
          src="/imagenes/fondo33.jpg"
          alt="Imagen de la carnicería"
          fill
          className="object-cover"
        />

        {/* Contenedor del texto con animación */}
        <div
          className="
            absolute top-1/2 left-10
            transform -translate-y-1/2
            text-white text-left
            fade-in-right
          "
        >
          <h1 className="text-6xl font-bold mb-4">TRADICIÓN Y CALIDAD</h1>
          <h1 className="text-6xl font-bold">EN CADA CORTE</h1>
          <div className="mt-6">
            <Link
              href="/productos"
              className="bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-red-800 transition"
            >
              Ver productos
            </Link>
          </div>
        </div>
      </div>

      {/* Contenido extra: Bienvenida y Productos */}
      <div className="w-full py-10 bg-white text-center">
        {/* Bloque: Quiénes Somos / Imagen a la derecha */}
        <div className="max-w-screen-xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center gap-8">
          {/* Columna Izquierda: Texto */}
          <div className="md:w-1/2 text-left">
            <p className="text-red-600 uppercase font-semibold mb-2">quiénes somos</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Carnicería Vicente Valencia
            </h2>
            <p className="text-gray-700 mb-4">
              Carnicería Vicente Valencia es tu carnicería de confianza, ahora también disponible online.
            </p>
            <p className="text-gray-700 mb-4">
              Seleccionamos cuidadosamente productos frescos y de primera calidad para que disfrutes del auténtico sabor de la carne tradicional. Haz tu pedido de forma rápida y sencilla, y ven a recogerlo cómodamente cuando esté listo. Calidad, cercanía y buen servicio, como siempre.
            </p>
            <p className="text-gray-700 mb-4">
              Descubre nuestra variedad de cortes frescos, embutidos caseros y otros productos gourmet. ¡Bienvenido a nuestra carnicería online de sabor superior!
            </p>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="md:w-1/2 flex items-center justify-center">
            <Image
              src="/imagenes/dueno.jpg" // Ajusta la ruta a tu imagen real
              alt="Carnicería Vicente Valencia"
              width={400}
              height={350}
              className="rounded-md object-cover "
              style={{ objectPosition: "center top" }}
            />
          </div>
        </div>

        {/* Sección de Productos Frescos */}
        <div className="mt-20">
          <h5 className="text-xl font-semibold" style={{ color: '#990000' }}>
            Nuestros Productos Frescos
          </h5>
          <div className="flex justify-center gap-20 mt-4">
            <Link
              href="/productos-frescos/ternera"
              className="flex flex-col items-center text-gray-700 hover:text-red-700"
            >
              <Image
                src="/imagenes/dibujos/terneradibujo.png"
                alt="Ternera"
                width={200}
                height={200}
                className="mb-2 transition-transform duration-300 hover:scale-105"
              />
              <span>TERNERA</span>
            </Link>
            <Link
              href="/productos-frescos/cerdo"
              className="flex flex-col items-center text-gray-700 hover:text-red-700"
            >
              <Image
                src="/imagenes/dibujos/cerdodibujo.png"
                alt="Cerdo"
                width={300}
                height={300}
                className="mb-2 transition-transform duration-300 hover:scale-105"
              />
              <span>CERDO</span>
            </Link>
            <Link
              href="/productos-frescos/cordero"
              className="flex flex-col items-center text-gray-700 hover:text-red-700"
            >
              <Image
                src="/imagenes/dibujos/corderodibujo.png"
                alt="Cordero"
                width={300}
                height={300}
                className="mb-2 transition-transform duration-300 hover:scale-105"
              />
              <span>CORDERO</span>
            </Link>
            <Link
              href="/productos-frescos/avesyconejos"
              className="flex flex-col items-center text-gray-700 hover:text-red-700"
            >
              <Image
                src="/imagenes/dibujos/avesyconejosdibujo.png"
                alt="Aves y Conejos"
                width={200}
                height={200}
                className="mb-2 transition-transform duration-300 hover:scale-105"
              />
              <span>AVES Y CONEJO</span>
            </Link>
          </div>
        </div>

        {/* Sección de Productos Elaborados */}
        <div className="mt-25">
          <h5 className="text-xl font-semibold" style={{ color: '#990000' }}>
            Nuestros Productos Elaborados
          </h5>
          <div className="flex justify-center gap-20 mt-4">
            <Link
              href="/productos-elaborados/embutidoscaseros"
              className="flex flex-col items-center text-gray-700 hover:text-red-700"
            >
              <Image
                src="/imagenes/dibujos/embutidoscaserosdibujo.png"
                alt="Embutidos caseros"
                width={300}
                height={300}
                className="mb-2 transition-transform duration-300 hover:scale-105"
              />
              <span>Embutidos caseros</span>
            </Link>
            <Link
              href="/productos-elaborados/elaborados"
              className="flex flex-col items-center text-gray-700 hover:text-red-700"
            >
              <Image
                src="/imagenes/dibujos/elaboradosdibujo.png"
                alt="Elaborados"
                width={350}
                height={350}
                className="mb-2 transition-transform duration-300 hover:scale-105"
              />
              <span>elaborados</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bloque con apariencia de tarjeta (cuadro negro con información) */}
      <div className="w-full flex justify-center px-4 mt-8">
        <div className="bg-black text-white rounded-2xl px-8 py-10 max-w-screen-xl w-full shadow-lg">
          <div className="grid gap-9 grid-cols-1 md:grid-cols-3 text-center">
            <div>
              <img
                src="/imagenes/iconos/tarjeta-de-credito.png"
                alt="Pago Seguro"
                className="w-8 h-8 mx-auto mb-2 transition-transform duration-300 hover:scale-130"
              />
              <h6 className="text-base font-semibold">Pago 100% Seguro</h6>
              <p className="text-sm">Compra segura con certificado SSL</p>
            </div>
            <div>
              <img
                src="/imagenes/iconos/avion-de-papel.png"
                alt="Pedidos Rápidos"
                className="w-8 h-8 mx-auto mb-2 transition-transform duration-300 hover:scale-130"
              />
              <h6 className="text-base font-semibold">Pedidos Rápidos</h6>
              <p className="text-sm">Preparación rápida de tu pedido</p>
            </div>
            <div>
              <img
                src="/imagenes/iconos/apreton-de-manos.png"
                alt="Atención al Cliente"
                className="w-8 h-8 mx-auto mb-2 transition-transform duration-300 hover:scale-130"
              />
              <h6 className="text-base font-semibold">Atención al Cliente</h6>
              <p className="text-sm">Resolvemos tus dudas vía WhatsApp o llamada</p>
            </div>
          </div>
        </div>
      </div>


      {/* Sección de Nuestros Valores */}
<div className="relative w-full mt-20">
  {/* Fondo de la sección (imagen de fondo) */}
  <div
    className="w-full h-100 md:h-[500px] bg-cover bg-center"
    style={{ backgroundImage: "url('/imagenes/otros/fondo44.jpg')" }}
  ></div>
  {/* Capa de overlay para oscurecer el fondo */}
  <div className="absolute inset-0 bg-black opacity-20"></div>
  {/* Contenedor de la sección, situado a la derecha */}
  <div className="absolute inset-0 flex items-center justify-end">
    <div className="w-full max-w-md pr-8">
      {/* Título de la sección, posicionado en la parte superior */}
      <h3 className="text-xl font-bold text-white mb-4">Nuestros Valores</h3>
      {/* Grid de los 4 cuadros en 2 columnas y 2 filas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cuadro Valor 1 */}
        <div className="bg-white/80 p-4 rounded-lg flex flex-col items-center">
          <Image
            src="/imagenes/iconos/valor1.png"
            alt="Valor 1"
            width={50}
            height={50}
            className="mb-2"
          />
          <h4 className="font-bold text-gray-800">Valor 1</h4>
          <p className="text-sm text-gray-700">
            Descripción breve del valor 1
          </p>
        </div>
        {/* Cuadro Valor 2 */}
        <div className="bg-white/80 p-4 rounded-lg flex flex-col items-center">
          <Image
            src="/imagenes/iconos/valor2.png"
            alt="Valor 2"
            width={50}
            height={50}
            className="mb-2"
          />
          <h4 className="font-bold text-gray-800">Valor 2</h4>
          <p className="text-sm text-gray-700">
            Descripción breve del valor 2
          </p>
        </div>
        {/* Cuadro Valor 3 */}
        <div className="bg-white/80 p-4 rounded-lg flex flex-col items-center">
          <Image
            src="/imagenes/iconos/valor3.png"
            alt="Valor 3"
            width={50}
            height={50}
            className="mb-2"
          />
          <h4 className="font-bold text-gray-800">Valor 3</h4>
          <p className="text-sm text-gray-700">
            Descripción breve del valor 3
          </p>
        </div>
        {/* Cuadro Valor 4 */}
        <div className="bg-white/80 p-4 rounded-lg flex flex-col items-center">
          <Image
            src="/imagenes/iconos/valor4.png"
            alt="Valor 4"
            width={50}
            height={50}
            className="mb-2"
          />
          <h4 className="font-bold text-gray-800">Valor 4</h4>
          <p className="text-sm text-gray-700">
            Descripción breve del valor 4
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Sección de Reseñas */}
      <section className="bg-white py-10 px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Reseñas</h2>
        <p className="text-xl text-gray-700 mb-8">Los clientes hablan por nosotros</p>
        <div className="max-w-screen-xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-3">
          {/* Reseña 1 */}
          <div className="shadow-lg p-6 rounded-lg flex flex-col items-center">
            <p className="text-gray-600 mb-4">
              “Muy buena relación calidad precio para comprar ternera, y la atención es
              excelente. Me encantan la carne de hamburguesa.”
            </p>
            <p className="font-semibold text-red-600">Jorge García García</p>
            <p className="text-sm text-gray-400">Reseña de Google</p>
          </div>
          {/* Reseña 2 */}
          <div className="shadow-lg p-6 rounded-lg flex flex-col items-center">
            <p className="text-gray-600 mb-4">
              “Excelente tienda de carnes y productos gourmet. Ofrecen carne de una
              calidad excepcional con variedad de tipos de corte y provienen de una
              finca con altos estándares ecológicos.”
            </p>
            <p className="font-semibold text-red-600">Daniel Vargas</p>
            <p className="text-sm text-gray-400">Reseña de Google</p>
          </div>
          {/* Reseña 3 */}
          <div className="shadow-lg p-6 rounded-lg flex flex-col items-center">
            <p className="text-gray-600 mb-4">
              “Estupendo producto y buenos precios para lo que son. La mejor carnicería de
              la zona. Buen vino y buenas hamburguesas...”
            </p>
            <p className="font-semibold text-red-600">Daniel Fuente</p>
            <p className="text-sm text-gray-400">Reseña de Google</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-700">
            La evaluación general en Google es <strong>5 de 5</strong>, en base a 17 reseñas
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
