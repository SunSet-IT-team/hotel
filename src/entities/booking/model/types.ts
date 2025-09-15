export interface Booking {
    id: string;
    location: string;
    dates: [Date, Date];
    guests: {
        adults: number;
        children: number;
    };
    price: number;
    status: 'pending' | 'confirmed' | 'cancelled';
}
