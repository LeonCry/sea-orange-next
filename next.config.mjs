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
    domains: ['vip.helloimg.com'],
  },
};

export default nextConfig;
