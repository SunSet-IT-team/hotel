import { type FC, memo } from 'react';

import { Gallery } from '@/shared/ui';

import { type HotelGallerySectionProps } from './types';

import styles from '../HotelPage.module.scss';

/**
 * Секция галереи отеля
 */
export const HotelGallerySection: FC<HotelGallerySectionProps> = memo(({ hotel }) => (
    <section className={styles.imageSection}>
        <Gallery images={hotel.images} alt={hotel.name} />
    </section>
));

HotelGallerySection.displayName = 'HotelGallerySection';
