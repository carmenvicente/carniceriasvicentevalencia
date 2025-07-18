// app/api/admin/pedidos/[id]/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { enviarCorreoPedidoListo } from '@/lib/email';

const sql = neon(process.env.DATABASE_URL as string);

// ******* CAMBIO AQUÍ: Usando 'any' para el contexto (solo para depuración) *******
export async function PUT(
  req: NextRequest,
  context: any // <-- ¡Usamos 'any' aquí para ver si el error de tipo desaparece!
) {
  try {
    const pedidoId = context.params?.id; // Accedemos a los parámetros a través de 'context.params'
    const { estado } = await req.json();

    console.log(`API Admin: Recibida petición PUT para pedido ${pedidoId} con estado: ${estado}`);

    if (!pedidoId || !estado) {
      console.error('Validation Error: ID de pedido o estado no proporcionado.');
      return NextResponse.json({ error: 'ID de pedido o estado no proporcionado' }, { status: 400 });
    }

    const [pedidoExistente] = await sql`
      SELECT email, productos, estado
      FROM pedidos
      WHERE id = ${parseInt(pedidoId)};
    `;

    if (!pedidoExistente) {
      console.error(`Error: Pedido con ID ${pedidoId} no encontrado.`);
      return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
    }

    await sql`
      UPDATE pedidos
      SET estado = ${estado}
      WHERE id = ${parseInt(pedidoId)};
    `;
    console.log(`🎉 Pedido ${pedidoId} actualizado a estado '${estado}'.`);

    if (estado === 'listo') {
      let nombreCliente: string | undefined;
      let apellidosCliente: string | undefined;
      let tratamientoCliente: string | undefined;

      await enviarCorreoPedidoListo({
        email: pedidoExistente.email,
        nombre: nombreCliente,
        apellidos: apellidosCliente,
        tratamiento: tratamientoCliente,
      });
      console.log(`✉️ Correo de pedido listo enviado a ${pedidoExistente.email}.`);
    }

    return NextResponse.json({ message: 'Pedido actualizado correctamente', pedidoId, nuevoEstado: estado });

  } catch (error: any) {
    console.error('❌ Error en /api/admin/pedidos/[id] (PUT):', error);
    return NextResponse.json({ error: `Error al actualizar pedido: ${error.message || 'Error desconocido'}` }, { status: 500 });
  }
}
