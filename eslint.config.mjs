// Flat config for ESLint v9
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

export default [
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

            // Чистим мусор
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

    // Storybook (ограничим только сторис и .storybook)
    ...storybook.configs['flat/recommended'].map((cfg) => ({
        ...cfg,
        files: ['**/*.stories.@(js|jsx|ts|tsx|mdx)', '.storybook/**/*'],
    })),

    // Конфиги/скрипты для Node (next.config.*, postcss.config.* и т.п.)
    {
        files: [
            '**/*.config.{js,cjs,mjs,ts}',
            'scripts/**/*.{js,ts}',
            '.*rc.{js,cjs,mjs,ts}',
            'eslint.config.{js,mjs,ts}',
        ],
        languageOptions: {
            // облегчённые node-глобалы
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
            // обычно консоль в конфиге ок
            'no-console': 'off',
        },
    },

    // Должен быть ПОСЛЕДНИМ: вырубает конфликтующие с Prettier правила
    eslintConfigPrettier,
];
