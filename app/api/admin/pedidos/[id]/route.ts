// app/api/admin/pedidos/[id]/route.ts

import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { enviarCorreoPedidoListo } from '@/lib/email'; // Importa la función de correo

const sql = neon(process.env.DATABASE_URL as string);

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const pedidoId = params.id;
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

      // Intenta obtener nombre/apellidos del JSON de productos si están ahí
      // O si los pasas en metadata en la sesión de Stripe y los guardaste en la DB
      // Por ahora, si no están explícitamente en columnas, usaremos el email
      // Si tu JSON de productos contiene el nombre del cliente, tendrías que parsearlo
      // Ejemplo: si el primer producto tiene un campo 'clienteNombre'
      /*
      try {
          const productosParsed = JSON.parse(pedidoExistente.productos);
          if (productosParsed && productosParsed.length > 0 && productosParsed[0].clienteNombre) {
              nombreCliente = productosParsed[0].clienteNombre;
              apellidosCliente = productosParsed[0].clienteApellidos;
              tratamientoCliente = productosParsed[0].clienteTratamiento;
          }
      } catch (parseError) {
          console.error('Error al parsear productos para obtener nombre/apellidos:', parseError);
      }
      */

      await enviarCorreoPedidoListo({
        email: pedidoExistente.email,
        nombre: nombreCliente, // Será undefined si no se obtiene de arriba
        apellidos: apellidosCliente, // Será undefined si no se obtiene de arriba
        tratamiento: tratamientoCliente, // Será undefined si no se obtiene de arriba
      });
      console.log(`✉️ Correo de pedido listo enviado a ${pedidoExistente.email}.`);
    }

    return NextResponse.json({ message: 'Pedido actualizado correctamente', pedidoId, nuevoEstado: estado });

  } catch (error: any) {
    console.error('❌ Error en /api/admin/pedidos/[id] (PUT):', error);
    return NextResponse.json({ error: `Error al actualizar pedido: ${error.message || 'Error desconocido'}` }, { status: 500 });
  }
}