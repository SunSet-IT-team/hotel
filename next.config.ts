import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
