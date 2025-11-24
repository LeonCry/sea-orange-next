// import MillionLint from '@million/lint';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
      {
        protocol: 'https',
        hostname: 's2.loli.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
      }
    ],
    formats: ['image/webp'],
  },
};

// export default MillionLint.next({ rsc: true })(nextConfig);
export default nextConfig;
