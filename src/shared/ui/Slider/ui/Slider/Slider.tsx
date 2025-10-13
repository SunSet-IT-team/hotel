'use client';

import { type ReactNode } from 'react';
import { Swiper, type SwiperProps, SwiperSlide } from 'swiper/react';

import styles from './Slider.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';

interface BaseProps extends SwiperProps {
    children?: ReactNode;
}

interface WithRenderSlide<S> {
    /**
     * Массив, отражающий контент каждого из слайдов компонента Slider
     */
    slides: S[];

    /**
     * Функция, позволяющая задавать рендер каждому из слайдов
     */
    renderSlide?: (slide: S, index: number) => ReactNode;
}

interface WithoutRenderSlide {
    slides: ReactNode[];

    renderSlide?: never;
}

export type Props<S> = BaseProps & (WithRenderSlide<S> | WithoutRenderSlide);

/** Компонент слайдера ui-кита */
export const Slider = <S,>({ slides, renderSlide, children, ...rest }: Props<S>) => {
    // Определяем, достаточно ли слайдов для loop mode
    // Loop требует минимум slidesPerView * 2 слайдов
    const slidesPerView = typeof rest.slidesPerView === 'number' ? rest.slidesPerView : 1;
    const slidesPerGroup = typeof rest.slidesPerGroup === 'number' ? rest.slidesPerGroup : 1;
    const minSlidesForLoop = Math.max(slidesPerView, slidesPerGroup) * 2;
    const hasEnoughSlidesForLoop = slides.length >= minSlidesForLoop;

    // Если loop явно передан в props, используем его, иначе проверяем достаточность слайдов
    const shouldLoop = rest.loop !== undefined ? rest.loop : hasEnoughSlidesForLoop;

    return (
        <Swiper className={styles.root} loop={shouldLoop} {...rest}>
            {slides.map((slide, i) => {
                if (renderSlide) return renderSlide(slide as S, i);
                return <SwiperSlide key={slide?.toString()}>{slide as ReactNode}</SwiperSlide>;
            })}
            {children}
        </Swiper>
    );
};
