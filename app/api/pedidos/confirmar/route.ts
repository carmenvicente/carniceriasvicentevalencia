// app/api/pedidos/confirmar/route.ts

import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

const getSQL = () => neon(process.env.DATABASE_URL as string);

export async function POST(req: Request) {
  const sql = getSQL();

  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      console.error('Frontend request: Falta sessionId.');
      return NextResponse.json({ error: 'Falta sessionId' }, { status: 400 });
    }

    // Consulta la base de datos para obtener el estado y los detalles del pedido
    // NO se consultan nombre, apellidos, tratamiento aquí porque no están como columnas directas
    // y el correo se envía desde el webhook.
    const [pedido] = await sql`
      SELECT email, total, estado FROM pedidos WHERE stripe_session_id = ${sessionId}
    `;

    if (pedido) {
      console.log(`Frontend: Pedido encontrado para sesión ${sessionId}. Estado: ${pedido.estado}`);
      // Asegúrate de que 'total' es un número para el frontend
      return NextResponse.json({
        email: pedido.email,
        total: parseFloat(pedido.total),
        estado: pedido.estado // Enviamos el estado para que la página lo muestre
      });
    } else {
      console.error(`Frontend: Pedido no encontrado para sesión ${sessionId}.`);
      return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
    }

  } catch (error: any) {
    console.error('❌ Error al procesar la confirmación del frontend (api/pedidos/confirmar):', error);
    return NextResponse.json({ error: `Error al obtener detalles del pedido: ${error.message || 'Error desconocido'}` }, { status: 500 });
  }
}