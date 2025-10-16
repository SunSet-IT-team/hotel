import { type FC, memo } from 'react';
import clsx from 'clsx';

import { Box, Container, NoResults } from '@/shared/ui';

import {
    useAmenitiesWithIcons,
    useDescriptionItems,
    useHotelData,
    usePartnerOffers,
} from '../hooks/useHotelPage';
import { type HotelPageProps } from '../model/types';

import {
    HotelAmenitiesSection,
    HotelDescriptionSection,
    HotelGallerySection,
    HotelInfoSection,
    HotelPartnerOffersSection,
    HotelReviewsSection,
    HotelRulesSection,
} from './sections';

import styles from './HotelPage.module.scss';

/**
 * Виджет страницы отеля
 * Отображает полную информацию об отеле: галерея, описание, удобства, отзывы
 */
const HotelPageComponent: FC<HotelPageProps> = ({ hotelId, className }) => {
    const hotel = useHotelData(hotelId);
    const amenitiesWithIcons = useAmenitiesWithIcons(hotel.amenities);
    const accommodationRulesItems = useDescriptionItems(hotel.accommodationRules);
    const accommodationDescriptionItems = useDescriptionItems(hotel.accommodationDescription);
    const importantInfoItems = useDescriptionItems(hotel.importantInfo);
    const partnerOffers = usePartnerOffers(hotel);

    if (!hotel) {
        return <NoResults />;
    }

    return (
        <div className={clsx(styles.root, className)}>
            <Container className={styles.container}>
                <Box className={styles.box}>
                    <HotelGallerySection hotel={hotel} />
                    <HotelInfoSection hotel={hotel} />
                    <HotelAmenitiesSection amenities={amenitiesWithIcons} />
                    <HotelReviewsSection reviews={hotel.reviews} />
                    <HotelPartnerOffersSection offers={partnerOffers} />
                    <HotelRulesSection rules={accommodationRulesItems} />
                    <HotelDescriptionSection
                        description={accommodationDescriptionItems}
                        importantInfo={importantInfoItems}
                    />
                </Box>
            </Container>
        </div>
    );
};

// Экспортируем мемоизированный компонент
export const HotelPage = memo(HotelPageComponent);
