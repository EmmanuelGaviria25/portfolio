const { spawn } = require('child_process');
const path = require('path');

console.log('⚡ [Entorno Dev] Iniciando frontend y backend local de contacto...');

// 1. Iniciar el servidor de API local
const apiServer = spawn('node', [path.join(__dirname, 'local-api.js')], {
  stdio: 'inherit',
  shell: true
});

// 2. Iniciar el servidor de desarrollo de Next.js
const nextDev = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Manejo de finalización limpia de procesos
nextDev.on('close', (code) => {
  apiServer.kill();
  process.exit(code);
});

apiServer.on('close', (code) => {
  nextDev.kill();
  process.exit(code);
});

process.on('SIGINT', () => {
  nextDev.kill();
  apiServer.kill();
  process.exit(0);
});
