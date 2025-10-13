'use client';

import { type FC } from 'react';

import { BookingButton } from '@/features/BookingButton';
import { HotelInfo } from '@/features/HotelInfo';
import { ImageSlider } from '@/features/ImageSlider';
import { PricesSlider } from '@/features/PricesSlider';
import { ReviewsSlider } from '@/features/ReviewsSlider';
import { Box } from '@/shared/ui';

import { type HotelCardProps } from '../model/types';

import styles from './HotelCard.module.scss';

export const HotelCard: FC<HotelCardProps> = ({ hotel }) => {
    return (
        <Box as="article" className={styles.root}>
            <div className={styles.topSection}>
                <ImageSlider slides={hotel.images} hotelName={hotel.name} />

                <div className={styles.infoSection}>
                    <HotelInfo
                        hotelName={hotel.name}
                        starRating={hotel.starRating}
                        address={hotel.address}
                        rating={hotel.rating}
                        reviewCount={hotel.reviewCount}
                        amenities={hotel.amenities}
                        variant="detailed"
                    />

                    {hotel.reviews && hotel.reviews.length > 0 && (
                        <ReviewsSlider reviews={hotel.reviews} slidesPerView={1} />
                    )}
                </div>
            </div>

            <div className={styles.bottomSection}>
                <PricesSlider prices={hotel.prices} />
                <BookingButton hotelId={hotel.id} />
            </div>
        </Box>
    );
};
