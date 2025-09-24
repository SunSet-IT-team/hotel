'use client';

import { FC } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Slider, SliderProps, Typography } from '@/shared/ui';
import clsx from 'clsx';

import styles from './ReviewsSlider.module.scss';
import { NavigationBlock } from '../NavigationBlock/NavigationBlock';
import { SwiperSlide } from 'swiper/react';

type Review = string;
interface Props extends Omit<SliderProps<string>, 'renderSlide' | 'slides'> {
    /**
     * Массив с отзывами для слайдов
     */
    reviews: Review[];
}

/**
 * Слайдер отзывов для карточки отеля со страницы с фильтром отелей
 */
export const ReviewsSlider: FC<Props> = ({ reviews, className, ...rest }) => {
    return (
        <Slider
            modules={[Navigation, Pagination]}
            className={clsx(styles.root, className)}
            spaceBetween={32}
            slides={reviews}
            pagination={{
                clickable: true,
            }}
            renderSlide={(review) => {
                return (
                    <SwiperSlide className={styles.slide} key={review}>
                        <Typography>{review}</Typography>
                    </SwiperSlide>
                );
            }}
            {...rest}
        >
            <NavigationBlock />
        </Slider>
    );
};
