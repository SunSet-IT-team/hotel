export interface HotelInfoProps {
    /** Название отеля */
    hotelName: string;
    /** Количество звезд (рейтинг) */
    starRating: number;
    /** Адрес отеля */
    address: string;
    /** Вариант отображения компонента */
    variant?: 'default' | 'detailed';
    /** Рейтинг отеля (только для detailed варианта) */
    rating?: number;
    /** Количество отзывов */
    reviewCount?: number;
    /** Опциональные удобства */
    amenities?: string[];
    /** Опциональная ссылка на отзывы (можете пригодиться в будущем)*/
    reviewsLink?: string;
    /** Дополнительные CSS классы */
    className?: string;
}
