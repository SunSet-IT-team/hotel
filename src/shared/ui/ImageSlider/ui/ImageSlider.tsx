'use client';

import React, { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import { useIsMobile } from '@/shared/hooks';
import { FullscreenPopup } from '@/shared/ui/FullscreenPopup/FullscreenPopup';
import { GallerySlider } from '@/shared/ui/GallerySlider/GallerySlider';

import { Container } from '../../Container';
import { NavigationBlock } from '../../Slider';

import styles from './ImageSlider.module.scss';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    initialIndex?: number;
}

export const ImageSlider: React.FC<Props> = ({ isOpen, onClose, images, initialIndex = 0 }) => {
    const isMobile = useIsMobile();
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <FullscreenPopup isOpen={isOpen} onClose={onClose}>
            <Container className={styles.container}>
                <GallerySlider
                    images={images}
                    initialIndex={initialIndex}
                    showThumbs
                    allowZoom
                    loop={true}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onIndexChange={() => {}}
                />

                <NavigationBlock
                    swiperRef={swiperRef} // ← сюда отдаём реф со Swiper-инстансом
                    className={styles.navigationBlock}
                    buttonsColor={isMobile ? 'blue' : 'white'}
                />
            </Container>
        </FullscreenPopup>
    );
};
