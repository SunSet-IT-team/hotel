import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-onboarding',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    staticDirs: ['../public'],
    webpackFinal: async (config) => {
        const imageRule = config.module?.rules?.find(
            (
                rule,
            ): rule is NonNullable<typeof rule> & { test: RegExp; exclude?: RegExp | string } =>
                rule !== null &&
                typeof rule === 'object' &&
                'test' in rule &&
                rule.test instanceof RegExp &&
                rule.test.test('.svg'),
        );

        if (imageRule) {
            imageRule.exclude = /\.svg$/;
        }

        config.module?.rules?.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

export default config;
