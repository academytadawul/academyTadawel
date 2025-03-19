/** @type {import('next').NextConfig} */
const nextConfig = {
  /* reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  }, */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.toursofrome.info", // Change this to your image host
      },
    ],
  },
};

export default nextConfig;
