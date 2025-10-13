/**
 * HTTP клиент для работы с API
 *
 * @module shared/api/base
 */

interface RequestConfig extends RequestInit {
    params?: Record<string, string | number | boolean>;
}

/**
 * Ошибка API запроса
 */
export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public data?: unknown,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * HTTP клиент для работы с API
 */
class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    /**
     * Выполнить HTTP запрос
     */
    private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
        const { params, ...init } = config;

        let url = `${this.baseURL}${endpoint}`;

        // Добавляем query параметры
        if (params) {
            const searchParams = new URLSearchParams(
                Object.entries(params).map(([k, v]) => [k, String(v)]),
            );
            url += `?${searchParams.toString()}`;
        }

        try {
            const response = await fetch(url, {
                ...init,
                headers: {
                    'Content-Type': 'application/json',
                    ...init.headers,
                },
            });

            // Обработка ошибок HTTP
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new ApiError(
                    response.status,
                    errorData?.message || response.statusText,
                    errorData,
                );
            }

            return response.json();
        } catch (error) {
            // Преобразуем сетевые ошибки в ApiError
            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError(0, error instanceof Error ? error.message : 'Network error', error);
        }
    }

    /**
     * GET запрос
     */
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET', params });
    }

    /**
     * POST запрос
     */
    async post<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    /**
     * PUT запрос
     */
    async put<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    /**
     * PATCH запрос
     */
    async patch<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    /**
     * DELETE запрос
     */
    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

/**
 * Экземпляр API клиента
 * В production должен использовать ENV.API_URL
 */
export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000');
