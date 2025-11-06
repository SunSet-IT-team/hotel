'use client';

import { useCallback, useRef, useState } from 'react';

import { useTranslation } from '@/shared/hooks';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { Box, Button, RangeList, SearchInput, Typography } from '@/shared/ui';
import { type RangeListOption } from '@/shared/ui/RangeList';

import { mockFetchData, mockLocationData } from '../model/mockData';
import { type LocationFilterProps } from '../model/types';

import styles from './LocationFilter.module.scss';

/**
 * @Kempek
 *
 * TODO:
 *
 * Нужно прикрутить сюда модалку Popup
 */

export const LocationFilter = ({
    title,
    popularPresets,
    selectedLocation,
    onLocationChange,
    className,
}: LocationFilterProps) => {
    const translate = useTranslation();
    const displayTitle = title ?? translate.filters.location;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<RangeListOption[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>(selectedLocation || '');

    const rootRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useOutsideClick(rootRef, () => {
        setIsOpen(false);
    });

    const handleLocationChange = (value: RangeListOption[]) => {
        if (value.length > 0) {
            const selectedOption = value[0];
            onLocationChange?.(selectedOption.value);
            // Обновляем значение в input
            setSearchValue(selectedOption.label);
        } else {
            onLocationChange?.('');
            setSearchValue('');
        }
    };

    const handleLocationInputChange = (value: string) => {
        setSearchValue(value);
        onLocationChange?.(value);
    };

    const handleInputFocus = useCallback(() => {
        setIsOpen(true);
        // Показываем все районы при открытии меню
        setSearchResults(mockLocationData);
    }, []);

    const handleSearchResultSelect = (result: RangeListOption) => {
        onLocationChange?.(result.value);
        setSearchValue(result.label);
        setIsOpen(false);
    };

    // Используем мок-функцию из отдельного файла
    const fetchData = useCallback(mockFetchData, []);

    const isShowResults = !isLoading && searchResults.length > 0;
    const isZeroResults = !isLoading && searchResults.length === 0 && searchValue.trim().length > 0;

    return (
        <div className={`${className || ''}`} ref={rootRef}>
            <div className={styles.title}>
                <Typography variant="h5" as="span" color="blue" className={styles.titleText}>
                    {displayTitle}
                </Typography>
            </div>
            <div className={styles.selectContainer}>
                <SearchInput
                    onChange={handleLocationInputChange}
                    fetchData={fetchData}
                    onData={useCallback((results: RangeListOption[]) => {
                        setSearchResults(results);
                    }, [])}
                    onLoadingChange={setIsLoading}
                    value={searchValue}
                    placeholder={translate.filters.locationPlaceholder}
                    className={styles.searchInput}
                    onFocus={handleInputFocus}
                    onClick={handleInputFocus}
                />

                {isOpen && (
                    <div ref={menuRef} className={styles.searchMenu}>
                        <Box className={styles.searchMenuBox}>
                            <Typography color="blue" className={styles.searchMenu__title}>
                                {translate.filters.searchResults}
                            </Typography>
                            <div className={styles.searchMenu__resultOptions}>
                                {isShowResults &&
                                    searchResults.map((item) => (
                                        <Button
                                            key={item.value}
                                            className={styles.searchMenu__resultOption}
                                            onClick={() => handleSearchResultSelect(item)}
                                            fullWidth
                                        >
                                            <Typography as="span" color="white" variant="h2">
                                                {item.label}
                                            </Typography>
                                        </Button>
                                    ))}

                                {isZeroResults && (
                                    <Typography>{translate.filters.noResults}</Typography>
                                )}
                            </div>
                        </Box>
                    </div>
                )}
            </div>
            <div className={styles.rangeListContainer}>
                <Box className={styles.rangeListBox}>
                    <RangeList
                        options={popularPresets}
                        onChange={handleLocationChange}
                        selectionMode="single"
                        hideBorder={false}
                        selectedItems={
                            selectedLocation
                                ? [
                                      {
                                          value: selectedLocation,
                                          label: searchValue,
                                          id: selectedLocation,
                                      },
                                  ]
                                : []
                        }
                        className={styles.rangeList}
                    />
                </Box>
            </div>
        </div>
    );
};
