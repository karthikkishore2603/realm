/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: { esmExternals: true },
    images: {
        domains: ['cdn.sanity.io'], // Add Sanity's CDN domain here
      },
    
};

export default nextConfig;
