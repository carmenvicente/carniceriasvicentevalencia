// app/api/admin/pedidos/route.ts

import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL as string);

export async function GET() {
  try {
    console.log('API Admin: Recibida petición GET para /api/admin/pedidos');

    // Obtener todos los pedidos de la base de datos
    const pedidosDB = await sql`
      SELECT id, email, total, productos, metodo_pago, estado, stripe_session_id, creado_en
      FROM pedidos
      ORDER BY creado_en DESC;
    `;

    // Procesar los pedidos para el frontend
    const pedidosProcesados = pedidosDB.map((pedido: any) => {
      let productosParsed: any[] = [];
      try {
        // Intentar parsear la cadena JSON de productos
        if (pedido.productos) {
          productosParsed = JSON.parse(pedido.productos);
        }
      } catch (e) {
        console.error(`Error al parsear productos para el pedido ${pedido.id}:`, e);
        // En caso de error, se deja como array vacío
      }

      return {
        id: pedido.id,
        email: pedido.email,
        total: parseFloat(pedido.total),
        productos: productosParsed,
        metodo_pago: pedido.metodo_pago,
        estado: pedido.estado,
        stripe_session_id: pedido.stripe_session_id,
        creado_en: pedido.creado_en,
      };
    });

    // --- CAMBIO CLAVE AQUÍ: LÓGICA DE FILTRADO MÁS SIMPLE Y CLARA ---
    // Pendientes: Todos los pedidos que NO están en estado 'listo'.
    // Esto incluye 'pendiente', 'pagado', y cualquier otro estado que no sea 'listo'.
    const pendientes = pedidosProcesados.filter(p => p.estado !== 'listo');
    
    // Listos: Solo los pedidos que están explícitamente en estado 'listo'.
    const listos = pedidosProcesados.filter(p => p.estado === 'listo');
    // --- FIN DEL CAMBIO CLAVE ---

    console.log(`API Admin: Encontrados ${pendientes.length} pedidos pendientes y ${listos.length} pedidos listos.`);
    return NextResponse.json({ pendientes, listos });

  } catch (error: any) {
    console.error('❌ Error en /api/admin/pedidos (GET):', error);
    return NextResponse.json({ error: `Error al cargar pedidos: ${error.message || 'Error desconocido'}` }, { status: 500 });
  }
}