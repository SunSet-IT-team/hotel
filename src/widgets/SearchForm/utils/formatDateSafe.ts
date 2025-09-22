/**
 * Безопасное форматирование даты в строку формата `YYYY-MM-DD`.
 *
 * @param d - Значение, которое может быть датой (`Date`), строкой (например, ISO-датой) или любым другим типом.
 *
 * @returns Строка в формате `YYYY-MM-DD`, если удалось корректно преобразовать:
 * - если `d` — строка, возвращается как есть;
 * - если `d` — объект `Date` с валидным временем, возвращается дата в ISO без времени;
 * - во всех остальных случаях возвращает `undefined`.
 *
 * @example
 * ```ts
 * formatDateSafe(new Date("2025-09-22")); // "2025-09-22"
 * formatDateSafe("2025-09-22"); // "2025-09-22"
 * formatDateSafe(null); // undefined
 * formatDateSafe("не дата"); // undefined
 * ```
 */
export const formatDateSafe = (d: unknown): string | undefined => {
    if (!d) return undefined;

    if (typeof d === 'string') {
        return d;
    }

    if (d instanceof Date && !Number.isNaN(d.getTime())) {
        return d.toISOString().split('T')[0];
    }

    return undefined;
};
