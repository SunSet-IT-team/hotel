'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { SwiperSlide } from 'swiper/react';

import { NavigationBlock, Slider } from '@/shared/ui/Slider';

import { type ImageSliderProps } from '../model/types';

import styles from './ImageSlider.module.scss';

/**
 * Слайдер фотографий отеля
 * Отображает галерею изображений с навигацией
 */
export const ImageSlider: FC<ImageSliderProps> = ({ className, alt, hotelName, ...rest }) => {
    return (
        <Slider
            modules={[]}
            className={clsx(styles.root, className)}
            spaceBetween={32}
            loop={false}
            renderSlide={(slide, i) => {
                const imageAlt = alt || `${hotelName ? `${hotelName} - ` : ''}Фото ${i + 1}`;

                return (
                    <SwiperSlide className={styles.slide} key={`${slide}-${i}`}>
                        <Image src={slide} alt={imageAlt} priority={i === 0} fill />
                    </SwiperSlide>
                );
            }}
            {...rest}
        >
            <NavigationBlock className={styles.navigationBlock} buttonsColor="white" />
        </Slider>
    );
};
