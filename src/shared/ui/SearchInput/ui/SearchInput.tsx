'use client';

import { Input, type InputProps } from '../../Input';
import useInputDebounce from '../hooks/useInputDebounce';

export interface Props<T> extends Omit<InputProps, 'value' | 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    fetchData: (query: string) => Promise<T[]>;
    onData: (results: T[]) => void;
    delay?: number;
    resultsCount?: number;
    onError?: (error: unknown) => void;
    onLoadingChange?: (value: boolean) => void;
}

/** Базовый компонент input-поиска без меню с результатами */
export const SearchInput = <T,>({
    value,
    onChange,
    fetchData,
    onData,
    delay = 500,
    resultsCount = 3,
    onError,
    onLoadingChange,
    ...rest
}: Props<T>) => {
    useInputDebounce<T>({
        queryString: value,
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
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};
