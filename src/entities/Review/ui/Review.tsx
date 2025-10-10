'use client';

import { type FC } from 'react';
import clsx from 'clsx';

import { Typography } from '@/shared/ui';

import { type Review as ReviewType } from '../model/types';

import { RatingChip } from './RatingChip/ui/RatingChip';

import styles from './Review.module.scss';

interface Props {
    /**
     * Объект отзыва пользователя
     */
    review: ReviewType;

    /**
     * Дополнительные css стили
     */
    className?: string;
}

/**
 * Компонент отзыва для блока отзывов со страницы отеля
 */
export const Review: FC<Props> = ({ review, className }) => {
    return (
        <div className={clsx(styles.root, className)}>
            <Typography variant="h3" className={styles.root__text}>
                {review.text}
            </Typography>
            <RatingChip className={styles.root__rating} rating={review.rating} />
        </div>
    );
};
