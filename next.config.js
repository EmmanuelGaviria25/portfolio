/** @type {import('next').NextConfig} */

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true' || !!process.env.VERCEL;
const isStaticExportBuild = !isVercel && process.env.NODE_ENV === 'production';

const nextConfig = {
    images: {
        unoptimized: true,
    },
    reactStrictMode: true,
    env: {
        TEMPLATE_ID : process.env.TEMPLATE_ID,
        SERVICE_ID : process.env.SERVICE_ID,
        PUBLIC_KEY : process.env.PUBLIC_KEY,
    }
}

// Configurar de manera mutuamente excluyente la exportación estática de producción y las rewrites locales de desarrollo
if (isStaticExportBuild) {
    nextConfig.output = 'export';
    nextConfig.distDir = 'dist';
} else {
    nextConfig.rewrites = async function() {
        return [
            {
                source: '/api/send',
                destination: 'http://localhost:3001/api/send',
            },
        ];
    };
}

module.exports = nextConfig
