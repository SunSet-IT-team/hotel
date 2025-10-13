'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui';

import { type BookingButtonProps } from '../model/types';

import styles from './BookingButton.module.scss';

/**
 * Кнопка бронирования отеля
 * При клике либо вызывает callback, либо перенаправляет на страницу бронирования
 */
export const BookingButton: FC<BookingButtonProps> = ({ hotelId, className, onBooking }) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (onBooking) {
            onBooking(hotelId);
        } else {
            // Дефолтное поведение - переход на страницу бронирования
            // router.push(ROUTES.BOOKING(hotelId));
        }
    };

    return (
        <Button
            variant="cyan"
            size="big"
            onClick={handleClick}
            className={clsx(styles.root, className)}
            aria-label={`Забронировать отель ${hotelId}`}
        >
            Забронировать
        </Button>
    );
};
