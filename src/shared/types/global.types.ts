// реализация DeepRequired логики, но без Prettify
type _DeepRequired<T> = T extends (...args: any[]) => any
    ? T
    : T extends any[]
      ? { [K in keyof T]-?: _DeepRequired<T[K]> }
      : T extends Record<string, unknown>
        ? { [K in keyof T]-?: _DeepRequired<T[K]> }
        : T;

/**
 * Вспомогательная функция, перебирающая рекурсивно все итерабельные типы, делая тип "плоским".
 *
 * Например, без неё была бы такая ситуация:
 *
 * ```ts
 * type requiredDict = DeepRequired<OptionalDict>
 *
 * // При наведении на тип получаем:
 * type requiredDict = {
 *   a: 1
 *   b: [
 *     b: DeepRequired<{ <---- объект не раскрыт полностью
 *       b?: [k: [], c?: any, m?: string]
 *     }>
 *   ]
 * }
 * ```
 */
export type Prettify<T> = T extends (...args: any[]) => any
    ? T
    : T extends any[]
      ? { [K in keyof T]: Prettify<T[K]> }
      : T extends Record<string, unknown>
        ? { [K in keyof T]: Prettify<T[K]> }
        : T;

/** Утилитарный тип. Работает как Required, но рекурсивно */
export type DeepRequired<T = any> = Prettify<_DeepRequired<T>>;
