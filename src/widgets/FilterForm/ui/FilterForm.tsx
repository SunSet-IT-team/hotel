import { useState } from 'react';

import { AmenitiesFilter } from '@/features/AmenitiesFilter';
import { LocationFilter } from '@/features/LocationFilter';
import {
    PriceFilter,
    type PriceProp,
    type RangeItem,
    type SelectItem,
} from '@/features/PriceFilter';
import { ReviewRatingFilter } from '@/features/ReviewRatingFilter';
import { StarRatingFilter } from '@/features/StarRatingFilter/ui/StarRatingFilter';
import { Box } from '@/shared/ui';
import { type RangeListOption } from '@/shared/ui/RangeList';

import styles from './FilterForm.module.scss';

const prices: PriceProp = {
    max: 10000,
    min: 0,
    step: 100,
    value: [0, 590],
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

// const amenities: RangeListOption[] = ['1', '2']

export const FilterForm = () => {
    // Состояния для всех фильтров
    const [starRatings, setStarRatings] = useState<RangeListOption[]>([]);
    const [reviewRatingRange, setReviewRatingRange] = useState<[number, number]>([1, 10]);
    const [amenities, setAmenities] = useState<RangeListOption[]>([]);

    return (
        <div className={styles.root}>
            <Box className={styles.box}>
                <PriceFilter
                    price={prices}
                    selectItems={items}
                    onPriceChange={(range) => {
                        console.log('on price change ', range);
                    }}
                    onSelectChange={(range) => {
                        console.log('on select change ', range);
                    }}
                    rangeItems={rangeItems}
                />
                <StarRatingFilter
                    ratingOptions={ratingOptions}
                    selectedRatings={starRatings}
                    onRatingsChange={setStarRatings}
                />
                <ReviewRatingFilter
                    ratingRange={reviewRatingRange}
                    onRatingRangeChange={setReviewRatingRange}
                />
                <AmenitiesFilter
                    amenities={ratingOptions}
                    selectedAmenities={amenities}
                    onAmenitiesChange={setAmenities}
                />
                <LocationFilter popularPresets={rangeItems} />
            </Box>
        </div>
    );
};
