'use client';

import Navbar from '@/app/componentes/navbar';
import Footer from '@/app/componentes/footer';
import Link from 'next/link';

export default function TerminosCondiciones() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Franja negra superior */}
            <div className="h-22 w-full bg-black" />

            {/* Cabecera blanca */}
            <div className="w-full py-3 bg-white">
                <div className="max-w-screen-xl mx-auto text-center px-4 mt-10">
                    <h1 className="text-xl md:text-2xl font-bold text-black">TÉRMINOS Y CONDICIONES</h1>
                    <div className="mt-1 text-black text-sm">
                        <Link href="/" className="hover:text-gray-700" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                            Home
                        </Link>
                        <span className="mx-1">/</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Términos y Condiciones</span>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="max-w-screen-xl mx-auto px-4 py-10 text-black" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                <p className="mb-20">
                    Las presentes condiciones regulan expresamente las relaciones surgidas entre el sitio web de <strong>Carnicería Vicente Valencia</strong> y los usuarios que accedan o contraten los productos ofrecidos a través del mismo.
                </p>

                <h2 className="text-lg font-semibold mt-8 mb-4">1. Identificación</h2>
                <p className="mb-20">
                    Titular: Carnicería Vicente Valencia<br />
                    CIF: B16188021<br />
                    Domicilio: Av. de Castilla-la Mancha, Nº 27, Bajo, 16003 Cuenca<br />
                    Email: carniceriavicentevalencia@gmail.com
                </p>


                <h2 className="text-lg font-semibold mt-8 mb-4">2. Objeto</h2>
                <p className="mb-20">
                    Estas condiciones tienen por objeto regular el acceso y el uso del sitio web, así como las condiciones de contratación de los productos comercializados en el mismo.
                </p>

                <h2 className="text-lg font-semibold mt-8 mb-4">3. Proceso de compra</h2>
                <p className="mb-20">
                    Para realizar un pedido, el usuario deberá ser mayor de edad, registrarse con sus datos personales, seguir el proceso de compra indicado en la tienda online y autorizar el pedido. Una vez confirmado, se preparará bajo demanda.
                </p>

                <h2 className="text-lg font-semibold mt-8 mb-4">4. Recogida en tienda</h2>
                <p className="mb-20">
                    Todos los pedidos realizados a través del sitio web se preparan bajo demanda y estarán disponibles exclusivamente para recogida en tienda. El cliente será notificado cuando su pedido esté listo y podrá pasar a recogerlo en el horario establecido.
                </p>

                <h2 className="text-lg font-semibold mt-8 mb-4">5. Devoluciones</h2>
                <p className="mb-20">
                    No se admiten devoluciones de productos perecederos salvo en casos excepcionales de error en el pedido o productos en mal estado. Las incidencias deberán comunicarse el mismo día de la recogida.
                </p>

                <h2 className="text-lg font-semibold mt-8 mb-4">6. Precios y formas de pago</h2>
                <p className="mb-20">
                    Todos los precios incluyen el IVA correspondiente. El pago puede realizarse online mediante tarjeta o, si se habilita, en tienda al recoger el pedido.
                </p>

                <h2 className="text-lg font-semibold mt-8 mb-4">7. Disponibilidad de productos</h2>
                <p className="mb-20">
                    En caso de falta de disponibilidad de algún producto solicitado, se informará al cliente y se ofrecerá una alternativa o la modificación del pedido.
                </p>

                <h2 className="text-lg font-semibold mt-8 mb-4">8. Propiedad intelectual</h2>
                <p className="mb-4">
                    Todos los contenidos del sitio web son propiedad de Carnicería Vicente Valencia o tienen licencia de uso, y están protegidos por la legislación vigente. Está prohibida su reproducción o distribución sin autorización expresa.
                </p>

                <p className="mb-20">
                    El tratamiento de datos personales se rige por lo establecido en nuestra <Link href="/informacionlegal/politica-de-privacidad" className="text-blue-600 hover:underline">Política de Privacidad</Link>.
                    El usuario puede ejercer sus derechos escribiendo a carniceriavicentevalencia@gmail.com.
                </p>


                <h2 className="text-lg font-semibold mt-8 mb-4">9. Legislación y jurisdicción</h2>
                <p className="mb-20">
                    Estas condiciones se rigen por la legislación española. En caso de disputa, las partes se someten a los Juzgados y Tribunales de Cuenca, salvo que la normativa establezca lo contrario.
                </p>


                <p className="text-sm text-gray-500 text-right mt-6" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    Última actualización: junio de 2025
                </p>
            </div>




            <div className="mt-10">
                <Footer />
            </div>
        </main>
    );
}
