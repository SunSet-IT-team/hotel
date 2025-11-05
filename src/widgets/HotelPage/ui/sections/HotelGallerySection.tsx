import { type FC, memo } from 'react';

import { ImageSlider } from '@/features/ImageSlider';
import { useIsMobile } from '@/shared/hooks';
import { Gallery } from '@/shared/ui';

import { type HotelGallerySectionProps } from './types';

import styles from '../HotelPage.module.scss';

interface Props extends HotelGallerySectionProps {
    handleOpenSlider?: () => void;
}

/**
 * Секция галереи отеля
 */
export const HotelGallerySection: FC<Props> = memo(({ hotel, handleOpenSlider }) => {
    const isMobile = useIsMobile();

    return (
        <section className={styles.imageSection}>
            {isMobile ? (
                <ImageSlider
                    slides={hotel.images}
                    alt={hotel.name}
                    rootClassName={styles.imageSlider}
                />
            ) : (
                <Gallery
                    images={hotel.images}
                    alt={hotel.name}
                    handleOpenSlider={handleOpenSlider}
                />
            )}
        </section>
    );
});

HotelGallerySection.displayName = 'HotelGallerySection';
