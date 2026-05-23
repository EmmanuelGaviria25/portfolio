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

    // 4. Plantilla HTML premium Tema Oscuro para recibir el correo (consistente con la marca)
    const emailHtml = `
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
      <div style="background-color: #0E0E11; padding: 40px 12px; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; border-radius: 24px; background-color: #1A1A1E; border: 1px solid rgba(255, 62, 68, 0.12); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5); overflow: hidden;">
          
          <!-- Línea decorativa superior con degradado de marca -->
          <div style="height: 6px; background: linear-gradient(90deg, #915eff 0%, #FF3E44 50%, #5A181C 100%);"></div>
          
          <div style="padding: 44px 36px 36px 36px;">
            
            <!-- Encabezado con Logotipo Corporativo y Badge Premium -->
            <div style="text-align: center; margin-bottom: 32px; padding-bottom: 28px; border-bottom: 1px solid rgba(255, 62, 68, 0.12);">
              <div style="margin-bottom: 20px;">
                <img src="https://www.emma-dev.com/logo.png" alt="Emmanuel Gaviria" style="height: 50px; max-width: 260px; object-fit: contain; outline: none; border: none; filter: drop-shadow(0 4px 12px rgba(255, 62, 68, 0.2));" />
              </div>
              <div style="display: inline-block; padding: 6px 14px; border-radius: 99px; background: rgba(255, 62, 68, 0.12); border: 1px solid rgba(255, 62, 68, 0.25); color: #FF3E44; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;">
                📥 NUEVO MENSAJE DE CONTACTO
              </div>
              <p style="color: #AEAEB2; margin: 0; font-size: 14px; font-weight: 500; letter-spacing: -0.01em;">
                Recibido de forma segura desde tu portafolio <a href="https://www.emma-dev.com" style="color: #FF3E44; text-decoration: none; font-weight: 700;">emma-dev.com</a>
              </p>
            </div>
            
            <!-- Contenido y Metadatos -->
            <div style="margin-bottom: 36px;">
              
              <!-- Tarjeta: Nombre -->
              <table style="width: 100%; border-collapse: collapse; background-color: #121215; border: 1px solid rgba(255, 62, 68, 0.15); border-left: 4px solid #FF3E44; border-radius: 12px; margin-bottom: 16px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="width: 40px; vertical-align: middle;">
                          <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(255, 62, 68, 0.12); text-align: center; line-height: 32px;">
                            <span style="font-size: 14px;">👤</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: middle;">
                          <span style="color: #FF3E44; font-size: 9px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 2px;">REMITENTE</span>
                          <span style="font-size: 15px; font-weight: 700; color: #FFFFFF;">${name}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Tarjeta: Correo -->
              <table style="width: 100%; border-collapse: collapse; background-color: #121215; border: 1px solid rgba(255, 62, 68, 0.15); border-left: 4px solid #FF3E44; border-radius: 12px; margin-bottom: ${phone ? '16px' : '24px'};">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="width: 40px; vertical-align: middle;">
                          <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(255, 62, 68, 0.12); text-align: center; line-height: 32px;">
                            <span style="font-size: 14px;">✉️</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: middle;">
                          <span style="color: #FF3E44; font-size: 9px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 2px;">CORREO ELECTRÓNICO</span>
                          <a href="mailto:${email}" style="font-size: 15px; font-weight: 700; color: #FFFFFF; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${phone ? `
              <!-- Tarjeta: Teléfono -->
              <table style="width: 100%; border-collapse: collapse; background-color: #121215; border: 1px solid rgba(255, 62, 68, 0.15); border-left: 4px solid #FF3E44; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="width: 40px; vertical-align: middle;">
                          <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(255, 62, 68, 0.12); text-align: center; line-height: 32px;">
                            <span style="font-size: 14px;">📞</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: middle;">
                          <span style="color: #FF3E44; font-size: 9px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 2px;">TELÉFONO DE CONTACTO</span>
                          <span style="font-size: 15px; font-weight: 700; color: #FFFFFF;">${phone}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              ` : ''}
              
              <!-- Bloque de Mensaje con Estructura de Terminal Obsidian -->
              <div style="background-color: #121215; border: 1px solid rgba(255, 62, 68, 0.2); border-radius: 12px; padding: 24px; box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);">
                <!-- Terminal Header Decorator -->
                <div style="margin-bottom: 16px; border-bottom: 1px solid rgba(255, 62, 68, 0.15); padding-bottom: 10px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="width: 50px;">
                        <span style="color: #FF5F56; font-size: 12px; letter-spacing: 2px; line-height: 1;">●</span>
                        <span style="color: #FFBD2E; font-size: 12px; letter-spacing: 2px; line-height: 1;">●</span>
                        <span style="color: #27C93F; font-size: 12px; letter-spacing: 2px; line-height: 1;">●</span>
                      </td>
                      <td style="text-align: right;">
                        <span style="color: #AEAEB2; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">MESSAGE_STREAM // INPUT</span>
                      </td>
                    </tr>
                  </table>
                </div>
                <div style="font-size: 15px; line-height: 1.7; color: #E2E8F0; white-space: pre-wrap; font-weight: 400; word-break: break-word;">${message}</div>
              </div>
              
              <!-- Botón de Respuesta Rápida (Reply CTA) -->
              <div style="text-align: center; margin-top: 36px;">
                <a href="mailto:${email}?subject=Re: Mensaje de contacto - Emma Dev" style="display: inline-block; padding: 16px 36px; font-size: 14px; font-weight: 700; color: #FFFFFF !important; text-decoration: none; border-radius: 12px; background: linear-gradient(135deg, #FF3E44 0%, #5A181C 100%); box-shadow: 0 8px 24px rgba(255, 62, 68, 0.3); border: 1px solid rgba(255, 62, 68, 0.35); text-align: center; transition: all 0.2s ease;">
                  💬 Responder Directamente
                </a>
              </div>
              
            </div>
            
            <!-- Pie de página elegante -->
            <div style="text-align: center; border-top: 1px solid rgba(255, 62, 68, 0.12); padding-top: 28px; font-size: 12px; color: #8E8E93; line-height: 1.6;">
              <p style="margin: 0 0 8px 0;">Este correo fue procesado y despachado de forma segura mediante la API de Resend.</p>
              <p style="margin: 0; font-weight: 500; color: #8E8E93;">💡 <strong style="color: #FF3E44;">Tip:</strong> Puedes hacer clic en el botón de arriba o responder directamente a este correo para escribirle de vuelta.</p>
            </div>
            
          </div>
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
