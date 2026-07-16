import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // ★静的エクスポートを有効化
  images: {
    unoptimized: true, // ★静的ビルドに必要なオプション
  },
};

export default nextConfig;


