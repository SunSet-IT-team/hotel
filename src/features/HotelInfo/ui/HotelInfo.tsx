import { type FC } from 'react';
import clsx from 'clsx';

import { AmenitiesIcon, MapIcon } from '@/shared/assets/icons';
import { useIsMobile } from '@/shared/hooks/useMediaQuery';
import { Box, StarRating, Typography } from '@/shared/ui';

import { type HotelInfoProps } from '../model/types';

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
    const isMobile = useIsMobile(768);

    // Генерируем ссылку на Яндекс.Карты на основе адреса
    const yandexMapLink = `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;

    // Определяем статус отзывов на основе рейтинга
    const getReviewStatus = (rating: number): string => {
        if (rating >= 9) return 'Отлично';
        if (rating >= 7.0) return 'Хорошо';
        return 'Плохо';
    };

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
                <StarRating
                    count={starRating}
                    className={styles.stars}
                    classNameStar={styles.starIcon}
                />
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
                        {rating ? getReviewStatus(rating) : 'Хорошо'}
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
                        <a
                            className={styles.mapLink}
                            href={yandexMapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
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
