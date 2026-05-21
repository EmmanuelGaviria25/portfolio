export default async function handler(req, res) {
  // Configuración de CORS para admitir llamadas desde emma-dev.com y local
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Responder a peticiones de preflight OPTIONS (CORS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { name, email, phone, message, website_hp, submit_time } = req.body;

    // 1. Control de Spam de Bots: Honeypot (campo oculto)
    if (website_hp) {
      console.log('[BOT SPAM DETECTADO] Honeypot completado.');
      // Simulamos éxito para el bot pero no hacemos nada
      return res.status(200).json({ success: true, message: 'Envío completado exitosamente.' });
    }

    // 2. Control de Spam de Bots: Verificación de tiempo transcurrido (Timing Check)
    if (submit_time) {
      const timeDiff = Date.now() - Number(submit_time);
      if (timeDiff < 2000) {
        console.log(`[BOT SPAM DETECTADO] Velocidad inhumana de envío (${timeDiff}ms).`);
        return res.status(200).json({ success: true, message: 'Envío completado exitosamente.' });
      }
    }

    // 3. Validación de campos obligatorios
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Por favor, completa todos los campos obligatorios.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[SERVER ERROR] Clave RESEND_API_KEY no definida.');
      return res.status(500).json({ error: 'La API Key de Resend no está configurada.' });
    }

    // 4. Plantilla HTML premium para recibir el correo
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border-radius: 16px; background-color: #0c0c0e; border: 1px solid #1c1c20; color: #ececed; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
        <div style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid #1c1c20; margin-bottom: 24px;">
          <div style="display: inline-block; padding: 10px 14px; border-radius: 12px; background: linear-gradient(135deg, #5A181C 0%, #FF3E44 100%); margin-bottom: 12px;">
            <span style="font-size: 24px;">📬</span>
          </div>
          <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">¡Tienes un nuevo mensaje de contacto!</h2>
          <p style="color: #8c8c93; margin: 6px 0 0 0; font-size: 13px;">Enviado de forma segura desde tu portafolio <strong>emma-dev.com</strong></p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <div style="margin-bottom: 18px;">
            <strong style="color: #8c8c93; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 6px;">Nombre del Remitente</strong>
            <span style="font-size: 15px; font-weight: 600; color: #ffffff; background-color: #17171a; padding: 8px 12px; border-radius: 8px; display: inline-block; border: 1px solid #232329;">${name}</span>
          </div>
          
          <div style="margin-bottom: 18px;">
            <strong style="color: #8c8c93; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 6px;">Correo Electrónico</strong>
            <a href="mailto:${email}" style="font-size: 15px; color: #FF3E44; text-decoration: none; font-weight: 500; background-color: #17171a; padding: 8px 12px; border-radius: 8px; display: inline-block; border: 1px solid #232329;">${email}</a>
          </div>

          ${phone ? `
          <div style="margin-bottom: 18px;">
            <strong style="color: #8c8c93; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 6px;">Teléfono de Contacto</strong>
            <span style="font-size: 15px; color: #ffffff; background-color: #17171a; padding: 8px 12px; border-radius: 8px; display: inline-block; border: 1px solid #232329;">${phone}</span>
          </div>
          ` : ''}
          
          <div style="margin-top: 24px; padding: 20px; border-radius: 12px; background-color: #121215; border: 1px solid #1c1c20; box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);">
            <strong style="color: #8c8c93; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 12px; border-bottom: 1px solid #232329; padding-bottom: 6px;">Mensaje de Emmanuel</strong>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #ececed; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #1c1c20; font-size: 11px; color: #62626e;">
          <p style="margin: 0 0 4px 0;">Este correo fue procesado y enviado a través del API de Resend.</p>
          <p style="margin: 0;">Para responder a este mensaje, simplemente haz clic en <strong>Responder</strong> en tu gestor de correos.</p>
        </div>
      </div>
    `;

    // 5. Enviar correo usando fetch directo al API de Resend (sin dependencias extras)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Contacto Portafolio <info@emma-dev.com>',
        to: ['emmanuel.gaviria.25@gmail.com'],
        subject: `📬 Nuevo mensaje de ${name}`,
        reply_to: email,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[RESEND ERROR]', errorText);
      return res.status(response.status).json({ error: 'Resend API falló al enviar el correo.' });
    }

    const result = await response.json();
    return res.status(200).json({ success: true, id: result.id });
  } catch (error) {
    console.error('[API EXCEPTION]', error);
    return res.status(500).json({ error: 'Ocurrió un error interno en el servidor.' });
  }
}
