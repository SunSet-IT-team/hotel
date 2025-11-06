import { type FC, memo } from 'react';

import { Amenities } from '@/features/Amenities';
import { useTranslation } from '@/shared/hooks';

import { type HotelAmenitiesSectionProps } from './types';

import styles from '../HotelPage.module.scss';

/**
 * Секция удобств отеля
 */
export const HotelAmenitiesSection: FC<HotelAmenitiesSectionProps> = memo(({ amenities }) => {
    const translate = useTranslation();

    if (amenities.length === 0) return null;

    // Преобразуем иконки в JSX элементы
    const amenitiesWithJSX = amenities.map((amenity) => ({
        label: amenity.label,
        icon: <amenity.icon />,
    }));

    return (
        <section className={styles.amenitiesSection}>
            <Amenities amenities={amenitiesWithJSX} title={translate.hotel.amenities} />
        </section>
    );
});

HotelAmenitiesSection.displayName = 'HotelAmenitiesSection';
