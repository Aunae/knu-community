/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        basePath: false,
      },
    ];
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['img.icons8.com', `images.unsplash.com`],
  },
  // FIXME: React.StrictMode = false에서 로그인이 제대로 동작하지 않습니다.
  reactStrictMode: true,
};

module.exports = nextConfig;
