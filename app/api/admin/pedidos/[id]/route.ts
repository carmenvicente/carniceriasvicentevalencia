// app/api/admin/pedidos/[id]/route.ts

export const dynamic = 'force-dynamic';

import { NextResponse, NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { enviarCorreoPedidoListo } from '@/lib/email';
import jwt from 'jsonwebtoken';

const getSQL = () => neon(process.env.DATABASE_URL as string);
const JWT_SECRET = process.env.JWT_SECRET as string;

export async function PUT(
  req: NextRequest,
  context: any
) {
  const sql = getSQL();

  // Verificar token y rol admin
  const auth = req.headers.get('Authorization');
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role: string };
    if (payload.role !== 'admin') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

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
    return NextResponse.json({ error: 'Error al actualizar pedido' }, { status: 500 });
  }
}
