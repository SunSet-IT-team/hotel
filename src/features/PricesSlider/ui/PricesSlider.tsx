'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import { SwiperSlide } from 'swiper/react';

import { formatPrice } from '@/shared/lib/formatting';
import { Box, NavigationBlock, Slider, Typography } from '@/shared/ui';

import { type PricesSliderProps } from '../model/types';

import styles from './PricesSlider.module.scss';

/**
 * Слайдер цен от партнёров для карточки отеля
 * Отображает цены с разных сайтов-партнёров
 */
export const PricesSlider: FC<PricesSliderProps> = ({
    prices,
    currency = '₽',
    className,
    ...rest
}) => {
    return (
        <Box className={styles.container}>
            <Typography variant="h5" color="green">
                Цены
            </Typography>
            <Slider
                modules={[]}
                className={clsx(styles.root, className)}
                spaceBetween={32}
                slidesPerView={1}
                slidesPerGroup={1}
                loop={false}
                slides={prices}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        spaceBetween: 12,
                    },
                    768: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        spaceBetween: 16,
                    },
                    1024: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        spaceBetween: 20,
                    },
                    1280: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        spaceBetween: 24,
                    },
                    1600: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 32,
                    },
                }}
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
                                    {formatPrice(price, currency)}
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
                <NavigationBlock className={styles.navigationBlock} buttonsColor="dark" />
            </Slider>
        </Box>
    );
};
