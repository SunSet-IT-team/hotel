import { type FC } from 'react';

import { Container } from '../../Container';

import { Skeleton } from './Skeleton';

/**
 * Скелетон для страницы отеля
 */
export const HotelPageSkeleton: FC = () => {
    return (
        <div style={{ padding: '148px 0 80px', minHeight: '100vh' }}>
            <Container>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {/* Слайдер изображений */}
                    <Skeleton height={400} variant="rounded" />

                    {/* Информация об отеле */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Skeleton width="50%" height={48} variant="text" />
                        <Skeleton width="70%" height={24} variant="text" />
                        <Skeleton width="30%" height={24} variant="text" />
                    </div>

                    {/* Описание */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Skeleton width="20%" height={32} variant="text" />
                        <Skeleton width="100%" height={20} variant="text" />
                        <Skeleton width="100%" height={20} variant="text" />
                        <Skeleton width="80%" height={20} variant="text" />
                    </div>

                    {/* Удобства */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Skeleton width="20%" height={32} variant="text" />
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                gap: '12px',
                            }}
                        >
                            {[...Array(6)].map((_, i) => (
                                <Skeleton key={i} height={60} variant="rounded" />
                            ))}
                        </div>
                    </div>

                    {/* Отзывы */}
                    <Skeleton height={200} variant="rounded" />

                    {/* Цены */}
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Skeleton width="32%" height={120} variant="rounded" />
                        <Skeleton width="32%" height={120} variant="rounded" />
                        <Skeleton width="32%" height={120} variant="rounded" />
                    </div>

                    {/* Кнопка бронирования */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Skeleton width={300} height={60} variant="rounded" />
                    </div>
                </div>
            </Container>
        </div>
    );
};
