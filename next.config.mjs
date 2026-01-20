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
    // unoptimized: true,
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
      },
    ],
    formats: ['image/webp'],
    unoptimized: true, // ⚠️ 生产环境记得关掉这个
  },
};

// export default MillionLint.next({ rsc: true })(nextConfig);
export default nextConfig;
