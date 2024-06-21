/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random/**',
      },
      {
        protocol: 'https',
        hostname: 'flytop-minio.wzryfz.easypanel.host',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig;
