export type { HotelPageProps } from './model/types';
export { HotelPage } from './ui/HotelPage';
export { HotelPageSkeleton } from './ui/HotelPageSkeleton';

// Экспорт секций для возможного переиспользования
export {
    HotelAmenitiesSection,
    HotelDescriptionSection,
    HotelGallerySection,
    HotelInfoSection,
    HotelPartnerOffersSection,
    HotelReviewsSection,
    HotelRulesSection,
} from './ui/sections';

// Экспорт хуков
export {
    useAmenitiesWithIcons,
    useDescriptionItems,
    useHotelData,
    usePartnerOffers,
} from './hooks/useHotelPage';
