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
    selectedAmenities = [],
    onAmenitiesChange,
    className,
}: AmenitiesFilterProps) => {
    const handleAmenitiesChange = (items: RangeListOption[]) => {
        const amenityValues = items.map((item) => item.value);
        onAmenitiesChange?.(amenityValues);
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
