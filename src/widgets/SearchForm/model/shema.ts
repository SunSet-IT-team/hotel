import { z } from 'zod';

/**
 * Предполагаемая shape Option (как в fetchMockData1)
 * { id: number; name: string; city: string; ...other }
 */
const DestinationSchema = z
    .object({
        id: z.number(),
        name: z.string(),
        city: z.string(),
    })
    // allow extra keys (Record<string, unknown>)
    .loose()
    .nullable()
    .refine((val) => val !== null, {
        error: 'You should choose one of city/hotel option',
    });

/**
 * DateRange: принимаем Date | string(ISO) | null.
 * Используем preprocess чтобы конвертировать ISO-string в Date.
 */
const dateToNullableDate = z.preprocess((val) => {
    if (val === null || val === undefined) return null;
    if (val instanceof Date) return val;
    if (typeof val === 'string') {
        const d = new Date(val);
        return isNaN(d.getTime()) ? undefined : d;
    }
    return undefined;
}, z.date().nullable());

const DateRangeSchema = z
    .object({
        startDate: dateToNullableDate,
        endDate: dateToNullableDate,
    })
    .refine((val) => val.startDate !== null && val.endDate !== null, {
        error: 'You should choose date',
    })
    .refine(
        (r) => {
            // если оба есть — end >= start
            if (r.startDate && r.endDate) {
                return r.endDate.getTime() >= r.startDate.getTime();
            }
            return true;
        },
        { error: 'endDate must be equal or after startDate', path: ['endDate'] },
    );

/**
 * peoplesCount: tuple [adults, children]
 * adults >= 1, children >= 0, целые числа
 */
const PeoplesCountSchema = z.tuple([z.number().int().min(1), z.number().int().min(0)], {
    error: 'adults count cant be less than 1, children limit is >= 0',
});

/**
 * Итоговая схема FormData
 */
export const formDataSchema = z.object({
    query: z.string(),
    destination: DestinationSchema,
    dateRange: DateRangeSchema,
    peoplesCount: PeoplesCountSchema,
});

/** Тип, выведенный из схемы */
export type FormData = z.infer<typeof formDataSchema>;
