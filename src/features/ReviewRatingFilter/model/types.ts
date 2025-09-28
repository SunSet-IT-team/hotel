export interface ReviewRatingFilterProps {
    /** Заголовок компонента */
    title?: string;
    /** Минимальное значение рейтинга */
    minRating?: number;
    /** Максимальное значение рейтинга */
    maxRating?: number;
    /** Текущий диапазон рейтинга [min, max] */
    value?: [number, number];
    /** Callback при изменении рейтинга */
    onRatingChange?: (value: [number, number]) => void;
    /** Шаг изменения рейтинга */
    step?: number;
    /** Дополнительные CSS классы */
    className?: string;
}
