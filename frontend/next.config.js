/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Environment variables to expose to the client
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    },
};

module.exports = nextConfig;
