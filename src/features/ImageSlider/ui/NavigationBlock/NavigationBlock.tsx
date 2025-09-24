'use client';

import { FC } from 'react';
import { useSwiper } from 'swiper/react';

import styles from './NavigationBlock.module.scss';
import { ArrowIcon, ArrowIconProps } from '@/shared/assets/icons';

import clsx from 'clsx';

export const NavigationBlock: FC = () => {
    const swiper = useSwiper();

    return (
        <div slot="container-end" className={styles.root}>
            <SliderButton
                direction="left"
                className={clsx(styles.root__btn, styles.root__btn_prev)}
                onClick={() => swiper.slidePrev()}
            />
            <SliderButton
                direction="right"
                className={clsx(styles.root__btn, styles.root__btn_next)}
                onClick={() => swiper.slideNext()}
            />
        </div>
    );
};

interface SliderButtonProps extends Omit<ArrowIconProps, 'onClick'> {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}
const SliderButton: FC<SliderButtonProps> = ({ onClick, className, ...rest }) => {
    return (
        <button onClick={onClick} className={className}>
            <ArrowIcon color="white" width={'32'} height={'30'} {...rest} />
        </button>
    );
};
