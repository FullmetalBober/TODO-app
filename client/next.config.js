/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'production'
            ? 'https://todo-server-kwhi.onrender.com/:path*'
            : 'http://localhost:8000/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
