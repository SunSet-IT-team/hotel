'use client';

import { FC } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Slider, SliderProps, Typography } from '@/shared/ui';
import clsx from 'clsx';

import styles from './PricesSlider.module.scss';
import { NavigationBlock } from '../NavigationBlock/NavigationBlock';
import { SwiperSlide } from 'swiper/react';

type PriceObj = {
    price: number;
    website: string;
};
interface Props extends Omit<SliderProps<string>, 'renderSlide' | 'slides'> {
    /**
     * Массив с ценами для слайдов
     */
    prices: PriceObj[];
}

/**
 * Слайдер цен для карточки отеля со страницы с фильтром отелей
 */
export const PricesSlider: FC<Props> = ({ prices, className, ...rest }) => {
    return (
        <Slider
            modules={[Navigation]}
            className={clsx(styles.root, className)}
            spaceBetween={32}
            slidesPerView={2}
            slidesPerGroup={2}
            slides={prices}
            renderSlide={(priceObj) => {
                const { price, website } = priceObj;
                return (
                    <SwiperSlide className={styles.slide} key={`${price}_${website}`}>
                        <div className={styles.slide__container}>
                            <Typography
                                className={styles.slide__price}
                                color="dark"
                                as="span"
                                variant="h2"
                            >
                                {price}
                            </Typography>
                            <Typography
                                className={styles.slide__website}
                                color="blue"
                                as="span"
                                variant="h3"
                            >
                                {website}
                            </Typography>
                        </div>
                    </SwiperSlide>
                );
            }}
            {...rest}
        >
            <NavigationBlock />
        </Slider>
    );
};
