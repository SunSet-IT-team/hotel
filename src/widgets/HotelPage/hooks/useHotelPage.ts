import { useMemo } from 'react';

import { type Hotel, mockHotels } from '@/entities/hotel';
import { AmenitiesIcon } from '@/shared/assets/icons';

/**
 * Хук для получения данных отеля
 */
export const useHotelData = (hotelId: string) => {
    return useMemo(() => {
        return mockHotels.find((h) => h.id === hotelId) || mockHotels[0];
    }, [hotelId]);
};

/**
 * Хук для преобразования удобств
 */
export const useAmenitiesWithIcons = (amenities?: string[]) => {
    return useMemo(() => {
        return (amenities || []).map((amenity) => ({
            label: amenity,
            icon: AmenitiesIcon,
        }));
    }, [amenities]);
};

/**
 * Хук для создания элементов описания
 */
export const useDescriptionItems = (text?: string) => {
    return useMemo(() => {
        if (!text) return [];
        return [{ subtext: text }];
    }, [text]);
};

/**
 * Хук для преобразования данных отеля в предложения партнёров
 */
export const usePartnerOffers = (hotel: Hotel) => {
    return useMemo(() => {
        if (!hotel?.prices || hotel.prices.length === 0) return [];

        return hotel.prices.map((priceItem) => ({
            title: `${hotel.name} - ${priceItem.website}`,
            amenities: hotel.amenities || [],
            price: priceItem.price,
            starRating: hotel.starRating,
            image: hotel.images?.[0] || '/placeholder-hotel.jpg',
            link: `https://${priceItem.website}`,
        }));
    }, [hotel]);
};
