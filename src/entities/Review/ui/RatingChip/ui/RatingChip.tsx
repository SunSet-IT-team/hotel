'use client';

import { type FC } from 'react';

import { Chip, type ChipProps } from '@/shared/ui';

interface Props extends Omit<ChipProps, 'children'> {
    rating: number;
    maxRating?: number;
}

export const RatingChip: FC<Props> = ({ rating, maxRating = 10, ...rest }) => {
    return (
        <Chip
            role="note"
            aria-label={`Rating ${rating} out of ${maxRating}`}
            {...rest}
        >{`${rating}/${maxRating}`}</Chip>
    );
};
