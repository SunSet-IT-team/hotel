'use client';

import { FC, forwardRef, ReactNode, useRef } from 'react';
import Image from 'next/image';
import { ArrowIcon, ArrowIconProps } from '@/shared/assets/icons/ArrowIcon/';

import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Slider.module.scss';

type ImageSrc = string;
interface Props extends SwiperProps {
    /**
     * Массив, отражающий контент каждого из слайдов компонента Slider
     */
    sliders: ImageSrc[] | ReactNode[];
}

/** Компонент слайдера ui-кита */
export const Slider: FC<Props> = ({ sliders, ...rest }) => {
    const prevBtn = useRef<HTMLButtonElement>(null);
    const nextBtn = useRef<HTMLButtonElement>(null);

    return (
        <div>
            <Swiper
                className={styles.root}
                modules={[Navigation]}
                navigation={{
                    prevEl: nextBtn.current,
                    nextEl: nextBtn.current,
                }}
                onBeforeInit={(swiper) => {
                    if (typeof swiper.params.navigation === 'object') {
                        swiper.params.navigation.prevEl = prevBtn.current;
                        swiper.params.navigation.nextEl = nextBtn.current;
                    }
                }}
                loop
                slidesPerView={1}
                {...rest}
            >
                {sliders.map((slide, i) => {
                    if (typeof slide === 'string') {
                        return (
                            <SwiperSlide className={styles.slide}>
                                <Image src={slide} alt="" priority={i === 0} fill />
                            </SwiperSlide>
                        );
                    } else return slide;
                })}
                <div slot="container-end" className={styles.navigationBlock}>
                    <SliderButton
                        ref={prevBtn}
                        direction="left"
                        className={(styles.navigationBlock__btn, styles.navigationBlock__btn_prev)}
                    />
                    <SliderButton
                        ref={nextBtn}
                        direction="right"
                        className={(styles.navigationBlock__btn, styles.navigationBlock__btn_next)}
                    />
                </div>
            </Swiper>
        </div>
    );
};

interface SliderButtonProps extends ArrowIconProps {}

const SliderButton = forwardRef<HTMLButtonElement, SliderButtonProps>(({ ...rest }, ref) => {
    return (
        <button ref={ref}>
            <ArrowIcon color="white" {...rest} />
        </button>
    );
});
