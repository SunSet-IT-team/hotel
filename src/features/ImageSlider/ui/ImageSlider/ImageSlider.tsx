'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { Slider, type SliderProps } from '@/shared/ui';

import { NavigationBlock } from '../NavigationBlock/NavigationBlock';

import styles from './ImageSlider.module.scss';

type ImageSrc = string;
interface Props extends Omit<SliderProps<string>, 'renderSlide' | 'slides'> {
    /**
     * Массив с ссылками на изображения для слайдов
     */
    slides: ImageSrc[];
}

/**
 * Слайдер фотографий карточки отеля со страницы с фильтром отелей
 */
export const ImageSlider: FC<Props> = ({ className, ...rest }) => {
    return (
        <Slider
            modules={[Navigation]}
            className={clsx(styles.root, className)}
            spaceBetween={32}
            renderSlide={(slide, i) => {
                return (
                    <SwiperSlide className={styles.slide}>
                        <Image src={slide} key={slide} alt="" priority={i === 0} fill />
                    </SwiperSlide>
                );
            }}
            {...rest}
        >
            <NavigationBlock />
        </Slider>
    );
};
