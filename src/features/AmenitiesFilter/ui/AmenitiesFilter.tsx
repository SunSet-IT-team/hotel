import { useEffect, useState } from 'react';

import { RangeList, Typography } from '@/shared/ui';

import { type AmenitiesFilterProps, type RangeListOption } from '../model/types';

import styles from './AmenitiesFilter.module.scss';
/**
 * @Kempek
 *
 * TODO:
 *
 * Тут нужно сделать так, чтоб мы видели какие удобства у нас выбраны
 */
export const AmenitiesFilter = ({
    title = 'Удобства и услуги',
    amenities,
    selectedAmenities: initialSelectedAmenities = [],
    onAmenitiesChange,
    className,
}: AmenitiesFilterProps) => {
    // Внутреннее состояние для выбранных удобств
    const [selectedAmenities, setSelectedAmenities] =
        useState<RangeListOption[]>(initialSelectedAmenities);
    useEffect(() => {
        setSelectedAmenities(initialSelectedAmenities);
    }, [initialSelectedAmenities]);

    const handleAmenitiesChange = (items: RangeListOption[]) => {
        setSelectedAmenities(items);
        onAmenitiesChange?.(items);
    };

    return (
        <div className={`${className || ''}`}>
            <div className={styles.title}>
                <Typography variant="h5" as="span" color="blue" className={styles.titleText}>
                    {title}
                </Typography>
            </div>
            <div className={styles.listContainer}>
                <RangeList
                    options={amenities}
                    orientation="vertical"
                    selectionMode="multiple"
                    align="left"
                    selectedItems={selectedAmenities}
                    onChange={handleAmenitiesChange}
                />
            </div>
        </div>
    );
};
