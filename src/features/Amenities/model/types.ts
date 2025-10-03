import { type ReactNode } from 'react';

export interface AmenityItem {
    /** Название удобства */
    label: string;
    /** Иконка удобства */
    icon: ReactNode;
}

export interface AmenitiesProps {
    /** Массив удобств */
    amenities: AmenityItem[];
    /** Заголовок секции */
    title?: string;
    /** Дополнительные CSS классы */
    className?: string;
}
