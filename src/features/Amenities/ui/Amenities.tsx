'use client';

import { type FC, useRef, useState } from 'react';
import clsx from 'clsx';

import { useIsMobile } from '@/shared/hooks';
import { Box, Button, Convenience, Popup, Typography } from '@/shared/ui';

import { type AmenitiesProps } from '../model/types';

import styles from './Amenities.module.scss';

export const Amenities: FC<AmenitiesProps> = ({ amenities, title = 'Удобства', className }) => {
    const rootRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile(768);
    // Показываем только первые 5 удобства в превью
    const previewAmenities = amenities.slice(0, 5);
    const hasMoreAmenities = amenities.length > 6;

    return (
        <Box className={clsx(styles.root, className)}>
            <Typography
                variant={isMobile ? 'h4' : 'h5'}
                as="h3"
                color="blue"
                className={styles.title}
            >
                {title}
            </Typography>

            <div className={styles.amenitiesList} ref={rootRef}>
                {previewAmenities.map((amenity, index) => (
                    <Convenience
                        key={`preview-${amenity.label}-${index}`}
                        label={amenity.label}
                        icon={amenity.icon}
                        className={styles.amenityItem}
                    />
                ))}
                {hasMoreAmenities && (
                    <div className={styles.amenityItem}>
                        <Button
                            type="button"
                            className={styles.showAllButton}
                            onClick={() => setIsOpen(true)}
                            fullWidth={true}
                        >
                            <Typography variant="h2" as="span" color="blue">
                                Все удобства...
                            </Typography>
                        </Button>
                    </div>
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
                        <div className={styles.allAmenitiesList}>
                            {Array.from(
                                { length: Math.ceil(amenities.length / 2) },
                                (_, groupIndex) => {
                                    const startIndex = groupIndex * 2;
                                    const groupAmenities = amenities.slice(
                                        startIndex,
                                        startIndex + 2,
                                    );

                                    return (
                                        <div key={groupIndex} className={styles.amenityGroup}>
                                            {groupAmenities.map((amenity, itemIndex) => (
                                                <Convenience
                                                    key={`popup-${amenity.label}-${startIndex + itemIndex}`}
                                                    label={amenity.label}
                                                    icon={amenity.icon}
                                                />
                                            ))}
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </Box>
                </Popup>
            )}
        </Box>
    );
};
