import { useEffect, useState } from 'react';

import { RangeSlider, Typography } from '@/shared/ui';

import { type ReviewRatingFilterProps } from '../model/types';

import styles from './ReviewRatingFilter.module.scss';

export const ReviewRatingFilter = ({
    title = 'Рейтинг по отзывам',
    minRating = 1,
    maxRating = 10,
    ratingRange = [1, 10],
    onRatingRangeChange,
    step = 0.5,
    className,
}: ReviewRatingFilterProps) => {
    // Внутреннее состояние для диапазона рейтинга
    const [internalRatingRange, setInternalRatingRange] = useState<[number, number]>(ratingRange);

    // Синхронизируем внутреннее состояние с внешним
    useEffect(() => {
        setInternalRatingRange(ratingRange);
    }, [ratingRange]);

    const handleRatingChange = (newValue: [number, number]) => {
        setInternalRatingRange(newValue);
        onRatingRangeChange?.(newValue);
    };

    return (
        <div className={`${className || ''}`}>
            <div className={styles.title}>
                <Typography variant="h5" as="span" color="blue" className={styles.titleText}>
                    {title}
                </Typography>
            </div>
            <div className={styles.sliderContainer}>
                <RangeSlider
                    min={minRating}
                    max={maxRating}
                    value={internalRatingRange}
                    onChange={handleRatingChange}
                    step={step}
                    variant="roundedThumbs"
                    fullWidth={true}
                    options={{
                        renderDisplayedValues: (value, type) => String(Math.round(value * 10) / 10),
                        thumbs: { toggleVisible: false },
                    }}
                />
            </div>
        </div>
    );
};
