/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/gossip',
        destination: '/gossip/1',
        permanent: true,
      },
      {
        source: '/',
        destination: '/about',
        permanent: true,
      },
    ];
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vip.helloimg.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'gitee.com',
        port: '',
      },
    ],
    formats: ['image/webp'],
  },
};

export default nextConfig;
