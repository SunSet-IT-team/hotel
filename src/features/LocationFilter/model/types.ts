export interface LocationOption {
    value: string;
    label: string;
}

export interface LocationFilterProps {
    /** Заголовок компонента */
    title?: string;
    /** Список популярных пресетов */
    popularPresets: LocationOption[];
    /** Выбранная локация */
    selectedLocation?: string;
    /** Callback при изменении выбора локации */
    onLocationChange?: (value: string) => void;
    /** Дополнительные CSS классы */
    className?: string;
}
