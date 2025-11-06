'use client';

import { type FC } from 'react';

import { useLanguage, useTranslation } from '@/shared/hooks';
import { Box, Typography } from '@/shared/ui';

import styles from './HotelReviews.module.scss';

interface HotelReviewsProps {
    rating?: number;
    reviewCount?: number;
    reviewsLink?: string;
}

export const HotelReviews: FC<HotelReviewsProps> = ({ rating, reviewCount, reviewsLink = '#' }) => {
    const translate = useTranslation();
    const language = useLanguage();

    const getReviewStatus = (rating: number): string => {
        if (rating >= 9) return translate.hotelCard.reviewExcellent;
        if (rating >= 7) return translate.hotelCard.reviewGood;
        return translate.hotelCard.reviewBad;
    };

    const getReviewCountText = (count: number): string => {
        // Для английского языка
        if (language === 'en') {
            return count === 1
                ? `${count} ${translate.hotelCard.review}`
                : `${count} ${translate.hotelCard.reviewCountPlural}`;
        }

        // Для русского языка
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return `${count} ${translate.hotelCard.reviewCountPlural}`;
        }
        if (lastDigit === 1) {
            return `${count} ${translate.hotelCard.review}`;
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return `${count} ${translate.hotelCard.reviewCount}`;
        }
        return `${count} ${translate.hotelCard.reviewCountPlural}`;
    };

    if (!rating && !reviewCount) return null;

    return (
        <div className={styles.reviews}>
            {rating && (
                <Box className={styles.rating}>
                    <Typography variant="h3" as="span" color="dark" className={styles.ratingText}>
                        {rating}/10
                    </Typography>
                </Box>
            )}
            <Typography variant="h3" as="span" color="dark" className={styles.reviewStatus}>
                {rating ? getReviewStatus(rating) : translate.hotelCard.reviewGood}
            </Typography>
            {reviewCount && (
                <Typography variant="h3" as="a" className={styles.reviewCount} href={reviewsLink}>
                    {getReviewCountText(reviewCount)}
                </Typography>
            )}
        </div>
    );
};
