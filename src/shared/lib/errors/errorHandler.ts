/**
 * Обработка ошибок приложения
 *
 * @module shared/lib/errors
 */

import { ApiError } from '@/shared/api';

/**
 * Кастомная ошибка приложения
 */
export class AppError extends Error {
    constructor(
        message: string,
        public code?: string,
        public context?: Record<string, unknown>,
    ) {
        super(message);
        this.name = 'AppError';
    }
}

/**
 * Получить понятное пользователю сообщение об ошибке
 *
 * @param error - Ошибка
 * @param context - Контекст возникновения ошибки
 * @returns Сообщение для пользователя
 *
 * @example
 * ```ts
 * try {
 *   await someApiCall();
 * } catch (error) {
 *   const message = handleError(error, 'SearchForm.submit');
 *   toast.error(message);
 * }
 * ```
 */
export const handleError = (error: unknown, context?: string): string => {
    // Логируем в консоль для разработки
    if (process.env.NODE_ENV === 'development') {
        console.error(`[Error] ${context || 'Unknown'}:`, error);
    }

    // Обработка API ошибок
    if (error instanceof ApiError) {
        switch (error.status) {
            case 400:
                return 'Неверные параметры запроса';
            case 401:
                return 'Необходима авторизация';
            case 403:
                return 'Доступ запрещён';
            case 404:
                return 'Ресурс не найден';
            case 500:
                return 'Ошибка сервера. Попробуйте позже';
            case 503:
                return 'Сервис временно недоступен';
            default:
                return error.message || 'Произошла ошибка при запросе';
        }
    }

    // Обработка кастомных ошибок приложения
    if (error instanceof AppError) {
        // TODO: Отправить в Sentry/LogRocket
        if (error.code) {
            console.error(`[${error.code}]`, error.message, error.context);
        }
        return error.message;
    }

    // Неизвестная ошибка
    if (error instanceof Error) {
        return error.message;
    }

    // Совсем неизвестная ошибка
    return 'Произошла неожиданная ошибка';
};

/**
 * Проверить, является ли ошибка сетевой
 */
export const isNetworkError = (error: unknown): boolean => {
    if (error instanceof ApiError) {
        return error.status === 0;
    }
    return false;
};

/**
 * Проверить, является ли ошибка ошибкой сервера (5xx)
 */
export const isServerError = (error: unknown): boolean => {
    if (error instanceof ApiError) {
        return error.status >= 500 && error.status < 600;
    }
    return false;
};

/**
 * Проверить, является ли ошибка ошибкой клиента (4xx)
 */
export const isClientError = (error: unknown): boolean => {
    if (error instanceof ApiError) {
        return error.status >= 400 && error.status < 500;
    }
    return false;
};
