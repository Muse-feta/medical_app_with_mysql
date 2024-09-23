/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.dicebear.com"], // Add any other domains you need
    dangerouslyAllowSVG: true, // Enable SVG images (use cautiously)
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Optional: Secure handling of SVGs
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Other configurations...
};

export default nextConfig;
