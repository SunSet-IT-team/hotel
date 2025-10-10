'use client';

import { type FC } from 'react';
import clsx from 'clsx';

import { RatingChip, type ReviewType } from '@/entities/Review';
import { ReviewsBlockSlider } from '@/features/ReviewsBlockSlider/ui/ReviewsBlockSlider';
import { Box, Typography } from '@/shared/ui';

import { RatingWords } from '../model/types';
import { ratingToGrade } from '../utils/ratingToGrade';

import styles from './ReviewsBlock.module.scss';

interface Props {
    reviews: ReviewType[];

    /**
     * Средний рейтинг по отзывам
     */
    averageRating: number;

    /**
     * Максимально возможный рейтинг для отзыва
     * @default 10
     */
    maxRating?: number;

    /**
     * Дополнительные css стили
     */
    className?: string;
}

/**
 * Блок отзывов со страницы отеля
 */
export const ReviewsBlock: FC<Props> = ({ reviews, averageRating, maxRating = 10 }) => {
    const reviewsCount = reviews.length ? `${reviews.length} отзывов` : 'Нет отзывов';
    const averageRatingResult = ratingToGrade(averageRating);

    return (
        <Box as="section" className={styles.root}>
            <div className={clsx(styles.root__headerBlock, styles.headerBlock)}>
                <Typography as="h3" variant="h5" color="blue" className={styles.headerBlock__title}>
                    Отзывы
                </Typography>
                <RatingChip
                    rating={averageRating}
                    maxRating={maxRating}
                    className={styles.headerBlock__averageRating}
                />
                <Typography
                    as="span"
                    variant="h3"
                    className={styles.headerBlock__averageRatingResult}
                >
                    {averageRatingResult || RatingWords.NORMAL}
                </Typography>
                <Typography
                    as="span"
                    variant="h3"
                    color="blue"
                    className={styles.headerBlock__reviewsCount}
                >
                    {reviewsCount}
                </Typography>
            </div>
            <ReviewsBlockSlider reviews={reviews} />
        </Box>
    );
};
