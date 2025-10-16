import { type FC, memo } from 'react';

import { BookingButton } from '@/features/BookingButton';
import { HotelInfo } from '@/features/HotelInfo';

import { type HotelInfoSectionProps } from './types';

import styles from '../HotelPage.module.scss';

/**
 * Секция информации об отеле
 */
export const HotelInfoSection: FC<HotelInfoSectionProps> = memo(({ hotel }) => (
    <section className={styles.infoSection}>
        <HotelInfo
            hotelName={hotel.name}
            starRating={hotel.starRating}
            address={hotel.address}
            rating={hotel.rating}
            reviewCount={hotel.reviewCount}
            variant="default"
            className={styles.hotelInfo}
        />
        <BookingButton hotelId={hotel.id} className={styles.bookingButton} />
    </section>
));

HotelInfoSection.displayName = 'HotelInfoSection';
