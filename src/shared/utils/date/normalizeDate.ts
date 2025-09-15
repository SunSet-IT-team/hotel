/**
 * Нормализует дату к полуночи (00:00:00.000) в локальной таймзоне.
 *
 * @param dateString Строка, совместимая с конструктором `Date` (ISO, `YYYY-MM-DD`, и т.п.).
 * @returns Объект `Date` с обнулённой частью времени (локальное время).
 *
 * @example
 * normalizeDate('2025-09-15T12:34:56Z'); // -> Date с временем 00:00:00.000 локально
 *
 * @remarks
 * - Время обнуляется в **локальной** таймзоне среды выполнения (браузер/Node.js).
 * - При некорректной строке вернётся `Invalid Date`. Проверяйте через `isNaN(result.getTime())`.
 */
export const normalizeDate = (dateString: string): Date => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
};
