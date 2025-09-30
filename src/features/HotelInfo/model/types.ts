export interface HotelInfoProps {
    /** Название отеля */
    hotelName: string;
    /** Количество звезд (рейтинг) */
    starRating: number;
    /** Адрес отеля */
    address: string;
    /** Вариант отображения компонента */
    variant?: 'default' | 'detailed';
    /** Опциональная ссылка на карту */
    mapLink?: string;
    /** Рейтинг отеля (только для detailed варианта) */
    rating?: number;
    /** Количество отзывов */
    reviewCount?: number;
    /** Опциональные удобства */
    amenities?: string[];
    /** Опциональная ссылка на отзывы */
    reviewsLink?: string;
    /** Дополнительные CSS классы */
    className?: string;
}
