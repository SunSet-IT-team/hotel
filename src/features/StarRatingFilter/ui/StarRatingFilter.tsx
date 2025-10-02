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
    selectedRating = [],
    onRatingChange,
    className,
}: StarRatingFilterProps) => {
    const handleRatingChange = (items: RangeListOption[]) => {
        const ratings = items.map((item) => Number(item.value));
        onRatingChange?.(ratings);
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
                    selectedItems={selectedRating}
                    onChange={handleRatingChange}
                    itemWidth="20%"
                />
            </div>
        </div>
    );
};
