'use client';

import { useSyncExternalStore } from 'react';

import { BREAKPOINTS } from '@/shared/constants/breakpoints';

const hasWindow = typeof window !== 'undefined';

// Кеш для MediaQueryList объектов
const mediaQueryCache = new Map<string, MediaQueryList>();

const getMediaQueryList = (query: string): MediaQueryList | null => {
    if (!hasWindow) return null;

    if (!mediaQueryCache.has(query)) {
        mediaQueryCache.set(query, window.matchMedia(query));
    }

    return mediaQueryCache.get(query) || null;
};

const subscribe = (query: string, cb: () => void) => {
    const mql = getMediaQueryList(query);
    if (!mql) return () => {};

    mql.addEventListener('change', cb);
    return () => mql.removeEventListener('change', cb);
};

const getSnapshot = (query: string) => {
    const mql = getMediaQueryList(query);
    return mql ? mql.matches : false;
};

/**
 * Хук медиа-запроса.
 * @param query CSS media query, например "(max-width: 768px)"
 * @param serverValue значение на сервере (по умолчанию false)
 */
export const useMediaQuery = (query: string, serverValue = false) => {
    return useSyncExternalStore(
        (cb) => subscribe(query, cb),
        () => getSnapshot(query),
        () => serverValue,
    );
};

/**
 * Хук для проверки мобильного устройства (max-width: 768px)
 * Оптимизирован с кешированием MediaQueryList
 */
export const useIsMobile = () => {
    return useMediaQuery(`(max-width: ${BREAKPOINTS.mobile}px)`);
};

/**
 * Хук для проверки планшета (max-width: 1024px)
 */
export const useIsTablet = () => {
    return useMediaQuery(`(max-width: ${BREAKPOINTS.tablet}px)`);
};

/**
 * Хук для проверки десктопа (min-width: 1280px)
 */
export const useIsDesktop = () => {
    return useMediaQuery(`(min-width: ${BREAKPOINTS.desktop}px)`);
};

/**
 * @deprecated Используйте useIsMobile() без параметра
 * Кастомный breakpoint для обратной совместимости
 */
export const useIsMobileCustom = (maxWidth: number) => {
    return useMediaQuery(`(max-width: ${maxWidth}px)`);
};
