'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { Container, Skeleton } from '@/shared/ui';
import { HotelPage } from '@/widgets/HotelPage';

/**
 * Контент страницы отеля с получением ID из URL
 */
const HotelContent = () => {
    const searchParams = useSearchParams();
    const hotelId = searchParams.get('id') || '1';

    return <HotelPage hotelId={hotelId} />;
};

/**
 * Страница отеля
 * Route: /hotel?id={hotelId}
 */
const Hotel = () => {
    return (
        <Suspense
            fallback={
                <div style={{ padding: '100px 0' }}>
                    <Container>
                        <Skeleton height={400} />
                    </Container>
                </div>
            }
        >
            <HotelContent />
        </Suspense>
    );
};

export default Hotel;
