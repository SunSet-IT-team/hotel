import { type FC } from 'react';

import { Container } from '../../Container';

import { HotelCardSkeleton } from './HotelCardSkeleton';
import { Skeleton } from './Skeleton';

/**
 * Скелетон для страницы поиска отелей
 */
export const SearchHotelsSkeleton: FC = () => {
    return (
        <div style={{ minHeight: '100vh', paddingTop: '270px', paddingBottom: '60px' }}>
            <Container>
                {/* Заголовок */}
                <div style={{ paddingTop: '21px', marginBottom: '32px' }}>
                    <Skeleton width="40%" height={48} variant="text" />
                </div>

                {/* Контент: фильтры + карточки отелей */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '476px 1fr',
                        gap: '31px',
                        paddingBottom: '21px',
                    }}
                >
                    {/* Фильтры слева */}
                    <aside>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <Skeleton height={200} variant="rounded" />
                            <Skeleton height={150} variant="rounded" />
                            <Skeleton height={180} variant="rounded" />
                            <Skeleton height={160} variant="rounded" />
                        </div>
                    </aside>

                    {/* Список отелей справа */}
                    <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {[...Array(3)].map((_, i) => (
                            <HotelCardSkeleton key={i} />
                        ))}
                    </section>
                </div>
            </Container>
        </div>
    );
};
