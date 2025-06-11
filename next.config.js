/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    env: {
        TEMPLATE_ID : process.env.TEMPLATE_ID,
        SERVICE_ID : process.env.SERVICE_ID,
        PUBLIC_KEY : process.env.PUBLIC_KEY,
    },
    basePath: isProd ? '/portfolio' : '',
    assetPrefix: isProd ? '/portfolio/' : '',
}

module.exports = nextConfig
