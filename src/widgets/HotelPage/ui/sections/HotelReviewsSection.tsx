import { type FC, memo } from 'react';

import { ReviewsSlider } from '@/features/ReviewsSlider';

import { type HotelReviewsSectionProps } from './types';

import styles from '../HotelPage.module.scss';

/**
 * Секция отзывов отеля
 */
export const HotelReviewsSection: FC<HotelReviewsSectionProps> = memo(({ reviews }) => {
    if (!reviews || reviews.length === 0) return null;

    return (
        <section className={styles.reviewsSection}>
            <ReviewsSlider reviews={reviews} slidesPerView={1} />
        </section>
    );
});

HotelReviewsSection.displayName = 'HotelReviewsSection';
