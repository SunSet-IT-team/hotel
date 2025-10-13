/**
 * Опция локации (город/отель)
 */
export interface LocationOption {
    /** Уникальный идентификатор */
    id: number;
    /** Название локации */
    name: string;
    /** Город/регион */
    city: string;
}

/**
 * Функция для получения данных локаций по поисковому запросу
 */
export type FetchData<T extends LocationOption> = (query: string) => Promise<T[]>;

/**
 * Пропсы компонента SearchLocation
 */
export interface SearchLocationProps<T extends LocationOption = LocationOption> {
    /** Асинхронная функция для получения данных от API */
    fetchData: FetchData<T>;
    /** Обработчик изменения значения в поле поиска */
    onChange: (value: string) => void;
    /** Текущее значение поискового запроса */
    value: string;
    /** Начальный набор опций для отображения */
    options?: T[];
    /** Обработчик выбора опции из результатов поиска */
    onSelect: (option: T) => void;
    /** Дополнительные CSS классы */
    className?: string;
    /** Текст placeholder */
    placeholder?: string;
}
