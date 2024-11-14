/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/uploads/:path*', // Redireciona para a rota API
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flytop-minio.wzryfz.easypanel.host',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flytop-travels-minio.hnbkcj.easypanel.host',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

export default nextConfig;
