import { type Hotel } from '@/entities/hotel';

/**
 * Пропсы для компонента HotelCard
 */
export interface HotelCardProps {
    /** Данные отеля */
    hotel: Hotel;
    /** Дополнительные CSS классы */
    className?: string;
    /** Callback при клике на карточку */
    onClick?: (hotelId: string) => void;
}
