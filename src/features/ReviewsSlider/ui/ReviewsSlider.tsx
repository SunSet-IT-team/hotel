'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import { Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { Box, NavigationBlock, Slider, Typography } from '@/shared/ui';

import { type ReviewsSliderProps } from '../model/types';

import styles from './ReviewsSlider.module.scss';

/**
 * Слайдер отзывов об отеле
 * Отображает только текст отзывов
 */
export const ReviewsSlider: FC<ReviewsSliderProps> = ({ reviews, className, ...rest }) => {
    return (
        <Box>
            <Typography variant="h5" color="green">
                Отзывы
            </Typography>
            <Slider
                modules={[Pagination]}
                className={clsx(styles.root, className)}
                spaceBetween={32}
                loop={true}
                slides={reviews}
                pagination={{
                    clickable: true,
                }}
                renderSlide={(review) => {
                    return (
                        <SwiperSlide
                            className={styles.slide}
                            key={`${review.authorName}-${review.date}`}
                            role="article"
                            aria-label="Отзыв"
                        >
                            <div className={styles.reviewCard}>
                                <Typography variant="p" color="dark" className={styles.reviewText}>
                                    {review.text}
                                </Typography>
                            </div>
                        </SwiperSlide>
                    );
                }}
                {...rest}
            >
                <NavigationBlock className={styles.navigationBlock} />
            </Slider>
        </Box>
    );
};
