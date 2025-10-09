import { formatDate } from '../date/formatDate';

/**
 * Простые типы, которые мы разрешаем в качестве значений параметров.
 * - Date форматируется через `formatDateSafe`
 * - boolean/number/string сериализуются через `String(...)`
 */
export type Simple = string | number | boolean | Date;

/**
 * Разрешённое значение параметра:
 * - простое значение (Simple),
 * - null/undefined — игнорируются,
 * - массив простых значений (каждый элемент сериализуется отдельно).
 */
export type ParamValue = Simple | null | undefined | Array<Simple | null | undefined>;

/**
 * Объект параметров: ключ -> значение
 */
export type ParamObject = Record<string, ParamValue>;

/**
 * Явно перечисленные пары [ключ, значение].
 */
export type ParamEntries = Array<[string, ParamValue]>;

/**
 * Опции поведения билдера (в данный момент только для документации / будущих расширений).
 * Пока не используем в сигнатуре, оставлены для расширяемости API.
 */
export interface BuildUrlOptions {
    /**
     * Если true — пустые строки (`''`) будут сериализованы как валидное значение
     * (по умолчанию пустые строки игнорируются).
     */
    keepEmptyStrings?: boolean;

    /**
     * Управляет тем, как сериализуются не-массивные повторы ключей:
     * - true  — при повторной установке ключа всегда используется append (оставляются дубликаты);
     * - false — для одиночных значений используется set (последнее значение перезаписывает).
     *
     * По умолчанию — false.
     */
    preferAppendForSingles?: boolean;
}

/**
 * buildUrl
 *
 * Собирает URL путь с query string из набора независимых «кусочков» параметров.
 * Каждый кусочек может быть либо:
 *  - объектом `{ key: value }`
 *  - массивом записей `[['k','v'], ['k2', v2]]`
 *
 * Поведение:
 * - `undefined` и `null` игнорируются;
 * - пустые строки `''` игнорируются (неявно) — см. `BuildUrlOptions.keepEmptyStrings`, если потребуется изменить;
 * - массивы значений записываются как повторяющиеся ключи: `tags=a&tags=b`;
 * - `Date` форматируется через `formatDateSafe` (если `formatDateSafe` вернёт `''` или `undefined`, значение игнорируется).
 *
 * Совместимость: функция не меняет модель входных данных — оставлен rest-аргумент `...parts`.
 *
 * @example
 * ```ts
 * buildUrl('/search',
 *   { query: 'Амстердам' },
 *   [['destination', 'Hotel XYZ'], ['destinationId', 12], ['city', 'Amsterdam']],
 *   { checkIn: '2025-09-22', checkOut: new Date('2025-09-25') },
 *   { adults: 2, children: 1 }
 * );
 * // -> "/search?query=Амстердам&destination=Hotel%20XYZ&destinationId=12&city=Amsterdam&checkIn=2025-09-22&checkOut=2025-09-25&adults=2&children=1"
 * ```
 *
 * @param basePath - Базовый путь (например "/search" или "/")
 * @param parts - Любое число частей параметров. Каждая часть — либо `ParamObject`, либо `ParamEntries`.
 * @returns Собранный URL: если нет query-параметров — возвращает `basePath` без `?`.
 */
export const buildUrl = (basePath: string, ...parts: Array<ParamObject | ParamEntries>): string => {
    const params = new URLSearchParams();

    // локальные helper'ы делают код обозримым и тестируемым
    const isDate = (v: unknown): v is Date => v instanceof Date && !isNaN(v.getTime());
    const isSimple = (v: unknown): v is Simple =>
        typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || isDate(v);

    /**
     * Сериализация одного простого значения (string|number|boolean|Date) в строку.
     * Для Date используется formatDateSafe — если функция вернёт пустое значение, считаем что дата невалидна.
     */
    const serializeSimple = (value: Simple): string | undefined => {
        if (isDate(value)) {
            const formatted = formatDate(value);
            return formatted && formatted !== '' ? formatted : undefined;
        }

        // число/boolean/строка — приводим к строке
        const s = String(value);
        return s !== '' ? s : undefined;
    };

    /**
     * Добавляет одно значение в params.
     * Для одиночных значений используем `set` (перезаписывает), для массивов — `append` (несколько ключей).
     */
    const pushSingle = (key: string, raw: Simple) => {
        const serialized = serializeSimple(raw);
        if (serialized === undefined) return;
        params.set(key, serialized);
    };

    const pushArray = (key: string, arr: Array<Simple | null | undefined>) => {
        for (const el of arr) {
            if (el === undefined || el === null) continue;
            if (!isSimple(el)) continue;
            const serialized = serializeSimple(el);
            if (serialized !== undefined) params.append(key, serialized);
        }
    };

    const pushValue = (key: string, raw: ParamValue) => {
        if (raw === undefined || raw === null) return;

        if (Array.isArray(raw)) {
            pushArray(key, raw);
            return;
        }

        if (!isSimple(raw)) return;

        // одиночное простое значение
        pushSingle(key, raw);
    };

    // Перебираем все части и наполняем params
    for (const part of parts) {
        if (Array.isArray(part)) {
            // явный список пар [k,v]
            for (const [k, v] of part) {
                if (!k) continue; // игнорируем пустые ключи
                pushValue(k, v);
            }
        } else if (part && typeof part === 'object') {
            // объект ключ -> значение
            for (const key of Object.keys(part)) {
                if (!key) continue;
                pushValue(key, part[key]);
            }
        }
    }

    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
};
