'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import { useSwiper } from 'swiper/react';

import { ArrowIcon, type ArrowIconProps } from '@/shared/assets/icons';

import styles from './NavigationBlock.module.scss';

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
            <ArrowIcon color="dark" height={'26'} width={'26'} {...rest} />
        </button>
    );
};
