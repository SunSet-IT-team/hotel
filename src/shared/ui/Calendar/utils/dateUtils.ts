import { type DateRange } from '../model/types';

/**
 *
 * @param date
 * @param isUSWeek
 * @returns
 */
export const getFirstDayOfMonth = (date: Date, isUSWeek: boolean) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let dayOfWeek = firstDay.getDay();

    if (!isUSWeek) {
        dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    }

    return dayOfWeek;
};

/**
 *
 * @param date
 * @returns
 */
export const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/**
 *
 * @param monthDate
 * @param isUSWeek
 * @returns
 */
export const generateCalendarDays = (monthDate: Date, isUSWeek: boolean) => {
    const firstDay = getFirstDayOfMonth(monthDate, isUSWeek);
    const daysInMonth = getDaysInMonth(monthDate);
    const days: Array<Date | null> = [];

    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day));
    }

    return days;
};

/**
 * Проверяет, является ли день концом диапазона
 */
export const isRangeEnd = (date: Date | null, selectedRange: DateRange): boolean => {
    // Проверяем что date существует и не null
    if (!date || !selectedRange.endDate) return false;
    return date.getTime() === selectedRange.endDate.getTime();
};

/**
 * Проверяет, является ли день началом диапазона
 */
export const isRangeStart = (date: Date | null, selectedRange: DateRange): boolean => {
    // Проверяем что date существует и не null
    if (!date || !selectedRange.startDate) return false;
    return date.getTime() === selectedRange.startDate.getTime();
};

/**
 * Проверяет, находится ли день внутри диапазона (исключая границы)
 */
export const isInRange = (date: Date | null, selectedRange: DateRange): boolean => {
    if (!date || !selectedRange.startDate || !selectedRange.endDate) return false;
    const dateTime = date.getTime();
    const startTime = selectedRange.startDate.getTime();
    const endTime = selectedRange.endDate.getTime();
    return dateTime > startTime && dateTime < endTime;
};

/**
 * Проверяет, находится ли день в полном диапазоне (включая границы)
 */
export const isInFullRange = (date: Date | null, selectedRange: DateRange): boolean => {
    if (!date || !selectedRange.startDate || !selectedRange.endDate) return false;
    const dateTime = date.getTime();
    const startTime = selectedRange.startDate.getTime();
    const endTime = selectedRange.endDate.getTime();
    return dateTime >= startTime && dateTime <= endTime;
};
