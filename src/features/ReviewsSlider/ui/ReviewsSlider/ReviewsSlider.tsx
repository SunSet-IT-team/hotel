'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { Slider, type SliderProps, Typography } from '@/shared/ui';

import { NavigationBlock } from '../NavigationBlock/NavigationBlock';

import styles from './ReviewsSlider.module.scss';

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
