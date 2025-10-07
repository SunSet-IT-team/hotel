export interface PartnerOffersProps {
    /** Заголовок */
    title: string;
    /** Удобства */
    amenities: string[];
    /** Цена */
    price: number;
    /** Количество звезд */
    starRating: number;
    /** Изображение */
    image: string;
    /** Ссылка */
    link: string;
    /** Дополнительные CSS классы */
    className?: string;
}
