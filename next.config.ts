import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'pizzaloverstorage.blob.core.windows.net',
            pathname: '/pizzalovercontainer/media/**',
        },
    ],
},
};

export default nextConfig;
