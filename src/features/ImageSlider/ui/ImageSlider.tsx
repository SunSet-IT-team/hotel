'use client';

import { type FC,useRef } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import type Swiper from 'swiper';
import { SwiperSlide } from 'swiper/react';

import { useIsMobile } from '@/shared/hooks';
import { NavigationBlock, Slider, type SliderProps } from '@/shared/ui/Slider';

import styles from './ImageSlider.module.scss';

/**
 * Пропсы компонента ImageSlider
 */
export interface ImageSliderProps extends Omit<SliderProps<string>, 'renderSlide' | 'slides'> {
    /** Массив URL изображений для отображения в слайдере */
    slides: string[];
    /** Альтернативный текст для изображений (для accessibility) */
    alt?: string;
    /** Название отеля (для генерации alt текста) */
    hotelName?: string;
    /** Дополнительные css стили для корневого div элемента */
    rootClassName?: string;
}

/**
 * Слайдер фотографий отеля
 * Отображает галерею изображений с навигацией
 */
export const ImageSlider: FC<ImageSliderProps> = ({
    className,
    rootClassName,
    alt,
    hotelName,
    ...rest
}) => {
    const isMobile = useIsMobile();
    const swiperRef = useRef<Swiper>(null);

    return (
        <div className={clsx(styles.root, rootClassName)}>
            <Slider
                modules={[]}
                instanceRef={swiperRef}
                className={clsx(styles.slider, className)}
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
            />
            <NavigationBlock
                swiperRef={swiperRef}
                className={styles.navigationBlock}
                buttonsColor={isMobile ? 'blue' : 'white'}
            />
        </div>
    );
};
