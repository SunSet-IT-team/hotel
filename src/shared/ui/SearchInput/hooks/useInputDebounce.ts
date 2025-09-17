import { useEffect, useMemo } from 'react';

type Debounced<A extends unknown[]> = ((...args: A) => void) & { cancel: () => void };

function debounce<A extends unknown[]>(func: (...args: A) => unknown, delay: number): Debounced<A> {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const debounced = (...args: A) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };

    debounced.cancel = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };

    return debounced;
}

interface UseInputDebounceArgs<T> {
    queryString: string;
    fetchData: (query: string) => Promise<T[]>;
    onData: (data: T[]) => void;
    delay: number;
    resultsCount: number;
    onLoadingChange?: (value: boolean) => void;
    onError?: (error: unknown) => void;
}

export const useInputDebounce = <T>({
    queryString,
    fetchData,
    onData,
    delay,
    resultsCount,
    onLoadingChange,
    onError,
}: UseInputDebounceArgs<T>): void => {
    const debouncedSearch = useMemo(
        () =>
            debounce<[string]>(async (q) => {
                if (!q.trim()) {
                    onData([]);
                    return;
                }
                onLoadingChange?.(true);
                try {
                    const data = await fetchData(q);
                    onData(data.slice(0, resultsCount));
                } catch (e: unknown) {
                    onError?.(e);
                } finally {
                    onLoadingChange?.(false);
                }
            }, delay),
        [delay, resultsCount],
    );

    useEffect(() => {
        debouncedSearch(queryString);
        return () => debouncedSearch.cancel();
    }, [queryString, debouncedSearch]);
};

export default useInputDebounce;
