'use client';

import { ReactNode } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import styles from './Slider.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';

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
    return (
        <Swiper className={styles.root} loop {...rest}>
            {slides.map((slide, i) => {
                if (renderSlide) return renderSlide(slide as S, i);
                return <SwiperSlide key={i}>{slide as ReactNode}</SwiperSlide>;
            })}
            {children}
        </Swiper>
    );
};
