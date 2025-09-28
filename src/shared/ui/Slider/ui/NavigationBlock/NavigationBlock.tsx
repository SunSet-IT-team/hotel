'use client';

import { type FC, type SVGProps } from 'react';
import clsx from 'clsx';
import { useSwiper } from 'swiper/react';

import { ArrowIcon, DarkArrowIcon } from '@/shared/assets/icons';

import styles from './NavigationBlock.module.scss';

type SliderButtonsColor = 'white' | 'blue' | 'dark';

interface Props {
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
export const NavigationBlock: FC<Props> = ({ buttonsColor = 'blue', className }) => {
    const swiper = useSwiper();

    return (
        <div slot="container-end" className={clsx(styles.root, className)}>
            <SliderButton
                color={buttonsColor}
                className={clsx(styles.root__btn, styles.root__btn_prev)}
                onClick={() => swiper.slidePrev()}
            />
            <SliderButton
                color={buttonsColor}
                className={clsx(styles.root__btn, styles.root__btn_next)}
                onClick={() => swiper.slideNext()}
            />
        </div>
    );
};

interface SliderButtonProps extends Omit<SVGProps<SVGSVGElement>, 'onClick'> {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    color?: SliderButtonsColor;
}
const SliderButton: FC<SliderButtonProps> = ({ onClick, className, color = 'blue', ...rest }) => {
    return (
        <button onClick={onClick} className={className}>
            {color === 'dark' ? (
                <DarkArrowIcon {...rest} />
            ) : (
                <ArrowIcon className={styles[color]} {...rest} />
            )}
        </button>
    );
};
