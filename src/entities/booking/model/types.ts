/**
 * Количество гостей для бронирования
 */
export interface GuestsCount {
    /** Количество взрослых (от 1) */
    adults: number;
    /** Количество детей (от 0) */
    children: number;
}

/**
 * Бронирование отеля
 */
export interface Booking {
    id: string;
    location: string;
    dates: [Date, Date];
    guests: GuestsCount;
    price: number;
    status: 'pending' | 'confirmed' | 'cancelled';
}
