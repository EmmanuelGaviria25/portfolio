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
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px; background-color: #0c0c0e; border: 1px solid #1c1c20; color: #ececed;">
            <h2 style="color: #ffffff; text-align: center;">¡Nuevo mensaje desde local (Emma Dev)!</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Correo:</strong> ${email}</p>
            ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
            <div style="margin-top: 20px; padding: 15px; border-radius: 8px; background-color: #121215; border: 1px solid #1c1c20;">
              <p style="margin: 0;"><strong>Mensaje:</strong></p>
              <p style="white-space: pre-wrap; margin-top: 10px;">${message}</p>
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
