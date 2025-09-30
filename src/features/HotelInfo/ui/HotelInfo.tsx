import { type FC } from 'react';
import clsx from 'clsx';

import { AmenitiesIcon, MapIcon, StarIcon } from '@/shared/assets/icons';
import { useIsMobile } from '@/shared/hooks/useMediaQuery';
import { Box, Typography } from '@/shared/ui';

import { type HotelInfoProps } from '../model/types';

import styles from './HotelInfo.module.scss';

export const HotelInfo: FC<HotelInfoProps> = ({
    hotelName,
    starRating,
    address,
    variant = 'default',
    mapLink = '#',
    rating,
    reviewCount,
    amenities,
    reviewsLink = '#',
    className,
}) => {
    const renderStars = (count: number) => {
        return Array.from({ length: count }, (_, index) => (
            <StarIcon key={index} className={styles.starIcon} />
        ));
    };
    const isMobile = useIsMobile(768);

    return (
        <div className={clsx(styles.root, styles[variant], className)}>
            {/* Название отеля и звезды */}
            <div className={styles.header}>
                <Typography
                    variant={isMobile ? 'h4' : 'h5'}
                    as="h2"
                    color="blue"
                    className={styles.hotelName}
                >
                    {hotelName}
                </Typography>
                <div className={styles.stars}>{renderStars(starRating)}</div>
            </div>

            {/* Рейтинг и отзывы (только для detailed варианта) */}
            {variant === 'detailed' && (rating || reviewCount) && (
                <div className={styles.reviews}>
                    {rating && (
                        <Box className={styles.rating}>
                            <Typography
                                variant="h3"
                                as="span"
                                color="dark"
                                className={styles.ratingText}
                            >
                                {rating}/10
                            </Typography>
                        </Box>
                    )}
                    <Typography variant="h3" as="span" color="dark" className={styles.reviewStatus}>
                        Хорошо
                    </Typography>
                    {reviewCount && (
                        <Typography variant="h3" as="span" color="#2DC1DB82">
                            <a className={styles.reviewCount} href={reviewsLink}>
                                {reviewCount} отзыва{' '}
                            </a>
                        </Typography>
                    )}
                </div>
            )}

            {/* Адрес и ссылка на карту */}
            <div className={styles.location}>
                <MapIcon className={styles.mapIcon} />
                <div className={styles.addressContainer}>
                    <Typography variant="h3" as="span" color="dark" className={styles.address}>
                        {address}
                    </Typography>

                    <Typography variant="h3" as="span" color="blue">
                        <a className={styles.mapLink} href={mapLink}>
                            {isMobile ? 'На карте' : 'Посмотреть на карте'}
                        </a>
                    </Typography>
                </div>
            </div>

            {/* Удобства (только для detailed варианта) */}
            {variant === 'detailed' && amenities && amenities.length > 0 && (
                <div className={styles.amenities}>
                    <AmenitiesIcon className={styles.amenitiesIcon} />
                    <Typography
                        variant="h3"
                        as="span"
                        color="dark"
                        className={styles.amenitiesText}
                    >
                        {amenities.join(', ')}
                    </Typography>
                </div>
            )}
        </div>
    );
};
