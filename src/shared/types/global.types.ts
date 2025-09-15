// Делает все поля обязательными РЕКУРСИВНО и выбрасывает `undefined` из опциональных
type _DeepRequired<T> =
    // функции не трогаем
    T extends (...args: unknown[]) => unknown
        ? T
        : // кортежи/массивы
          T extends readonly unknown[]
          ? { [K in keyof T]-?: _DeepRequired<NonNullable<T[K]>> }
          : // объекты (любой object, включая словари)
            T extends object
            ? { [K in keyof T]-?: _DeepRequired<NonNullable<T[K]>> }
            : T;

/** «Разглаживает» отображаемые типы для удобного хинта */
export type Prettify<T> = T extends (...args: unknown[]) => unknown
    ? T
    : T extends readonly unknown[]
      ? { [K in keyof T]: Prettify<T[K]> }
      : T extends object
        ? { [K in keyof T]: Prettify<T[K]> }
        : T;

export type DeepRequired<T> = Prettify<_DeepRequired<T>>;
