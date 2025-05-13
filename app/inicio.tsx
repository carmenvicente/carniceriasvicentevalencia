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
              href="/productos-frescos/ternera"
              className="bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-red-800 transition" color='#990000'
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
            <p className="text-gray-700 mb-4 mt-9" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              Carnicería Vicente Valencia es tu carnicería de confianza, ahora también disponible online.
            </p>
            <p className="text-gray-700 mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              Seleccionamos cuidadosamente productos frescos y de primera calidad para que disfrutes del auténtico sabor de la carne tradicional. Haz tu pedido de forma rápida y sencilla, y ven a recogerlo cómodamente cuando esté listo. Calidad, cercanía y buen servicio, como siempre.
            </p>
            <p className="text-gray-700 mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              Descubre nuestra variedad de cortes frescos, embutidos caseros y otros productos gourmet. ¡Bienvenido a nuestra carnicería online de sabor superior!
            </p>
          </div>

          {/* Columna Derecha: Imagen */}
          <div className="md:w-1/2 flex items-center justify-center">
            <Image
              src="/imagenes/otros/dueno2.webp" // Ajusta la ruta a tu imagen real
              alt="Carnicería Vicente Valencia"
              width={580}
              height={450}
              className="rounded-md object-cover "
              style={{ objectPosition: "center top" }}
            />
          </div>
        </div>

        {/* Sección de Productos Frescos */}
        <div className="mt-30">
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
        <div className="mt-30">
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
      <div className="w-full flex justify-center px-4 mt-30">
        <div className="bg-black text-white rounded-2xl px-8 py-10 max-w-screen-xl w-full shadow-lg">
          <div className="grid gap-9 grid-cols-1 md:grid-cols-3 text-center">
            <div className="transition-transform duration-300 hover:scale-105">
              <Image
                src="/imagenes/iconos/tarjeta-de-credito.png"
                alt="Pago Seguro"
                width={32}
                height={32}
                className="mx-auto mb-2"
              />
              <h6 className="text-base font-semibold">Pago 100% Seguro</h6>
              <p className="text-sm mt-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                Compra segura con certificado SSL
              </p>
            </div>
            <div className="transition-transform duration-300 hover:scale-105">
              <Image
                src="/imagenes/iconos/avion-de-papel.png"
                alt="Pedidos Rápidos"
                width={32}
                height={32}
                className="mx-auto mb-2"
              />
              <h6 className="text-base font-semibold">Pedidos Rápidos</h6>
              <p className="text-sm mt-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                Preparación rápida de tu pedido
              </p>
            </div>
            <div className="transition-transform duration-300 hover:scale-105">
              <Image
                src="/imagenes/iconos/apreton-de-manos.png"
                alt="Atención al Cliente"
                width={32}
                height={32}
                className="mx-auto mb-2"
              />
              <h6 className="text-base font-semibold">Atención al Cliente</h6>
              <p className="text-sm mt-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                Resolvemos tus dudas vía WhatsApp o llamada
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Sección de Nuestros Valores */}
      <div className="relative w-full mt-30">
        {/* Fondo de la sección */}
        <div
          className="w-full h-[200px] md:h-[400px] bg-cover bg-center"
          style={{ backgroundImage: "url('/imagenes/otros/valores.jpg')" }}
        />
        {/* Overlay negro */}
        <div className="absolute inset-0 bg-black opacity-65" />

        {/* Contenedor centralizado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="grid grid-cols-3 gap-x-[6rem] gap-y-8 max-w-2xl w-full">
            {[
              { src: '/imagenes/iconos/cuchillo.png', label: 'Comida Casera' },
              { src: '/imagenes/iconos/toro.png', label: 'Orígenes' },
              { src: '/imagenes/iconos/calidad.png', label: 'Calidad' },
            ].map((val, i) => (
              <div key={i} className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
                <Image
                  src={val.src}
                  alt={val.label}
                  width={120}
                  height={60}
                  className="mb-6"
                />
                <span className="text-white text-lg font-medium">{val.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tarjeta roja en esquina inferior derecha */}
        <div className="absolute bottom-[-2rem] right-4 bg-[#990000] rounded-lg shadow-lg overflow-hidden w-100">
          <div className="flex">
            <div className="flex-1 p-6 border-r border-red-500">
              <h2 className="text-4xl font-bold text-white">+1000</h2>
              <p className="text-sm text-red-200">clientes al mes</p>
            </div>
            <div className="flex-1 p-6">
              <h2 className="text-4xl font-bold text-white">+100</h2>
              <p className="text-sm text-red-200">productos</p>
            </div>
          </div>
        </div>
      </div>





      <div className="relative w-full mt-30 bg-white overflow-visible">
        {/* Contenedor central que limita el ancho máximo */}
        <div className="relative z-10 mx-auto max-w-screen-xl flex flex-col md:flex-row items-start">
          {/* Columna izquierda: Imágenes superpuestas */}
          <div className="w-full md:w-1/2 relative p-6 flex justify-center">
            {/* Imagen base */}
            <Image
              src="/imagenes/otros/jesuschorizos.jpg"
              alt="De Toda la Vida - La Tribuna de Cuenca"
              width={800}
              height={400}
              className="w-80 md:w-96 lg:w-[500px] h-auto rounded-lg shadow-md object-cover ml-4 md:ml-8 lg:ml-12"
            />
            {/* Imagen superpuesta 1 */}
            <Image
              src="/imagenes/otros/noticia.png"
              alt="Detalle 1"
              width={200}
              height={112}
              className="absolute top-[-20px] left-[-33px] rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.4)] border-4 border-white object-cover"
            />
          </div>
          {/* Línea roja divisoria */}
          <div className="hidden md:block w-1 bg-[#990000] h-80" />
          {/* Columna derecha: Noticia */}
          <div className="w-full md:w-1/2 p-6">
            <h1 className="text-3xl font-extrabold mb-4 text-gray-800 relative">
              De Toda la Vida
            </h1>
            <p className="text-gray-700 mb-6 relative" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              En su día a día, Jesús lleva por bandera el negocio familiar que su padre, Vicente, comenzó a fraguar hace ya más de 70 años. Una carnicería especial y con sello propio.
            </p>
            <Link
              href="https://www.latribunadecuenca.es/noticia/zbd62b45d-e0ac-fd0f-55e264a9a616780d/202109/de-toda-la-vida"
              target="_blank"
              className="inline-block px-6 py-3 bg-[#990000] text-white font-semibold rounded-lg shadow-lg hover:bg-[#aa0000] transition relative"

            >
              Leer Noticia Completa
            </Link>
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
