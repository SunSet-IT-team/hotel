import { RangeSlider, Typography } from '@/shared/ui';

import { type ReviewRatingFilterProps } from '../model/types';

import styles from './ReviewRatingFilter.module.scss';

export const ReviewRatingFilter = ({
    title = 'Рейтинг по отзывам',
    minRating = 1,
    maxRating = 10,
    value = [1, 10],
    onRatingChange,
    step = 0.5,
    className,
}: ReviewRatingFilterProps) => {
    const handleRatingChange = (newValue: [number, number]) => {
        onRatingChange?.(newValue);
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
                    value={value}
                    onChange={handleRatingChange}
                    step={step}
                    variant="roundedThumbs"
                    fullWidth={true}
                    options={{
                        renderDisplayedValues: (value, type) => String(Math.round(value * 10) / 10),
                        thumbs: {
                            visibleTime: 2000,
                            toggleVisible: false,
                        },
                    }}
                />
            </div>
        </div>
    );
};
