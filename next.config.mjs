/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/home',
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        basePath: false,
      },
    ]
  },
}

export default nextConfig
