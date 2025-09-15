import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import storybook from 'eslint-plugin-storybook';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const storybookForStories = storybook.configs['flat/recommended'].map((cfg) => ({
    ...cfg,
    files: ['**/*.stories.@(js|jsx|ts|tsx|mdx)'],
}));

// Конфиги Storybook
const storybookForConfigs = {
    files: ['.storybook/**/*.{js,ts,tsx,mjs,cjs}'],
    plugins: { storybook },
    rules: {
        'storybook/story-exports': 'off',
        'storybook/no-uninstalled-addons': 'off',
    },
};

const config = [
    // Игноры общие
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'dist/**',
            'coverage/**',
            '.turbo/**',
            '.vercel/**',
            'next-env.d.ts',
            'public/**/*.min.*',
        ],
    },

    // База из Next (web-vitals + typescript)
    ...compat.extends('next/core-web-vitals', 'next/typescript'),

    // Общие правила для JS/TS
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            import: importPlugin,
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
        },
        rules: {
            'no-console': ['warn', { allow: ['warn', 'error'] }],

            // Оставляем только unused-imports, отключаем дубликат из @typescript-eslint
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],

            // Красиво сортируем импорты
            'import/order': 'off',
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',
        },
    },
    ...storybookForStories,
    storybookForConfigs,

    {
        files: [
            '**/*.config.{js,cjs,mjs,ts}',
            'scripts/**/*.{js,ts}',
            '.*rc.{js,cjs,mjs,ts}',
            'eslint.config.{js,mjs,ts}',
        ],
        languageOptions: {
            globals: {
                process: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                require: 'readonly',
            },
            sourceType: 'module',
        },
        rules: {
            'no-console': 'off',
        },
    },
    eslintConfigPrettier,
];

export default config;
