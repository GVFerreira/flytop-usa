/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
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
