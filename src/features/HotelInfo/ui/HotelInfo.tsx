import { type FC } from 'react';
import clsx from 'clsx';

import { type HotelInfoProps } from '../model/types';

import { HotelAmenities } from './HotelAmenities';
import { HotelHeader } from './HotelHeader';
import { HotelLocation } from './HotelLocation';
import { HotelReviews } from './HotelReviews';

import styles from './HotelInfo.module.scss';

export const HotelInfo: FC<HotelInfoProps> = ({
    hotelName,
    starRating,
    address,
    variant = 'default',
    rating,
    reviewCount,
    amenities,
    reviewsLink = '#',
    className,
}) => {
    const isDetailed = variant === 'detailed';

    return (
        <div className={clsx(styles.root, className)}>
            <HotelHeader hotelName={hotelName} starRating={starRating} variant={variant} />

            {isDetailed && (
                <HotelReviews rating={rating} reviewCount={reviewCount} reviewsLink={reviewsLink} />
            )}

            <HotelLocation address={address} variant={variant} />

            {isDetailed && amenities && <HotelAmenities amenities={amenities} />}
        </div>
    );
};
