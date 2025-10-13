import { type FC } from 'react';

import { Box, Typography } from '@/shared/ui';

import styles from './HotelReviews.module.scss';

interface HotelReviewsProps {
    rating?: number;
    reviewCount?: number;
    reviewsLink?: string;
}

const getReviewStatus = (rating: number): string => {
    if (rating >= 9) return 'Отлично';
    if (rating >= 7) return 'Хорошо';
    return 'Плохо';
};

export const HotelReviews: FC<HotelReviewsProps> = ({ rating, reviewCount, reviewsLink = '#' }) => {
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
                {rating ? getReviewStatus(rating) : 'Хорошо'}
            </Typography>
            {reviewCount && (
                <Typography variant="h3" as="a" className={styles.reviewCount} href={reviewsLink}>
                    {reviewCount} отзыва
                </Typography>
            )}
        </div>
    );
};
