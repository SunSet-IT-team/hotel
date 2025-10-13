/**
 * API для работы с отелями
 *
 * @module entities/hotel/api
 */

import { apiClient } from '@/shared/api';

import type { Hotel } from '../model/types';

import type { SearchHotelsParams, SearchHotelsResponse } from './types';

/**
 * API методы для работы с отелями
 */
export const hotelApi = {
    /**
     * Поиск отелей по параметрам
     *
     * @example
     * ```ts
     * const result = await hotelApi.searchHotels({
     *   destination: 'Москва',
     *   checkIn: '2025-10-20',
     *   checkOut: '2025-10-25',
     *   adults: 2,
     * });
     * ```
     */
    searchHotels: async (params: SearchHotelsParams): Promise<SearchHotelsResponse> => {
        // В production это будет реальный API endpoint
        // В development MSW может перехватить запрос и вернуть mock данные
        return apiClient.get<SearchHotelsResponse>('/api/hotels', params);
    },

    /**
     * Получить детали отеля по ID
     *
     * @example
     * ```ts
     * const hotel = await hotelApi.getHotelById('hotel-123');
     * ```
     */
    getHotelById: async (id: string): Promise<Hotel> => {
        return apiClient.get<Hotel>(`/api/hotels/${id}`);
    },

    /**
     * Получить похожие отели
     *
     * @example
     * ```ts
     * const similar = await hotelApi.getSimilarHotels('hotel-123', 5);
     * ```
     */
    getSimilarHotels: async (hotelId: string, limit = 5): Promise<Hotel[]> => {
        return apiClient.get<Hotel[]>(`/api/hotels/${hotelId}/similar`, { limit });
    },

    /**
     * Получить отзывы об отеле
     */
    getHotelReviews: async (hotelId: string, page = 1, pageSize = 10) => {
        return apiClient.get(`/api/hotels/${hotelId}/reviews`, { page, pageSize });
    },
};
