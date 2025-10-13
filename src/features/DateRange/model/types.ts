/**
 * Типы для компонента DateRange
 */

import type { ISODate } from '@/shared/types/global.types';
import type { DateRange as DateRangeType } from '@/shared/ui/Calendar';

/**
 * Пропсы компонента DateRange
 */
export interface DateRangeProps {
    /** Значение диапазона дат в ISO формате */
    value: DateRangeType<ISODate>;
    /** Callback при изменении диапазона дат */
    onChange: (value: DateRangeType<ISODate>) => void;
    /** Дополнительные CSS классы */
    className?: string;
}
