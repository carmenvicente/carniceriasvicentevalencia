// app/api/admin/pedidos/[id]/route.ts

import { NextResponse, NextRequest } from 'next/server'; // Asegúrate de importar NextRequest
import { neon } from '@neondatabase/serverless';
import { enviarCorreoPedidoListo } from '@/lib/email';

const sql = neon(process.env.DATABASE_URL as string);

// ******* CAMBIO AQUÍ: La firma de la función PUT con tipado inline *******
export async function PUT(
  req: NextRequest, // El primer argumento es la Request (o NextRequest)
  context: { params: { id: string } } // El segundo argumento es un objeto con 'params' tipado directamente
) {
  try {
    const pedidoId = context.params.id; // Accedemos a los parámetros a través de 'context.params'
    const { estado } = await req.json(); // Esperamos { estado: 'listo' }

    console.log(`API Admin: Recibida petición PUT para pedido ${pedidoId} con estado: ${estado}`);

    if (!pedidoId || !estado) {
      console.error('Validation Error: ID de pedido o estado no proporcionado.');
      return NextResponse.json({ error: 'ID de pedido o estado no proporcionado' }, { status: 400 });
    }

    // Primero, obtener los datos del pedido para el correo antes de actualizar
    const [pedidoExistente] = await sql`
      SELECT email, productos, estado
      FROM pedidos
      WHERE id = ${parseInt(pedidoId)};
    `;

    if (!pedidoExistente) {
      console.error(`Error: Pedido con ID ${pedidoId} no encontrado.`);
      return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
    }

    // Actualizar el estado del pedido en la base de datos
    await sql`
      UPDATE pedidos
      SET estado = ${estado}
      WHERE id = ${parseInt(pedidoId)};
    `;
    console.log(`🎉 Pedido ${pedidoId} actualizado a estado '${estado}'.`);

    // Si el estado es 'listo', enviar el correo de notificación
    if (estado === 'listo') {
      let nombreCliente: string | undefined;
      let apellidosCliente: string | undefined;
      let tratamientoCliente: string | undefined;

      // Si necesitas obtener nombre/apellidos/tratamiento, tendrías que recuperarlos
      // de `pedidoExistente.productos` (si los guardaste ahí como JSON)
      // o de otro lugar en tu DB. Por ahora, se pasarán como undefined.

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
