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
    max: 30000,
    min: 0,
    step: 100,
    value: [5000, 30000],
};

const items: SelectItem[] = [
    { value: '0', label: 'цена за номер/ночь (без налогов и сборов)' },
    { value: '1', label: 'цена за номер/ночь (вкл. налоги и сборы)' },
    { value: '3', label: 'итого (в т.ч. налоги и сборы)' },
];

const rangeItems: RangeItem[] = [
    { value: '1', label: '0 - 4000', minPrice: 0, maxPrice: 4000 },
    { value: '2', label: '4000 - 8000', minPrice: 4000, maxPrice: 8000 },
    { value: '3', label: '8000 - 12000', minPrice: 8000, maxPrice: 12000 },
    { value: '4', label: '12000 - 16000', minPrice: 12000, maxPrice: 16000 },
    { value: '5', label: '16000 - 20000', minPrice: 16000, maxPrice: 20000 },
    { value: '6', label: '>20000', minPrice: 20000, maxPrice: Infinity },
];

const ratingOptions: RangeListOption[] = [
    {
        value: '2',
        label: '<2',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '4',
        label: '4',
    },
    {
        value: '5',
        label: '5',
    },
];

const amenitiesOptions: RangeListOption[] = [
    { value: '1', label: 'Наличие бассейна' },
    { value: '2', label: 'Наличие wi-fi' },
    { value: '3', label: 'Наличие завтраков' },
];
const popularPresetsOptions: RangeListOption[] = [
    { value: '1', label: 'Андский' },
    { value: '2', label: 'Столичный' },
    { value: '3', label: 'Центральный' },
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
                <div className={styles.priceContainer}>
                    <PriceFilter
                        price={prices}
                        selectItems={items}
                        onPriceChange={() => {
                            // Price change handler
                        }}
                        onSelectChange={() => {
                            // Select change handler
                        }}
                        rangeItems={rangeItems}
                    />
                </div>
                <div className={styles.starRatingContainer}>
                    <StarRatingFilter
                        ratingOptions={ratingOptions}
                        selectedRatings={starRatings}
                        onRatingsChange={setStarRatings}
                    />
                </div>
                <div className={styles.reviewRatingContainer}>
                    <ReviewRatingFilter
                        ratingRange={reviewRatingRange}
                        onRatingRangeChange={setReviewRatingRange}
                    />
                </div>
                <div className={styles.amenitiesContainer}>
                    <AmenitiesFilter
                        amenities={amenitiesOptions}
                        selectedAmenities={amenities}
                        onAmenitiesChange={setAmenities}
                    />
                </div>
                <div className={styles.locationContainer}>
                    <LocationFilter popularPresets={popularPresetsOptions} />
                </div>
            </Box>
        </div>
    );
};
