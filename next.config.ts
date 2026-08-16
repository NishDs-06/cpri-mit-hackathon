/** @type {import('next').NextConfig} */
const nextConfig = {
  // No external image domains needed for this frontend-only build.
  // Add domains here when the backend serves profile images or assets.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
