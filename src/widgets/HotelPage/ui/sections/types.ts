import { type Hotel, type HotelReview } from '@/entities/hotel';

/**
 * Пропсы для секции галереи
 */
export interface HotelGallerySectionProps {
    hotel: Hotel;
}

/**
 * Пропсы для секции информации об отеле
 */
export interface HotelInfoSectionProps {
    hotel: Hotel;
}

/**
 * Пропсы для секции удобств
 */
export interface HotelAmenitiesSectionProps {
    amenities: Array<{
        label: string;
        icon: React.ComponentType;
    }>;
}

/**
 * Пропсы для секции отзывов
 */
export interface HotelReviewsSectionProps {
    reviews?: HotelReview[];
}

/**
 * Пропсы для секции правил
 */
export interface HotelRulesSectionProps {
    rules: Array<{
        subtext: string;
    }>;
}

/**
 * Пропсы для секции описания
 */
export interface HotelDescriptionSectionProps {
    description: Array<{
        subtext: string;
    }>;
    importantInfo: Array<{
        subtext: string;
    }>;
}

/**
 * Пропсы для секции предложений партнёров
 */
export interface HotelPartnerOffersSectionProps {
    offers: Array<{
        title: string;
        amenities: string[];
        price: number;
        starRating: number;
        image: string;
        link: string;
    }>;
}
