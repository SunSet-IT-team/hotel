import { type RangeListOption } from '@/shared/ui/RangeList/ui/RangeList';

export interface StarRatingFilterProps {
    /** Заголовок компонента */
    title?: string;
    /** Опции рейтинга (value должен быть string для совместимости с RangeList) */
    ratingOptions: RangeListOption[];
    /** Выбранные рейтинги */
    selectedRatings?: RangeListOption[];
    /** Callback при изменении рейтинга */
    onRatingsChange?: (ratings: RangeListOption[]) => void;
    /** Дополнительные CSS классы */
    className?: string;
}

export type { RangeListOption };
