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
 * @param serverValue значение на сервере (по умолчанию false)
 */
export const useMediaQuery = (query: string, serverValue = false) => {
    return useSyncExternalStore(
        (cb) => (hasWindow ? subscribe(query, cb) : () => {}),
        () => getSnapshot(query),
        () => serverValue,
    );
};

export const useIsMobile = (maxWidth = 768) => {
    return useMediaQuery(`(max-width: ${maxWidth}px)`);
};
