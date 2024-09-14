/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.dicebear.com"], // Add any other domains you need
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
  // Other configurations...
};

export default nextConfig;
