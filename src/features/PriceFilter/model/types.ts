/**
 * Типы для компонента PriceFilter
 */

export interface PriceProp {
    /** Минимальное значение диапазона */
    min: number;
    /** Максимальное значение диапазона */
    max: number;
    /** Шаг изменения значений */
    step?: number;
    /** Опциональное начальное значение [min, max] */
    value?: [number, number];
}

export interface SelectItem {
    /** Значение опции */
    value: string;
    /** Отображаемый текст опции */
    label: string;
}

export interface RangeItem {
    /** Значение диапазона */
    value: string;
    /** Отображаемый текст диапазона */
    label: string;
    /** Минимальная цена в диапазоне */
    minPrice?: number;
    /** Максимальная цена в диапазоне */
    maxPrice?: number;
}

export interface PriceFilterProps {
    /** Заголовок компонента */
    title?: string;
    /** Настройки диапазона цен */
    price: PriceProp;
    /** Опции для селекта периода */
    selectItems: SelectItem[];
    /** Предустановленные диапазоны цен для RangeList */
    rangeItems?: RangeItem[];
    /** Callback при изменении диапазона цен */
    onPriceChange?: (range: [number, number]) => void;
    /** Callback при изменении выбранного периода */
    onSelectChange?: (value: string) => void;
    /** Дополнительные CSS классы */
    className?: string;
}
