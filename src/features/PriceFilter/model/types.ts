/**
 * Типы для компонента PriceFilter
 */

/**
 * Диапазон цен
 */
export interface PriceRange {
    /** Минимальное значение диапазона */
    min: number;
    /** Максимальное значение диапазона */
    max: number;
    /** Шаг изменения значений */
    step?: number;
    /** Опциональное начальное значение [min, max] */
    value?: [number, number];
}

/**
 * Опция для выбора периода оплаты
 */
export interface PriceSelectOption {
    /** Значение опции */
    value: string;
    /** Отображаемый текст опции */
    label: string;
}

/**
 * Предустановленный диапазон цен
 */
export interface PriceRangePreset {
    /** Значение диапазона */
    value: string;
    /** Отображаемый текст диапазона */
    label: string;
    /** Минимальная цена в диапазоне */
    minPrice?: number;
    /** Максимальная цена в диапазоне */
    maxPrice?: number;
}

/**
 * Пропсы компонента PriceFilter
 */
export interface PriceFilterProps {
    /** Заголовок компонента */
    title?: string;
    /** Настройки диапазона цен */
    price: PriceRange;
    /** Опции для селекта периода */
    selectItems: PriceSelectOption[];
    /** Предустановленные диапазоны цен для RangeList */
    rangeItems?: PriceRangePreset[];
    /** Callback при изменении диапазона цен */
    onPriceChange?: (range: [number, number]) => void;
    /** Callback при изменении выбранного периода */
    onSelectChange?: (value: string) => void;
    /** Дополнительные CSS классы */
    className?: string;
}
