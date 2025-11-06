'use client';

import { useMemo, useState } from 'react';

import { AmenitiesFilter } from '@/features/AmenitiesFilter';
import { LocationFilter } from '@/features/LocationFilter';
import {
    PriceFilter,
    type PriceRange,
    type PriceRangePreset,
    type PriceSelectOption,
} from '@/features/PriceFilter';
import { ReviewRatingFilter } from '@/features/ReviewRatingFilter';
import { StarRatingFilter } from '@/features/StarRatingFilter/ui/StarRatingFilter';
import { useTranslation } from '@/shared/hooks';
import { Box } from '@/shared/ui';
import { type RangeListOption } from '@/shared/ui/RangeList';

import styles from './FilterForm.module.scss';

export const FilterForm = () => {
    const translate = useTranslation();

    const prices: PriceRange = {
        max: 30000,
        min: 0,
        step: 100,
        value: [5000, 30000],
    };

    const items: PriceSelectOption[] = useMemo(
        () => [
            { value: '0', label: translate.filters.pricePerNightWithoutTaxes },
            { value: '1', label: translate.filters.pricePerNightWithTaxes },
            { value: '3', label: translate.filters.totalWithTaxes },
        ],
        [translate],
    );

    const rangeItems: PriceRangePreset[] = [
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

    const amenitiesOptions: RangeListOption[] = useMemo(
        () => [
            { value: '1', label: translate.filters.pool },
            { value: '2', label: translate.filters.wifi },
            { value: '3', label: translate.filters.breakfast },
        ],
        [translate],
    );

    const popularPresetsOptions: RangeListOption[] = [
        { value: '1', label: 'Андский' },
        { value: '2', label: 'Столичный' },
        { value: '3', label: 'Центральный' },
    ];

    // Состояния для всех фильтров
    const [starRatings, setStarRatings] = useState<RangeListOption[]>([]);
    const [reviewRatingRange, setReviewRatingRange] = useState<[number, number]>([1, 10]);
    const [amenities, setAmenities] = useState<RangeListOption[]>([]);

    return (
        <div className={styles.root}>
            <Box className={styles.box}>
                <div className={styles.priceContainer}>
                    <PriceFilter
                        title={translate.filters.price}
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
                        title={translate.filters.starRating}
                        ratingOptions={ratingOptions}
                        selectedRatings={starRatings}
                        onRatingsChange={setStarRatings}
                    />
                </div>
                <div className={styles.reviewRatingContainer}>
                    <ReviewRatingFilter
                        title={translate.filters.reviewRating}
                        ratingRange={reviewRatingRange}
                        onRatingRangeChange={setReviewRatingRange}
                    />
                </div>
                <div className={styles.amenitiesContainer}>
                    <AmenitiesFilter
                        title={translate.filters.amenitiesAndServices}
                        amenities={amenitiesOptions}
                        selectedAmenities={amenities}
                        onAmenitiesChange={setAmenities}
                    />
                </div>
                <div className={styles.locationContainer}>
                    <LocationFilter
                        title={translate.filters.location}
                        popularPresets={popularPresetsOptions}
                    />
                </div>
            </Box>
        </div>
    );
};
