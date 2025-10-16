import { type FC, useMemo } from 'react';
import clsx from 'clsx';

import { mockHotels } from '@/entities/hotel';
import { Amenities } from '@/features/Amenities';
import { BookingButton } from '@/features/BookingButton';
import { HotelInfo } from '@/features/HotelInfo';
import { ImageSlider } from '@/features/ImageSlider';
import { PricesSlider } from '@/features/PricesSlider';
import { ReviewsSlider } from '@/features/ReviewsSlider';
import { AmenitiesIcon } from '@/shared/assets/icons';
import { Container, Typography } from '@/shared/ui';

import { type HotelPageProps } from '../model/types';

import styles from './HotelPage.module.scss';

/**
 * Виджет страницы отеля
 * Отображает полную информацию об отеле: слайдер, описание, удобства, отзывы, цены
 */
export const HotelPage: FC<HotelPageProps> = ({ hotelId, className }) => {
    // Находим отель по ID в моковых данных
    const hotel = useMemo(() => {
        return mockHotels.find((h) => h.id === hotelId) || mockHotels[0];
    }, [hotelId]);

    // Преобразуем удобства в формат для компонента Amenities
    const amenitiesWithIcons = useMemo(() => {
        return (hotel.amenities || []).map((amenity) => ({
            label: amenity,
            icon: <AmenitiesIcon />,
        }));
    }, [hotel.amenities]);

    if (!hotel) {
        return (
            <div className={clsx(styles.root, className)}>
                <Container>
                    <Typography variant="h1" color="dark">
                        Отель не найден
                    </Typography>
                </Container>
            </div>
        );
    }

    return (
        <div className={clsx(styles.root, className)}>
            <Container className={styles.container}>
                {/* Слайдер изображений */}
                <section className={styles.imageSection}>
                    <ImageSlider slides={hotel.images} hotelName={hotel.name} slidesPerView={1} />
                </section>

                {/* Информация об отеле */}
                <section className={styles.infoSection}>
                    <HotelInfo
                        hotelName={hotel.name}
                        starRating={hotel.starRating}
                        address={hotel.address}
                        rating={hotel.rating}
                        reviewCount={hotel.reviewCount}
                        variant="detailed"
                        className={styles.hotelInfo}
                    />
                </section>

                {/* Описание отеля */}
                {hotel.description && (
                    <section className={styles.descriptionSection}>
                        <Typography variant="h5" color="blue" className={styles.sectionTitle}>
                            Описание
                        </Typography>
                        <Typography variant="h3" color="dark">
                            {hotel.description}
                        </Typography>
                        {hotel.distanceFromCenter && (
                            <Typography variant="h3" color="dark" className={styles.distance}>
                                Расстояние от центра: {hotel.distanceFromCenter} км
                            </Typography>
                        )}
                    </section>
                )}

                {/* Удобства */}
                {amenitiesWithIcons.length > 0 && (
                    <section className={styles.amenitiesSection}>
                        <Amenities amenities={amenitiesWithIcons} title="Удобства" />
                    </section>
                )}

                {/* Отзывы */}
                {hotel.reviews && hotel.reviews.length > 0 && (
                    <section className={styles.reviewsSection}>
                        <ReviewsSlider reviews={hotel.reviews} slidesPerView={1} />
                    </section>
                )}

                {/* Цены */}
                <section className={styles.pricesSection}>
                    <PricesSlider prices={hotel.prices} />
                </section>

                {/* Кнопка бронирования */}
                <section className={styles.bookingSection}>
                    <BookingButton hotelId={hotel.id} />
                </section>
            </Container>
        </div>
    );
};
