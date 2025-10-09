import { type RangeListOption } from '@/shared/ui/RangeList';

export interface AmenitiesFilterProps {
    /** Заголовок компонента */
    title?: string;
    /** Список доступных удобств */
    amenities: RangeListOption[];
    /** Выбранные удобства */
    selectedAmenities?: RangeListOption[];
    /** Callback при изменении выбора */
    onAmenitiesChange?: (amenities: RangeListOption[]) => void;
    /** Дополнительные CSS классы */
    className?: string;
}

export type { RangeListOption };
