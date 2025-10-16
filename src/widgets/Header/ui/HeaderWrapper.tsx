'use client';

import { usePathname } from 'next/navigation';

import { Header } from './Header';

/**
 * Обертка для Header, которая определяет variant в зависимости от текущего пути
 */
export const HeaderWrapper = () => {
    const pathname = usePathname();

    // Определяем, на каких страницах нужен прозрачный фон
    const isTransparentBg = pathname === '/' || pathname?.startsWith('/search/hotels');

    return <Header variant={isTransparentBg ? 'transparent' : 'withSolidBg'} />;
};
