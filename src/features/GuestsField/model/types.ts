import type { GuestsCount } from '@/entities/booking';

/**
 * Тип стейта, с которым работает компонент GuestsField
 * Первое значение - число взрослых, второе - число детей.
 * @see {@link GuestsField}
 */
export type GuestsFieldValue = GuestsCount;

/**
 * Пропсы компонента GuestsField
 */
export interface GuestsFieldProps {
    /** Дополнительные CSS классы */
    className?: string;
    /** Текущее значение (количество взрослых и детей) */
    value: GuestsFieldValue;
    /** Callback при изменении значения */
    onChange: (value: GuestsFieldValue) => void;
}
