import { formatDateSafe } from './formatDateSafe';

/**
 * Собирает URL для страницы поиска с GET-параметрами на основе данных формы.
 *
 * Поддерживаемые поля в `data`:
 * - `query` — поисковая строка;
 * - `destination` — объект { id, name, city? } или `null`;
 * - `dateRange` — объект { startDate, endDate } где `startDate`/`endDate` могут быть `Date`, ISO-строкой или `null`;
 * - `peoplesCount` — кортеж [adults, children] (числа) или `null`.
 *
 * Даты форматируются функцией `formatDateSafe`:
 * - если передана строка — возвращается как есть;
 * - если передан `Date` — форматируется в `YYYY-MM-DD`;
 * - в противном случае дата игнорируется.
 *
 * Если `peoplesCount` отсутствует — параметров `adults`/`children` не будет.
 *
 * @param basePath - Базовый путь (например, "/search").
 * @param data - Объект с частично заполненными параметрами поиска.
 *
 * @returns URL (строка). Если параметров нет — возвращает `basePath` без `?`.
 *
 * @example
 * ```ts
 * buildSearchUrl('/search', {
 *   query: 'Амстердам',
 *   destination: { id: 12, name: 'Hotel XYZ', city: 'Amsterdam' },
 *   dateRange: { startDate: '2025-09-22', endDate: new Date('2025-09-25') },
 *   peoplesCount: [2, 1],
 * });
 * // → "/search?query=Амстердам&destination=Hotel%20XYZ&destinationId=12&city=Amsterdam&checkIn=2025-09-22&checkOut=2025-09-25&adults=2&children=1"
 * ```
 */
export const buildSearchUrl = (
    basePath: string,
    data: {
        query?: string;
        destination?: { id: number; name: string; city?: string } | null;
        dateRange?: { startDate: string | Date | null; endDate: string | Date | null } | null;
        peoplesCount?: { adults: number; children: number } | null;
    },
): string => {
    const params = new URLSearchParams();

    if (data.query) params.set('query', data.query);

    if (data.destination) {
        params.set('destination', data.destination.name);
        params.set('destinationId', String(data.destination.id));
        if (data.destination.city) params.set('city', data.destination.city);
    }

    const start = formatDateSafe(data.dateRange?.startDate ?? undefined);
    const end = formatDateSafe(data.dateRange?.endDate ?? undefined);
    if (start) params.set('checkIn', start);
    if (end) params.set('checkOut', end);

    if (data.peoplesCount) {
        params.set('adults', String(data.peoplesCount.adults));
        params.set('children', String(data.peoplesCount.children));
    }

    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
};
