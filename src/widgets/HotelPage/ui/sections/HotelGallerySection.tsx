import { type FC, memo } from 'react';

import { ImageSlider } from '@/features/ImageSlider';
import { useIsMobile } from '@/shared/hooks';
import { Gallery } from '@/shared/ui';

import { type HotelGallerySectionProps } from './types';

import styles from '../HotelPage.module.scss';

/**
 * Секция галереи отеля
 */
export const HotelGallerySection: FC<HotelGallerySectionProps> = memo(({ hotel }) => {
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
                <Gallery images={hotel.images} alt={hotel.name} />
            )}
        </section>
    );
});

HotelGallerySection.displayName = 'HotelGallerySection';
