/**
 * Маршруты приложения
 */
export const ROUTES = {
    /** Главная страница */
    HOME: '/',

    /** Страница поиска отелей */
    SEARCH: '/search/hotels',

    /** Страница отеля */
    HOTEL: (id: string) => `/hotel/${id}`,
} as const;
