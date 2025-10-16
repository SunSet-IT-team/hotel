import { type FC } from 'react';

import { Box } from '../../Box';

import { Skeleton } from './Skeleton';

/**
 * Скелетон для карточки отеля
 */
export const HotelCardSkeleton: FC<{ className?: string }> = ({ className }) => {
    return (
        <Box className={className}>
            <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
                {/* Изображение */}
                <Skeleton height={300} variant="rounded" />

                {/* Информация */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Название */}
                    <Skeleton width="60%" height={32} variant="text" />
                    {/* Адрес */}
                    <Skeleton width="80%" height={20} variant="text" />
                    {/* Рейтинг */}
                    <Skeleton width="40%" height={20} variant="text" />
                </div>

                {/* Отзывы */}
                <Skeleton height={100} variant="rounded" />

                {/* Цены */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Skeleton width="48%" height={80} variant="rounded" />
                    <Skeleton width="48%" height={80} variant="rounded" />
                </div>

                {/* Кнопка */}
                <Skeleton height={56} variant="rounded" />
            </div>
        </Box>
    );
};
