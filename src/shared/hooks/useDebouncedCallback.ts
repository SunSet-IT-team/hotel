import { useCallback, useEffect, useRef } from 'react';

export function useDebouncedCallback<Args extends unknown[]>(
    callback: (...args: Args) => void,
    delayMs: number,
): (...args: Args) => void {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const latestCallbackRef = useRef<(...args: Args) => void>(callback);

    useEffect(() => {
        latestCallbackRef.current = callback;
    }, [callback]);

    useEffect(
        () => () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        },
        [],
    );

    return useCallback(
        (...args: Args) => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                latestCallbackRef.current(...args);
            }, delayMs);
        },
        [delayMs],
    );
}
