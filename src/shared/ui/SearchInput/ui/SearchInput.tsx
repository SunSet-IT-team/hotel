'use client';

import { useState } from 'react';

import { Input, type Props as InputProps } from '../../Input';
import useInputDebounce from '../hooks/useInputDebounce';

export interface Props<T> extends Omit<InputProps, 'value' | 'onChange'> {
    fetchData: (query: string) => Promise<T[]>;
    onData: (results: T[]) => void;
    delay?: number;
    resultsCount?: number;
    onError?: (error: unknown) => void;
    onLoadingChange?: (value: boolean) => void;
}

/** Базовый компонент input-поиска без меню с результатами */
export const SearchInput = <T,>({
    fetchData,
    onData,
    delay = 500,
    resultsCount = 3,
    onError,
    onLoadingChange,
    ...rest
}: Props<T>) => {
    const [queryString, setQueryString] = useState('');

    useInputDebounce<T>({
        queryString,
        fetchData,
        onLoadingChange,
        onData,
        onError,
        delay,
        resultsCount,
    });

    return (
        <Input
            {...rest} // сюда попадут и className, и onClick, и любые другие пропсы из InputProps
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
        />
    );
};
