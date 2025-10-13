/**
 * Информация о цене от партнера
 */
export interface HotelPrice {
    /** Цена */
    price: number;
    /** Название сайта-партнера */
    website: string;
}

/**
 * Тип для отзыва
 */
export interface HotelReview {
    /** Имя автора отзыва */
    authorName: string;
    /** Рейтинг отзыва (от 1 до 10) */
    rating: number;
    /** Текст отзыва */
    text: string;
    /** Дата отзыва */
    date: string;
}

/**
 * Тип для отеля
 */
export interface Hotel {
    /** Уникальный идентификатор отеля */
    id: string;
    /** Название отеля */
    name: string;
    /** Количество звезд */
    starRating: number;
    /** Адрес отеля */
    address: string;
    /** Рейтинг отеля (от 0 до 10) */
    rating?: number;
    /** Количество отзывов */
    reviewCount?: number;
    /** Удобства */
    amenities?: string[];
    /** Дополнительные изображения для слайдера */
    images: string[];
    /** Цены от разных партнеров */
    prices: HotelPrice[];
    /** Описание отеля */
    description?: string;
    /** Расстояние от центра (в км) */
    distanceFromCenter?: number;
    /** Отзывы об отеле */
    reviews?: HotelReview[];
}
