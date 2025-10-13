/**
 * Типы для работы с Hotel API
 *
 * @module entities/hotel/api
 */

import type { Hotel } from '../model/types';

/**
 * Параметры поиска отелей
 */
export interface SearchHotelsParams {
    /** Направление поиска (город, страна) */
    destination?: string;

    /** ID направления */
    destinationId?: number;

    /** Дата заезда (ISO string) */
    checkIn?: string;

    /** Дата выезда (ISO string) */
    checkOut?: string;

    /** Количество взрослых */
    adults?: number;

    /** Количество детей */
    children?: number;

    /** Минимальная цена */
    minPrice?: number;

    /** Максимальная цена */
    maxPrice?: number;

    /** Рейтинг по звёздам */
    starRating?: number[];

    /** Удобства (amenities) */
    amenities?: string[];

    /** Минимальный рейтинг отзывов */
    minReviewRating?: number;

    /** Сортировка */
    sortBy?: 'price' | 'rating' | 'distance';

    /** Порядок сортировки */
    sortOrder?: 'asc' | 'desc';

    /** Номер страницы */
    page?: number;

    /** Количество результатов на странице */
    pageSize?: number;

    /** Индексная сигнатура для совместимости с Record */
    [key: string]: string | number | boolean | string[] | number[] | undefined;
}

/**
 * Ответ от API со списком отелей
 */
export interface SearchHotelsResponse {
    /** Список отелей */
    hotels: Hotel[];

    /** Общее количество результатов */
    total: number;

    /** Текущая страница */
    page: number;

    /** Размер страницы */
    pageSize: number;

    /** Есть ли следующая страница */
    hasMore: boolean;
}

/**
 * Параметры для получения похожих отелей
 */
export interface GetSimilarHotelsParams {
    /** ID отеля */
    hotelId: string;

    /** Максимальное количество результатов */
    limit?: number;
}
