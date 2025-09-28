import React from 'react';

import { PriceFilter, type PriceProp, type RangeItem, type SelectItem } from '@/features/PriceFilter';
import { StarRatingFilter } from '@/features/StarRatingFilter/ui/StarRatingFilter';
import { Box } from '@/shared/ui';
import { type RangeListOption } from '@/shared/ui/RangeList';

import styles from './FilterForm.module.scss';

const prices: PriceProp = {
    max: 10000,
    min: 0,
    step: 100,
    value: [0, 100],
};

const items: SelectItem[] = [
    { value: '0', label: '213' },
    { value: '2', label: '350' },
];

const rangeItems: RangeItem[] = [{ value: '1', label: '0 - 1000', minPrice: 0, maxPrice: 1000 }];

const ratingOptions: RangeListOption[] = [
    {
        value: '1',
        label: '1',
    },
    {
        value: '2',
        label: '2',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '4',
        label: '4',
    },
];

export const FilterForm = () => {
    return (
        <div className={styles.root}>
            <Box className={styles.box}>
                <PriceFilter price={prices} selectItems={items} rangeItems={rangeItems} />
                <StarRatingFilter ratingOptions={ratingOptions} />
            </Box>
        </div>
    );
};
