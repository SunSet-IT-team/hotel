'use client';

import { type FC, useState } from 'react';
import clsx from 'clsx';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { Review, type ReviewType } from '@/entities/Review';
import { NavigationBlock, Slider } from '@/shared/ui';

import styles from './ReviewsBlockSlider.module.scss';

interface Props {
    /**
     * Массив отзывов пользователей
     */
    reviews: ReviewType[];

    /**
     * Дополнительные css стили
     */
    className?: string;
}

/**
 * Компонент слайдера блока отзывов со страницы отеля
 */
export const ReviewsBlockSlider: FC<Props> = ({ reviews, className }) => {
    const slidesPerView = 3;
    const slidePerClick = reviews.length >= 6 ? 3 : 1;

    const [isSliderActive, setIsSliderActive] = useState<boolean>(false);
    console.log(styles[`slidePerClick-${slidePerClick}`], `slidePerClick-${slidePerClick}`);

    return (
        <Slider
            modules={[Navigation, Pagination]}
            pagination={{
                clickable: true,
            }}
            spaceBetween={32}
            slidesPerView={slidesPerView}
            slidesPerGroup={slidePerClick}
            className={clsx(
                styles.root,
                styles[`slidePerClick-${slidePerClick}`],
                styles[`slidePerView-${slidesPerView}`],
                { [styles.inactive]: !isSliderActive },
                className,
            )}
            slides={reviews}
            watchOverflow
            onLock={() => setIsSliderActive(false)}
            onUnlock={() => setIsSliderActive(true)}
            renderSlide={(review) => (
                <SwiperSlide key={review.text} className={styles.slide}>
                    <Review review={review} className={styles.review} />
                </SwiperSlide>
            )}
        >
            <NavigationBlock className={styles.navigationBlock} hidden={!isSliderActive} />
        </Slider>
    );
};
