'use client';

import { type FC, useRef, useState } from 'react';
import clsx from 'clsx';

import { useIsMobile, useTranslation } from '@/shared/hooks';
import { Box, Button, Convenience, Popup, Typography } from '@/shared/ui';

import { AMENITIES_PREVIEW_COUNT, AMENITIES_SHOW_MORE_THRESHOLD } from '../model/constants';
import { type AmenitiesProps } from '../model/types';

import styles from './Amenities.module.scss';

/**
 * Компонент отображения удобств отеля
 * Показывает превью удобств с возможностью открыть полный список в модальном окне
 */
export const Amenities: FC<AmenitiesProps> = ({ amenities, title, className }) => {
    const translate = useTranslation();
    const rootRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();

    const displayTitle = title ?? translate.hotel.amenities;
    const previewAmenities = amenities.slice(0, AMENITIES_PREVIEW_COUNT);
    const hasMoreAmenities = amenities.length > AMENITIES_SHOW_MORE_THRESHOLD;

    return (
        <Box className={clsx(styles.root, className)}>
            <Typography
                variant={isMobile ? 'h4' : 'h5'}
                as="h3"
                color="blue"
                className={styles.title}
            >
                {displayTitle}
            </Typography>

            <div className={styles.amenitiesGrid} ref={rootRef}>
                {previewAmenities.map((amenity) => (
                    <Convenience
                        key={`preview-${amenity.label}`}
                        label={amenity.label}
                        icon={amenity.icon}
                    />
                ))}
                {hasMoreAmenities && (
                    <Button
                        type="button"
                        className={styles.showAllButton}
                        onClick={() => setIsOpen(true)}
                    >
                        <Typography variant="h3" as="span" color="white">
                            +{amenities.length - AMENITIES_PREVIEW_COUNT}{' '}
                            {translate.hotel.amenitiesMore}
                        </Typography>
                    </Button>
                )}
            </div>

            {isOpen && (
                <Popup
                    triggerRef={rootRef}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    position="center"
                    placement="bottom"
                >
                    <Box className={styles.popupContent}>
                        <Typography variant="h4" color="blue" className={styles.popupTitle}>
                            {translate.hotel.amenitiesAll}
                        </Typography>
                        <div className={styles.allAmenitiesGrid}>
                            {amenities.map((amenity) => (
                                <Convenience
                                    key={`popup-${amenity.label}`}
                                    label={amenity.label}
                                    icon={amenity.icon}
                                    className={styles.amenityCard}
                                />
                            ))}
                        </div>
                    </Box>
                </Popup>
            )}
        </Box>
    );
};
