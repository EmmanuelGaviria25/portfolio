/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    distDir: 'dist',
    env: {
        TEMPLATE_ID : process.env.TEMPLATE_ID,
        SERVICE_ID : process.env.SERVICE_ID,
        PUBLIC_KEY : process.env.PUBLIC_KEY,
    }
}

module.exports = nextConfig
