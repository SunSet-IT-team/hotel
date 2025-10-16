'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

import { type FetchData, type LocationOption } from '@/features/SearchLocation/model/types';
import { Box, Button, SearchInput, Typography } from '@/shared/ui';
import { Popup } from '@/shared/ui/Popup';

import { SearchLocationSkeleton } from './SearchLocationSkeleton';

import styles from './SearchLocation.module.scss';

/**
 * Свойства компонента SearchLocation
 * @template T - Тип опции, расширяющий базовый интерфейс LocationOption
 */
interface Props<T extends LocationOption> {
    /**
     * Асинхронная функция для получения отфильтрованных данных от API
     * @param query - Поисковый запрос пользователя
     * @returns Promise с массивом опций типа T
     */
    fetchData: FetchData<T>;

    /**
     * Обработчик изменения значения в поле поиска
     * @param value - Новое значение поискового запроса
     */
    onChange: (value: string) => void;

    /** Текущее значение поискового запроса */
    value: string;

    /**
     * Начальный набор опций для отображения до выполнения поиска
     * @default []
     */
    options?: T[];

    /**
     * Обработчик выбора опции из результатов поиска
     * @param option - Выбранная пользователем опция
     */
    onSelect: (option: T) => void;

    /**
     * Дополнительные CSS классы для корневого элемента
     * @default undefined
     */
    className?: string;

    /**
     * Текст placeholder для пустого поля ввода
     * @default undefined
     */
    placeholder?: string;
}

/**
 * Компонент поиска локаций с выпадающим меню результатов
 *
 * @description
 * Реализует функциональность поиска городов/отелей с динамической подгрузкой
 * результатов от API. Отображает до 3 вариантов в выпадающем меню.
 *
 * @template T - Тип данных опций, должен расширять базовый интерфейс LocationOption
 *
 * @example
 * ```tsx
 * <SearchLocation
 *   value={searchQuery}
 *   onChange={setSearchQuery}
 *   onSelect={(city) => console.log(city)}
 *   fetchData={fetchCities}
 *   placeholder="Введите город"
 * />
 * ```
 */
export const SearchLocation = <T extends LocationOption>({
    onChange,
    value,
    onSelect,
    fetchData,
    options = [],
    className,
    placeholder,
}: Props<T>) => {
    // Состояние открытия/закрытия выпадающего меню
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Массив полученных от API результатов поиска
    const [responseData, setResponseData] = useState<T[]>(options);

    // Флаг процесса загрузки данных от API
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Ссылка на корневой DOM-элемент компонента
    const rootRef = useRef<HTMLDivElement>(null);

    /**
     * Обработчик закрытия выпадающего меню
     * Мемоизирован для предотвращения лишних ре-рендеров дочерних компонентов
     */
    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    /**
     * Обработчик открытия выпадающего меню
     * Мемоизирован для оптимизации производительности
     */
    const handleOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    /**
     * Обработчик изменения значения поиска
     * Открывает popup при вводе текста и сбрасывает предыдущие результаты
     */
    const handleChange = useCallback(
        (newValue: string) => {
            onChange(newValue);
            if (newValue.trim()) {
                setIsOpen(true);
                // Устанавливаем isLoading в true сразу при вводе
                setIsLoading(true);
                // Сбрасываем результаты при изменении запроса, чтобы показать скелетон
                setResponseData([]);
            } else {
                setIsLoading(false);
                setResponseData([]);
            }
        },
        [onChange],
    );

    /**
     * Обработчик выбора опции из результатов поиска
     * Закрывает меню и вызывает внешний callback с выбранной опцией
     */
    const handleSelect = useCallback(
        (item: T) => {
            onSelect(item);
            setIsOpen(false);
        },
        [onSelect],
    );

    /**
     * Вычисляемое значение: есть ли результаты для отображения
     * true - когда загрузка завершена и есть данные
     */
    const hasResults = useMemo(
        () => !isLoading && responseData.length > 0,
        [isLoading, responseData.length],
    );

    /**
     * Вычисляемое значение: пустой результат поиска
     * true - когда загрузка завершена, но результатов нет, и есть поисковый запрос
     */
    const isEmptyResult = useMemo(
        () => !isLoading && responseData.length === 0 && value.trim().length > 0,
        [isLoading, responseData.length, value],
    );

    return (
        <div className={clsx(styles.root, className)} ref={rootRef}>
            {/* Поле ввода с встроенной логикой debounce и запросов к API */}
            <SearchInput
                value={value}
                onChange={handleChange}
                fetchData={fetchData}
                onData={setResponseData}
                className={styles.searchInput}
                onClick={handleOpen}
                onLoadingChange={setIsLoading}
                placeholder={placeholder}
                fullWidth
            />

            {/* Выпадающее меню с результатами поиска */}
            {isOpen && (
                <Popup
                    isOpen={isOpen}
                    onClose={handleClose}
                    triggerRef={rootRef}
                    position="left"
                    matchTriggerWidth
                >
                    <Box className={styles.searchMenu} padding={20}>
                        {/* Заголовок меню */}
                        <Typography color="blue" className={styles.searchMenu__title}>
                            Город или страна
                        </Typography>

                        {/* Контейнер результатов поиска */}
                        <div className={styles.searchMenu__resultOptions}>
                            {/* Состояние загрузки: отображаем skeleton-загрузчики */}
                            {isLoading && <SearchLocationSkeleton />}

                            {/* Состояние успеха: отображаем результаты */}
                            {hasResults &&
                                responseData.map((item) => (
                                    <Button
                                        key={item.id}
                                        className={clsx(
                                            styles.searchMenu__resultOption,
                                            styles.resultOption,
                                        )}
                                        onClick={() => handleSelect(item)}
                                        fullWidth
                                    >
                                        {/* Название локации */}
                                        <Typography as="span" color="white" variant="h2">
                                            {item.name}
                                        </Typography>
                                        {/* Город/регион */}
                                        <Typography as="span" color="white">
                                            {item.city}
                                        </Typography>
                                    </Button>
                                ))}

                            {/* Состояние пустого результата */}
                            {isEmptyResult && <Typography>Ничего не нашлось</Typography>}
                        </div>
                    </Box>
                </Popup>
            )}
        </div>
    );
};
