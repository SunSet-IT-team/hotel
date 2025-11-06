'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { useIsMobile, useTranslation } from '@/shared/hooks';
import { Button } from '@/shared/ui';

import { type BookingButtonProps } from '../model/types';

import styles from './BookingButton.module.scss';

/**
 * Кнопка бронирования отеля
 * При клике либо вызывает callback, либо перенаправляет на страницу бронирования
 */
export const BookingButton: FC<BookingButtonProps> = ({ hotelId, className, onBooking }) => {
    const isMobile = useIsMobile();
    const translate = useTranslation();

    const router = useRouter();
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (onBooking) {
            onBooking(hotelId);
        } else {
            router.push(`/hotel?id=${hotelId}`);
        }
    };

    return (
        <Button
            variant="cyan"
            size={isMobile ? 'medium' : 'big'}
            onClick={handleClick}
            className={clsx(styles.root, className)}
            aria-label={`${translate.hotel.booking} ${hotelId}`}
        >
            {translate.hotel.booking}
        </Button>
    );
};
