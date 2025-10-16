import { type FC, memo } from 'react';

import { Amenities } from '@/features/Amenities';

import { type HotelAmenitiesSectionProps } from './types';

import styles from '../HotelPage.module.scss';

/**
 * Секция удобств отеля
 */
export const HotelAmenitiesSection: FC<HotelAmenitiesSectionProps> = memo(({ amenities }) => {
    if (amenities.length === 0) return null;

    // Преобразуем иконки в JSX элементы
    const amenitiesWithJSX = amenities.map((amenity) => ({
        label: amenity.label,
        icon: <amenity.icon />,
    }));

    return (
        <section className={styles.amenitiesSection}>
            <Amenities amenities={amenitiesWithJSX} title="Удобства" />
        </section>
    );
});

HotelAmenitiesSection.displayName = 'HotelAmenitiesSection';
