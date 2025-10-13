/**
 * Переменные окружения и конфигурация приложения
 */
export const ENV = {
    /** URL API */
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',

    /** Режим разработки */
    IS_DEV: process.env.NODE_ENV === 'development',

    /** Продакшн режим */
    IS_PROD: process.env.NODE_ENV === 'production',
} as const;
