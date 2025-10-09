import { useEffect, useState } from 'react';

import { RangeList, Typography } from '@/shared/ui';

import { type RangeListOption, type StarRatingFilterProps } from '../model/types';

import styles from './StarRatingFilter.module.scss';

/**
 * @Kempek
 *
 * TODO:
 *
 * Тут нужно сделать так, чтоб мы видели какой по рейтигу у нас выбран
 */

export const StarRatingFilter = ({
    title = 'Количество звезд',
    ratingOptions,
    selectedRatings = [],
    onRatingsChange,
    className,
}: StarRatingFilterProps) => {
    // Внутреннее состояние для выбранных рейтингов
    const [internalSelectedRatings, setInternalSelectedRatings] =
        useState<RangeListOption[]>(selectedRatings);

    // Синхронизируем внутреннее состояние с внешним
    useEffect(() => {
        setInternalSelectedRatings(selectedRatings);
    }, [selectedRatings]);

    const handleRatingChange = (items: RangeListOption[]) => {
        setInternalSelectedRatings(items);
        onRatingsChange?.(items);
    };

    return (
        <div className={`${className || ''}`}>
            <div className={styles.title}>
                <Typography variant="h5" as="span" color="blue" className={styles.titleText}>
                    {title}
                </Typography>
            </div>
            <div>
                <RangeList
                    options={ratingOptions}
                    orientation="horizontal"
                    selectionMode="multiple"
                    align="center"
                    showStarIcon={true}
                    selectedItems={internalSelectedRatings}
                    onChange={handleRatingChange}
                    itemWidth="20%"
                />
            </div>
        </div>
    );
};
