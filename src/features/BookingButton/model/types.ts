export interface BookingButtonProps {
    /** ID отеля для бронирования */
    hotelId: string;
    /** Дополнительные CSS классы */
    className?: string;
    /** Callback при клике на кнопку бронирования */
    onBooking?: (hotelId: string) => void;
}
