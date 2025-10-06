export interface HotelDescriptionItem {
    subtitle?: string;
    subtext: string;
}

export interface HotelDescriptionProps {
    /** Заголовок секции */
    title: string;
    /** Описание отеля */
    description: HotelDescriptionItem[];

    /** Дополнительные CSS классы */
    className?: string;
}
