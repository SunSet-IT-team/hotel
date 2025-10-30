'use client';

import { type FC, forwardRef, type RefObject, type SVGProps, useCallback } from 'react';
import clsx from 'clsx';
import type Swiper from 'swiper';
import { useSwiper } from 'swiper/react';

import { ArrowIcon, DarkArrowIcon } from '@/shared/assets/icons';

import styles from './NavigationBlock.module.scss';

type SliderButtonsColor = 'white' | 'blue' | 'dark';

interface Props {
    swiperRef?: RefObject<Swiper | null>;

    /**
     * Цвет кнопок блока навигации
     * Возможные значения:
     * - `"white"`
     * - `"blue"`
     * - `"dark"`
     * @default "blue"
     */
    buttonsColor?: SliderButtonsColor;

    /**
     * Дополнительные css стили
     */
    className?: string;
}

/**
 * Блок навигации со стрелочками для слайдера
 */
export const NavigationBlock: FC<Props> = ({ swiperRef, buttonsColor = 'blue', className }) => {
    const swiperInstance = useSwiper();

    const handlePrev = useCallback(() => {
        const swiper = swiperInstance || swiperRef?.current;
        if (!swiper) return;
        swiper.slidePrev();
    }, [swiperInstance, swiperRef]);

    const handleNext = useCallback(() => {
        const swiper = swiperInstance || swiperRef?.current;
        if (!swiper) return;
        swiper.slideNext();
    }, [swiperInstance, swiperRef]);

    return (
        <div slot="container-end" className={clsx(styles.root, className)}>
            <SliderButton
                color={buttonsColor}
                className={clsx(styles.root__btn, styles.root__btn_prev)}
                onClick={handlePrev}
            />
            <SliderButton
                color={buttonsColor}
                className={clsx(styles.root__btn, styles.root__btn_next)}
                onClick={handleNext}
            />
        </div>
    );
};
NavigationBlock.displayName = 'NavigationBlock';

interface SliderButtonProps extends Omit<SVGProps<SVGSVGElement>, 'onClick'> {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    color?: SliderButtonsColor;
}
const SliderButton = forwardRef<HTMLButtonElement, SliderButtonProps>(
    ({ onClick, className, color = 'blue', ...rest }, ref) => {
        return (
            <button onClick={onClick} className={className} ref={ref}>
                {color === 'dark' ? (
                    <DarkArrowIcon {...rest} />
                ) : (
                    <ArrowIcon className={styles[color]} {...rest} />
                )}
            </button>
        );
    },
);
SliderButton.displayName = 'SliderButton';
