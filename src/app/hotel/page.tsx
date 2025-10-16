'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { HotelPageSkeleton } from '@/shared/ui';
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
        <Suspense fallback={<HotelPageSkeleton />}>
            <HotelContent />
        </Suspense>
    );
};

export default Hotel;
