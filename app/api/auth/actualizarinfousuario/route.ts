import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { enviarCorreoCambioDatos } from '@/lib/email';

const sql = neon(`${process.env.DATABASE_URL}?options=--client_encoding=UTF8`);
const JWT_SECRET = process.env.JWT_SECRET || 'CAMBIA_ESTA_CLAVE_POR_ALGO_MUY_SEGURO';

export async function PUT(request: Request) {
  try {
    const {
      id,
      tratamiento,
      nombre,
      apellidos,
      email,
      contraseñaActual,
      nuevaPassword,
    } = await request.json();

    // 1) Obtener usuario por ID
    const rows = await sql`SELECT password_hash FROM usuarios WHERE id = ${id}`;

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Usuario no encontrado.' }, { status: 404 });
    }

    const usuario = rows[0];

    // 2) Validar contraseña si se quiere cambiar
    let nuevoHash = null;

    if (nuevaPassword) {
      if (!contraseñaActual) {
        return NextResponse.json(
          { message: 'Debes introducir la contraseña actual para cambiarla.' },
          { status: 400 }
        );
      }

      const coincide = await bcrypt.compare(contraseñaActual, usuario.password_hash);
      if (!coincide) {
        return NextResponse.json(
          { message: 'La contraseña actual no es correcta.' },
          { status: 401 }
        );
      }

      nuevoHash = await bcrypt.hash(nuevaPassword, 10);
    }

    // 3) Actualizar datos
    if (nuevoHash) {
      await sql`
        UPDATE usuarios
        SET
          tratamiento = ${tratamiento},
          nombre = ${nombre},
          apellidos = ${apellidos},
          email = ${email},
          password_hash = ${nuevoHash}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        UPDATE usuarios
        SET
          tratamiento = ${tratamiento},
          nombre = ${nombre},
          apellidos = ${apellidos},
          email = ${email}
        WHERE id = ${id}
      `;
    }

    // 4) Recuperar datos actualizados
    const actualizado = await sql`
      SELECT id, email, nombre, apellidos, tratamiento, role
      FROM usuarios
      WHERE id = ${id}
    `;
    const nuevoUsuario = actualizado[0];

    // ✅ Enviar correo por cambio de datos
    await enviarCorreoCambioDatos(nuevoUsuario.nombre, nuevoUsuario.email, nuevoUsuario.apellidos, nuevoUsuario.tratamiento);

    // 5) Crear nuevo token
    const nuevoToken = jwt.sign(
      {
        id: nuevoUsuario.id,
        email: nuevoUsuario.email,
        nombre: nuevoUsuario.nombre,
        apellidos: nuevoUsuario.apellidos,
        tratamiento: nuevoUsuario.tratamiento,
        role: nuevoUsuario.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 6) Devolver nuevo token al frontend
    return NextResponse.json({
      message: 'Datos actualizados correctamente.',
      token: nuevoToken,
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}
