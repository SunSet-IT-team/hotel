'use client';

import { useSyncExternalStore } from 'react';

const hasWindow = typeof window !== 'undefined';

const subscribe = (query: string, cb: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', cb);
    return () => mql.removeEventListener('change', cb);
};

const getSnapshot = (query: string) => {
    return hasWindow ? window.matchMedia(query).matches : false;
};

/**
 * Хук медиа-запроса.
 * @param query CSS media query, например "(max-width: 768px)"
 * @param serverValue значение на сервере "(по умолчанию false)"
 */
export const useMediaQuery = (query: string, serverValue = false) => {
    return useSyncExternalStore(
        (cb) => (hasWindow ? subscribe(query, cb) : () => {}),
        () => getSnapshot(query),
        () => serverValue,
    );
};

/**
 * Медиа запрос, реализующий useMediaQuery
 * @param maxWidth ширина экрана, при которой мы ожидаем получить true от хука. (по умолчанию - 768)
 */
export const useIsMobile = (maxWidth: number = 768) => {
    return useMediaQuery(`(max-width: ${maxWidth}px)`);
};
