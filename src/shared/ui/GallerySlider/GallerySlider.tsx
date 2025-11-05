'use client';

import { type FC, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { Keyboard, Mousewheel, Navigation, Pagination, Thumbs, Zoom } from 'swiper/modules';
import type { SwiperClass, SwiperProps } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './GallerySlider.module.scss';

type Props = Omit<
    SwiperProps,
    'children' | 'initialSlide' | 'slidesPerView' | 'onSlideChange' | 'modules' | 'thumbs'
> & {
    images: string[];
    initialIndex?: number;
    className?: string;

    /** Внешний обработчик смены кадра */
    onIndexChange?: (index: number) => void;

    /** Показывать ли полосу превью */
    showThumbs?: boolean;

    /** Включить ли zoom */
    allowZoom?: boolean;

    /** Текст alt; дополняется индексом */
    alt?: string;

    /** Пропсы для ленты превью (thumbs) */
    thumbsProps?: Omit<SwiperProps, 'modules' | 'onSwiper' | 'children'>;

    /** Пропсы для корневого контейнера */
    rootProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const GallerySlider: FC<Props> = ({
    images,
    initialIndex = 0,
    className,
    onIndexChange,
    showThumbs: _showThumbs = true,
    allowZoom = true,
    loop = false,
    alt = 'Gallery image',

    thumbsProps: _thumbsProps,
    rootProps,

    // всё остальное — прямо в основной Swiper (rest)
    ...rest
}) => {
    const [_thumbsSwiper, _setThumbsSwiper] = useState<SwiperClass | null>(null);

    const safeInitialIndex = useMemo(() => {
        if (!images?.length) return 0;
        return Math.max(0, Math.min(initialIndex, images.length - 1));
    }, [images, initialIndex]);

    // базовые модули + пользовательские из rest.modules (если вдруг передали)
    const restModules = (rest as SwiperProps).modules ?? [];
    const modules = useMemo(
        () =>
            Array.from(
                new Set([
                    Navigation,
                    Pagination,
                    Keyboard,
                    Mousewheel,
                    Zoom,
                    Thumbs,
                    ...restModules,
                ]),
            ),
        [restModules],
    );

    useEffect(() => {
        onIndexChange?.(safeInitialIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [safeInitialIndex]);

    if (!images?.length) {
        return <div className={clsx(styles.empty, className)}>Нет изображений</div>;
    }

    // отделим modules из rest, чтобы не было двойной передачи
    const { modules: _ignoredModules, ...mainSwiperRest } = rest as SwiperProps;

    return (
        <div className={clsx(styles.root, className)} {...rootProps}>
            <Swiper
                className={styles.main}
                modules={modules}
                initialSlide={safeInitialIndex}
                navigation
                pagination={{ clickable: true }}
                keyboard={{ enabled: true, onlyInViewport: false }}
                mousewheel={{ forceToAxis: true }}
                zoom={allowZoom ? { maxRatio: 3 } : false}
                spaceBetween={0}
                slidesPerView={1}
                centeredSlides
                loop={loop}
                onSlideChange={(swiper) => {
                    const real = loop ? swiper.realIndex : swiper.activeIndex;
                    onIndexChange?.(real);
                }}
                {...mainSwiperRest}
            >
                {images.map((src, i) => {
                    const uniqueKey = `${src}-${i}`;
                    return (
                        <SwiperSlide key={uniqueKey} className={styles.slide}>
                            <div className={allowZoom ? 'swiper-zoom-container' : undefined}>
                                <Image
                                    src={src}
                                    alt={`${alt} ${i + 1}`}
                                    fill
                                    priority={i === safeInitialIndex}
                                    className={styles.image}
                                    draggable={false}
                                />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};
