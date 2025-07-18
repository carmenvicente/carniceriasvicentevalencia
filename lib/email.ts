import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function enviarCorreo({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"Carnicería Vicente Valencia" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log('Correo enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw error;
  }
}

// 📩 Correo de bienvenida tras registro (SIN CAMBIOS)
export async function enviarCorreoBienvenida(
  nombre: string,
  email: string,
  apellidos?: string,
  tratamiento?: string
) {
  const saludo = tratamiento === 'Sra.' ? 'Bienvenida' : 'Bienvenido';
  const titulo = `${saludo} a Carnicería Vicente Valencia`;
  const cuerpo = `${saludo} ${tratamiento || ''} ${nombre} ${apellidos || ''}`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>${titulo}</h2>
      <p>${cuerpo}, gracias por registrarte en nuestra web.</p>
      <p>Desde tu cuenta podrás consultar productos, realizar pedidos y estar al tanto de todas nuestras novedades.</p>
      <br />
      <p style="font-size: 0.9em; color: #777;">Este es un correo automático. No respondas a este mensaje.</p>
    </div>
  `;

  await enviarCorreo({
    to: email,
    subject: 'Tu usuario ha sido creado - Carnicería Vicente Valencia',
    html,
  });
}

// 📩 Correo de notificación por cambio de datos (SIN CAMBIOS)
export async function enviarCorreoCambioDatos(
  nombre: string,
  email: string,
  apellidos?: string,
  tratamiento?: string
) {
  const saludo = tratamiento === 'Sra.' ? 'Estimada' : 'Estimado';
  const destinatario = `${saludo} ${tratamiento || ''} ${nombre} ${apellidos || ''}`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>${destinatario}</h2>
      <p>Te informamos que se han actualizado los datos de tu cuenta.</p>
      <p>Si no has sido tú, por favor contáctanos cuanto antes.</p>
      <br />
      <p style="font-size: 0.9em; color: #777;">Este es un correo automático. No respondas a este mensaje.</p>
    </div>
  `;

  await enviarCorreo({
    to: email,
    subject: 'Actualización de datos en tu cuenta - Carnicería Vicente Valencia',
    html,
  });
}

// 📩 Correo de confirmación de pedido (CAMBIOS AQUÍ)
interface ProductoPedido {
  id?: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

export async function enviarCorreoConfirmacionPedido({
  email,
  nombre,
  apellidos,
  tratamiento,
  total,
  productos,
  metodoPago = 'tienda',
}: {
  email: string;
  nombre?: string;
  apellidos?: string;
  tratamiento?: string;
  total: number;
  productos?: ProductoPedido[];
  metodoPago?: string;
}) {
  const saludo = tratamiento === 'Sra.' ? 'Estimada' : 'Estimado';
  const destinatario = nombre
    ? `${saludo} ${tratamiento || ''} ${nombre} ${apellidos || ''}`
    : 'Estimado cliente';

  let productosHtml = '';
  if (productos && productos.length > 0) {
    productosHtml = `
      <h3 style="color: #555; margin-top: 20px;">Detalle del Pedido:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Producto</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Cantidad</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Precio Unitario</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${productos
            .map(
              (item) => `
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">${item.nombre}</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${item.cantidad}</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${item.precio.toFixed(
                2
              )} €</td>
              <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${(
                item.cantidad * item.precio
              ).toFixed(2)} €</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
  } else {
    productosHtml = '<p>No se encontraron detalles de productos para este pedido.</p>';
  }

  let subject = 'Confirmación de Pedido - Carnicería Vicente Valencia';
  let paymentInfo = '';

  if (metodoPago === 'tienda') {
    subject = 'Confirmación de Pedido - Pago para recoger en tienda';
    paymentInfo = `
      <p>Has elegido el método de <strong>pago al recoger en tienda</strong>.</p>
      <p>Tu pedido estará listo en breve para que lo recojas en nuestra tienda física en horario comercial.</p>
      <p style="margin-top: 20px;">Dirección: <strong>Av. de Castilla-la Mancha, N° 27, Bajo, 16003 Cuenca</strong></p>
    `;
  } else {
    subject = 'Confirmación de Pedido - Pago recibido con éxito';
    paymentInfo = `
      <p>Tu pago se ha procesado con éxito.</p>
    <p>Tu pedido está en preparación y en breve estará listo para que lo recojas en nuestra tienda física en horario comercial.</p>
    <p style="margin-top: 20px;">Dirección: <strong>Av. de Castilla-la Mancha, N° 27, Bajo, 16003 Cuenca</strong></p>
    <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
    `;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2 style="color: #0056b3;">¡Gracias por tu compra!</h2>
      <p>${destinatario}, hemos recibido tu pedido correctamente y está en preparación.</p>

      ${productosHtml}
      <p style="font-size: 1.1em; font-weight: bold; margin-top: 20px;">
        Importe total: <span style="color: #d9534f;">${total.toFixed(2)} €</span>
      </p>
      ${paymentInfo}
      <br/>
      <p>Un saludo,</p>
      <p><strong>Carnicería Vicente Valencia</strong></p>
      <p style="font-size: 0.8em; color: #888; margin-top: 30px;">
        Este es un correo automático. Por favor, no respondas a este mensaje.
      </p>
    </div>
  `;

  await enviarCorreo({
    to: email,
    subject,
    html,
  });
}


// 📩 Correo cuando el pedido esté listo para recoger (SIN CAMBIOS)
export async function enviarCorreoPedidoListo({
  email,
  nombre,
  apellidos,
  tratamiento,
}: {
  email: string;
  nombre?: string;
  apellidos?: string;
  tratamiento?: string;
}) {
  const saludo = tratamiento === 'Sra.' ? 'Estimada' : 'Estimado';
  const destinatario = nombre ? `${saludo} ${tratamiento || ''} ${nombre} ${apellidos || ''}` : 'Estimado cliente';

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2>Tu pedido ya está listo para recoger</h2>
      <p>${destinatario}, ¡buenas noticias! Tu pedido está preparado y puedes venir a recogerlo cuando quieras durante nuestro horario comercial.</p>
      <p><strong>Dirección:</strong> Av. de Castilla-la Mancha, N° 27, Bajo, 16003 Cuenca</p>
      <br/>
      <p>Gracias por confiar en nosotros,</p>
      <p><strong>Carnicería Vicente Valencia</strong></p>
    </div>
  `;

  await enviarCorreo({
    to: email,
    subject: 'Tu pedido ya está listo - Carnicería Vicente Valencia',
    html,
  });
}