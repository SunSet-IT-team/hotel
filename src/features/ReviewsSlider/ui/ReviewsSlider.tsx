'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import { Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { Box, NavigationBlock, Slider, StarRating, Typography } from '@/shared/ui';
import { formatDateRuShort } from '@/shared/utils/date/formatDate';
import { normalizeDate } from '@/shared/utils/date/normalizeDate';

import { type ReviewsSliderProps } from '../model/types';

import styles from './ReviewsSlider.module.scss';

/**
 * Слайдер отзывов об отеле
 * Отображает отзывы с автором, датой, рейтингом и текстом
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
                loop={false}
                slides={reviews}
                pagination={{
                    clickable: true,
                }}
                renderSlide={(review) => {
                    const formattedDate = formatDateRuShort(normalizeDate(review.date));

                    return (
                        <SwiperSlide
                            className={styles.slide}
                            key={`${review.authorName}-${review.date}`}
                            role="article"
                            aria-label={`Отзыв от ${review.authorName}`}
                        >
                            <div className={styles.reviewCard}>
                                <div className={styles.reviewHeader}>
                                    <Typography variant="h3" color="blue" as="h4">
                                        {review.authorName}
                                    </Typography>
                                    <div className={styles.reviewRating}>
                                        <StarRating
                                            count={Math.round(review.rating / 2)}
                                            classNameStar={styles.star}
                                        />
                                        <Typography variant="h3" color="dark" as="span">
                                            {review.rating}/10
                                        </Typography>
                                    </div>
                                </div>
                                <Typography variant="p" color="dark" className={styles.reviewText}>
                                    {review.text}
                                </Typography>
                                <Typography
                                    variant="span"
                                    color="gray"
                                    className={styles.reviewDate}
                                >
                                    {formattedDate}
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
