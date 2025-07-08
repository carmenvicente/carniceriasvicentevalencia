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

// 📩 Correo de bienvenida tras registro
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

// 📩 Correo de notificación por cambio de datos
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

// 📩 Correo de confirmación de pedido
export async function enviarCorreoConfirmacionPedido({
  email,
  nombre,
  apellidos,
  tratamiento,
  total,
}: {
  email: string;
  nombre?: string;
  apellidos?: string;
  tratamiento?: string;
  total: number;
}) {
  const saludo = tratamiento === 'Sra.' ? 'Estimada' : 'Estimado';
  const destinatario = nombre ? `${saludo} ${tratamiento || ''} ${nombre} ${apellidos || ''}` : 'Estimado cliente';

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2>¡Gracias por tu compra!</h2>
      <p>${destinatario}, hemos recibido tu pedido correctamente y está en preparación.</p>
      <p><strong>Importe total:</strong> ${total.toFixed(2)} €</p>
      <p>Recuerda que podrás recogerlo en nuestra tienda física en horario comercial.</p>
      <p style="margin-top: 20px;">Dirección: <strong>Av. de Castilla-la Mancha, N° 27, Bajo, 16003 Cuenca</strong></p>
      <br/>
      <p>Un saludo,</p>
      <p><strong>Carnicería Vicente Valencia</strong></p>
    </div>
  `;

  await enviarCorreo({
    to: email,
    subject: 'Confirmación de pedido - Carnicería Vicente Valencia',
    html,
  });
}

// 📩 Correo cuando el pedido esté listo para recoger
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
