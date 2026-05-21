const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// 1. Cargar las variables de entorno locales de .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

const server = http.createServer((req, res) => {
  // Configurar cabeceras CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.url === '/api/send' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { name, email, phone, message, website_hp, submit_time } = JSON.parse(body);

        // 1. Control de Spam: Honeypot
        if (website_hp) {
          console.log('⚡ [API Local] [SPAM DETECTADO] Honeypot completado.');
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, message: 'Envío completado exitosamente.' }));
          return;
        }

        // 2. Control de Spam: Timing Check
        if (submit_time) {
          const timeDiff = Date.now() - Number(submit_time);
          if (timeDiff < 2000) {
            console.log(`⚡ [API Local] [SPAM DETECTADO] Timing check fallido (${timeDiff}ms).`);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Envío completado exitosamente.' }));
            return;
          }
        }

        // 3. Validación
        if (!name || !email || !message) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Por favor, completa todos los campos obligatorios.' }));
          return;
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
          console.error('⚡ [API Local] [ERROR] Clave RESEND_API_KEY no definida en .env.local.');
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'La API Key de Resend no está configurada localmente en .env.local.' }));
          return;
        }

        // 4. Preparar email html
        const emailHtml = `
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
      <div style="background-color: #050507; padding: 40px 12px; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 2px; border-radius: 24px; background: linear-gradient(135deg, #5A181C 0%, #FF3E44 50%, #170507 100%); box-shadow: 0 20px 45px rgba(255, 62, 68, 0.12);">
          <div style="background-color: #0B0B0F; padding: 44px 36px; border-radius: 22px; color: #E2E8F0; border: 1px solid rgba(255, 255, 255, 0.02);">
            
            <!-- Encabezado con efecto neón suave -->
            <div style="text-align: center; margin-bottom: 36px; padding-bottom: 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
              <div style="display: inline-block; padding: 14px; border-radius: 20px; background: rgba(255, 62, 68, 0.06); border: 1px solid rgba(255, 62, 68, 0.25); color: #FF3E44; margin-bottom: 20px; box-shadow: 0 0 25px rgba(255, 62, 68, 0.15);">
                <span style="font-size: 32px; display: block; line-height: 1;">📬</span>
              </div>
              <h2 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.03em; text-shadow: 0 2px 8px rgba(0,0,0,0.6);">¡Nuevo Mensaje de Contacto!</h2>
              <p style="color: #94A3B8; margin: 10px 0 0 0; font-size: 14px; font-weight: 500; letter-spacing: -0.01em;">
                Recibido de forma segura desde tu portafolio <strong style="color: #FF3E44;">emma-dev.com (Desarrollo Local)</strong>
              </p>
            </div>
            
            <!-- Contenido y Metadatos -->
            <div style="margin-bottom: 36px;">
              
              <!-- Tarjeta: Nombre -->
              <table style="width: 100%; border-collapse: collapse; background-color: #111116; border: 1px solid rgba(255, 62, 68, 0.08); border-radius: 16px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="width: 40px; vertical-align: middle;">
                          <div style="width: 32px; height: 32px; border-radius: 10px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); text-align: center; line-height: 32px;">
                            <span style="font-size: 14px;">👤</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: middle;">
                          <span style="color: #FF3E44; font-size: 9px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 2px;">REMITENTE</span>
                          <span style="font-size: 15px; font-weight: 600; color: #ffffff;">${name}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Tarjeta: Correo -->
              <table style="width: 100%; border-collapse: collapse; background-color: #111116; border: 1px solid rgba(255, 62, 68, 0.08); border-radius: 16px; margin-bottom: ${phone ? '16px' : '24px'}; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="width: 40px; vertical-align: middle;">
                          <div style="width: 32px; height: 32px; border-radius: 10px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); text-align: center; line-height: 32px;">
                            <span style="font-size: 14px;">✉️</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: middle;">
                          <span style="color: #FF3E44; font-size: 9px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 2px;">CORREO ELECTRÓNICO</span>
                          <a href="mailto:${email}" style="font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${phone ? `
              <!-- Tarjeta: Teléfono -->
              <table style="width: 100%; border-collapse: collapse; background-color: #111116; border: 1px solid rgba(255, 62, 68, 0.08); border-radius: 16px; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="width: 40px; vertical-align: middle;">
                          <div style="width: 32px; height: 32px; border-radius: 10px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); text-align: center; line-height: 32px;">
                            <span style="font-size: 14px;">📞</span>
                          </div>
                        </td>
                        <td style="padding-left: 12px; vertical-align: middle;">
                          <span style="color: #FF3E44; font-size: 9px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 2px;">TELÉFONO DE CONTACTO</span>
                          <span style="font-size: 15px; font-weight: 600; color: #ffffff;">${phone}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              ` : ''}
              
              <!-- Bloque de Mensaje con Estructura de Terminal Obsidian -->
              <div style="background-color: #131318; border: 1px solid rgba(255, 255, 255, 0.03); border-left: 4px solid #FF3E44; border-radius: 4px 16px 16px 4px; padding: 24px; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
                <!-- Terminal Header Decorator -->
                <div style="margin-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 10px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="width: 50px;">
                        <span style="color: #FF3E44; font-size: 12px; letter-spacing: 2px; line-height: 1;">●</span>
                        <span style="color: #FBBF24; font-size: 12px; letter-spacing: 2px; line-height: 1;">●</span>
                        <span style="color: #34D399; font-size: 12px; letter-spacing: 2px; line-height: 1;">●</span>
                      </td>
                      <td style="text-align: right;">
                        <span style="color: #64748B; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">MESSAGE_STREAM // INPUT</span>
                      </td>
                    </tr>
                  </table>
                </div>
                <div style="font-size: 15px; line-height: 1.7; color: #ececed; white-space: pre-wrap; font-weight: 400; word-break: break-word;">${message}</div>
              </div>
              
              <!-- Botón de Respuesta Rápida (Reply CTA) -->
              <div style="text-align: center; margin-top: 36px;">
                <a href="mailto:${email}?subject=Re: Mensaje de contacto - Emma Dev" style="display: inline-block; padding: 16px 36px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 14px; background: linear-gradient(135deg, #FF3E44 0%, #8A1A1E 100%); box-shadow: 0 10px 25px rgba(255, 62, 68, 0.25); border: 1px solid rgba(255, 62, 68, 0.3); text-align: center; transition: all 0.2s ease;">
                  💬 Responder Directamente
                </a>
              </div>
              
            </div>
            
            <!-- Pie de página elegante -->
            <div style="text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 28px; font-size: 12px; color: #64748B; line-height: 1.6;">
              <p style="margin: 0 0 8px 0;">Este correo fue procesado y despachado de forma segura mediante la API de Resend.</p>
              <p style="margin: 0; font-weight: 500; color: #94A3B8;">💡 <strong>Tip:</strong> Puedes hacer clic en el botón de arriba o responder directamente a este correo para escribirle de vuelta.</p>
            </div>
            
          </div>
        </div>
      </div>
    `;

        // 5. Llamada HTTP a Resend API usando módulo HTTPS nativo de Node.js con auto-reintento para sandbox
        const sendEmail = (recipient, isRetry = false) => {
          const resendPayload = JSON.stringify({
            from: 'onboarding@resend.dev',
            to: recipient,
            subject: `Contacto Local: ${name}`,
            html: emailHtml,
            reply_to: email
          });

          const options = {
            hostname: 'api.resend.com',
            path: '/emails',
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(resendPayload)
            }
          };

          const postReq = https.request(options, (postRes) => {
            let resData = '';
            postRes.on('data', d => {
              resData += d.toString();
            });
            postRes.on('end', () => {
              if (postRes.statusCode >= 200 && postRes.statusCode < 300) {
                console.log(`⚡ [API Local] ¡Correo enviado con éxito a ${recipient} a través de Resend!`);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: 'Mensaje enviado correctamente.' }));
              } else {
                // Si falla por restricción de sandbox y no es un reintento, intentamos enviar al correo del propietario
                if (postRes.statusCode === 403 && !isRetry) {
                  try {
                    const parsedError = JSON.parse(resData);
                    if (parsedError.message && parsedError.message.includes('krantalopez@gmail.com')) {
                      console.log('⚠️ [API Local] Detectado entorno sandbox de Resend. Reintentando envío automático al propietario de la cuenta (krantalopez@gmail.com)...');
                      sendEmail('krantalopez@gmail.com', true);
                      return;
                    }
                  } catch (e) {
                    if (resData.includes('krantalopez@gmail.com')) {
                      console.log('⚠️ [API Local] Detectado entorno sandbox de Resend. Reintentando envío automático al propietario de la cuenta (krantalopez@gmail.com)...');
                      sendEmail('krantalopez@gmail.com', true);
                      return;
                    }
                  }
                }

                console.error('⚡ [API Local] Error de Resend API:', resData);
                res.statusCode = postRes.statusCode;
                res.setHeader('Content-Type', 'application/json');
                res.end(resData);
              }
            });
          });

          postReq.on('error', (err) => {
            console.error('⚡ [API Local] Error de conexión con Resend:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Error de conexión con Resend API.' }));
          });

          postReq.write(resendPayload);
          postReq.end();
        };

        sendEmail('emmanuel.gaviria.25@gmail.com');

      } catch (err) {
        console.error('⚡ [API Local] Error procesando la petición:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Error interno del servidor local.' }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`⚡ [API Local] Servidor API local corriendo en http://localhost:${PORT}`);
});
