import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions:{
      bodySizeLimit: '10mb'
    }
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
