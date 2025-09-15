'use client';

import clsx from 'clsx';
import { useRef, useState } from 'react';

import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { Box, Button, SearchInput, Typography } from '@/shared/ui';
import { Skeleton } from '@/shared/ui/Skeleton';

import { FetchData, Option } from '../model/types';
import styles from './SearchLocation.module.scss';

interface Props<T extends Option> {
    fetchData: FetchData<T>;
    onSelect?: (option: T) => void;
    className?: string;
}

export const SearchLocation = <T extends Option>({ onSelect, fetchData, className }: Props<T>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const rootRef = useRef<HTMLDivElement>(null);
    useOutsideClick(rootRef, () => {
        setIsOpen(false);
    });

    const isShowResults = !isLoading && responseData.length;
    const isZeroResults = !isLoading && !responseData.length;

    return (
        <div className={clsx(styles.root, className)} ref={rootRef}>
            <SearchInput
                fetchData={fetchData}
                onData={setResponseData}
                className={styles.searchInput}
                onClick={() => setIsOpen(true)}
                onLoadingChange={(v) => setIsLoading(v)}
                fullWidth
            />
            {isOpen && (
                <Box className={styles.searchMenu} padding={10}>
                    <Typography color="blue" className={styles.searchMenu__title}>
                        Город или страна
                    </Typography>
                    <div className={styles.searchMenu__resultOptions}>
                        {isLoading && (
                            <>
                                <Skeleton className={styles.searchMenu__resultOption} />
                                <Skeleton className={styles.searchMenu__resultOption} />
                                <Skeleton className={styles.searchMenu__resultOption} />
                            </>
                        )}

                        {isShowResults &&
                            responseData.map((item) => (
                                <Button
                                    key={item.id}
                                    className={clsx(
                                        styles.searchMenu__resultOption,
                                        styles.resultOption,
                                    )}
                                    onClick={() => onSelect?.(item)}
                                    fullWidth
                                >
                                    <Typography as="span" color="white" variant="h2">
                                        {item.name}
                                    </Typography>
                                    <Typography as="span" color="white">
                                        {item.city}
                                    </Typography>
                                </Button>
                            ))}

                        {isZeroResults && <Typography>Ничего не нашлось</Typography>}
                    </div>
                </Box>
            )}
        </div>
    );
};
