import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import storybook from 'eslint-plugin-storybook';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

// Конфиги для Storybook stories
const storybookForStories = storybook.configs['flat/recommended'].map((config) => ({
    ...config,
    files: ['**/*.stories.@(js|jsx|ts|tsx|mdx)'],
}));

// Конфиги для папки .storybook
const storybookForConfigs = {
    files: ['.storybook/**/*.{js,ts,tsx,mjs,cjs}'],
    plugins: { storybook },
    rules: {
        'storybook/story-exports': 'off',
        'storybook/no-uninstalled-addons': 'off',
    },
};

const config = [
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'build/**',
            'dist/**',
            'next-env.d.ts',
            'public/**/*.min.*',
            '*.d.ts',
        ],
    },

    // Базовые конфиги
    ...compat.extends('next/core-web-vitals', 'next/typescript'),

    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/await-thenable': 'warn',
        },
    },

    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        rules: {
            'import/no-restricted-paths': [
                'error',
                {
                    zones: [
                        {
                            target: 'src/pages/**',
                            from: 'src/app/**',
                            message:
                                'Выбери один подход: либо App Router, либо Pages Router. Не смешивай!',
                        },
                        {
                            target: 'src/features/**',
                            from: 'src/widgets/**',
                            message:
                                'Features не должны знать о Widgets. Передавай данные через props или контекст',
                        },

                        // 3. Entities НЕ должны знать о других слоях
                        {
                            target: 'src/entities/**',
                            from: 'src/pages/**',
                            message: 'Entities не должны знать о Pages',
                        },
                        {
                            target: 'src/entities/**',
                            from: 'src/widgets/**',
                            message: 'Entities не должны знать о Widgets',
                        },
                        {
                            target: 'src/entities/**',
                            from: 'src/features/**',
                            message: 'Entities не должны знать о Features',
                        },

                        // 4. Shared НЕ должен знать о бизнес-слоях
                        {
                            target: 'src/shared/**',
                            from: 'src/pages/**',
                            message: 'Shared не должен знать о Pages',
                        },
                        {
                            target: 'src/shared/**',
                            from: 'src/widgets/**',
                            message: 'Shared не должен знать о Widgets',
                        },
                        {
                            target: 'src/shared/**',
                            from: 'src/features/**',
                            message: 'Shared не должен знать о Features',
                        },
                        {
                            target: 'src/shared/**',
                            from: 'src/entities/**',
                            message: 'Shared не должен знать о Entities',
                        },
                    ],
                },
            ],
        },
    },

    // Общие правила для JavaScript и TypeScript файлов
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            import: importPlugin,
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
            'jsx-a11y': jsxA11y,
            react,
            'react-hooks': reactHooks,
        },
        rules: {
            'no-console': [
                'warn',
                {
                    allow: ['warn', 'error', 'info'],
                },
            ],
            'no-debugger': 'error',
            'no-alert': 'error',

            'import/no-default-export': 'off',
            'import/prefer-default-export': 'off',
            'import/no-duplicates': 'error',
            'import/no-cycle': 'error',
            'import/no-self-import': 'error',
            'import/no-useless-path-segments': 'error',
            'import/no-relative-packages': 'error',

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

            // Сортировка импортов с FSD-группами
            'import/order': 'off',
            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        // React и сторонние библиотеки
                        ['^react', '^@?\\w'],
                        // FSD слои (в порядке зависимости)
                        ['^src/app'],
                        ['^src/pages'],
                        ['^src/widgets'],
                        ['^src/features'],
                        ['^src/entities'],
                        ['^src/shared'],
                        // Абсолютные импорты
                        ['^(@|~)(/.*|$)'],
                        // Родительские импорты
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        // Текущая директория
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        // Стили
                        ['^.+\\.(css|scss)$'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'warn',

            'react/react-in-jsx-scope': 'off',
            'react/jsx-filename-extension': [
                'error',
                {
                    extensions: ['.tsx', '.jsx'],
                },
            ],
            'react/jsx-props-no-spreading': 'off',
            'react/require-default-props': 'off',
            'react/function-component-definition': [
                'warn',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],
            'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
            'react/jsx-key': 'error',
            'react/no-array-index-key': 'warn',
            'react/no-danger': 'error',
            'react/self-closing-comp': 'warn',
            'react/destructuring-assignment': ['warn', 'always'],

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            'jsx-a11y/alt-text': 'error',
            'jsx-a11y/anchor-is-valid': 'error',
            'jsx-a11y/label-has-associated-control': 'error',

            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            // Отключение any type проверки
            // '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/consistent-type-imports': [
                'warn',
                {
                    prefer: 'type-imports',
                    fixStyle: 'inline-type-imports',
                },
            ],
            '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
            '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],

            'prefer-const': 'error',
            'no-var': 'error',
            'object-shorthand': 'warn',
            'prefer-template': 'warn',
            'prefer-arrow-callback': 'warn',
            'no-else-return': 'warn',
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
        },
    },

    // Public API правила
    {
        files: ['src/**/index.{js,jsx,ts,tsx}'],
        rules: {
            'import/export': 'error',
            'import/no-default-export': 'off',
        },
    },

    // Конфиги для Storybook
    ...storybookForStories,
    storybookForConfigs,

    // Правила для конфигурационных файлов и скриптов
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
            'import/no-extraneous-dependencies': 'off',
            'import/no-restricted-paths': 'off', // Отключаем FSD правила для конфигов

            // Отключаем TypeScript правила для конфигов
            '@typescript-eslint/no-unnecessary-type-assertion': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/await-thenable': 'off',
        },
    },

    // Prettier конфиг (должен быть последним)
    eslintConfigPrettier,
];

export default config;
