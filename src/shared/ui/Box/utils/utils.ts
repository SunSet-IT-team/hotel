import styles from '../ui/Box.module.scss';

/**
 * Предопределенная шкала значений внутренних отступов в пикселях
 * @type {readonly [0, 4, 8, 16, 24, 32]}
 * @constant
 */
export const PADDING_SCALE = [0, 4, 8, 16, 24, 32] as const;

/**
 * Тип, представляющий допустимые значения отступов из предопределенной шкалы
 * @typedef {0 | 4 | 8 | 16 | 24 | 32} PaddingValue
 */
export type PaddingValue = (typeof PADDING_SCALE)[number];

/**
 * Приводит произвольное числовое значение к ближайшему значению из шкалы отступов
 * @param {number | undefined} value - Исходное значение для приведения
 * @param {PaddingValue} fallback - Значение по умолчанию, если value равно null или undefined
 * @returns {PaddingValue} Ближайшее значение из шкалы PADDING_SCALE
 * @example
 * clampToScale(10, 8); // возвращает 8
 * clampToScale(undefined, 16); // возвращает 16
 */
export const clampToScale = (value: number | undefined, fallback: PaddingValue): PaddingValue => {
    if (value === null || value === undefined) return fallback;

    let best: PaddingValue = PADDING_SCALE[0];
    let diff = Math.abs(value - best);
    for (const s of PADDING_SCALE) {
        const d = Math.abs(value - s);
        if (d < diff) {
            best = s;
            diff = d;
        }
    }
    return best;
};

/**
 * Преобразует числовое значение отступа в текстовый токен для использования в CSS-классах
 * @param {PaddingValue} v - Числовое значение отступа из шкалы
 * @returns {'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'} Текстовый токен, соответствующий значению
 * @example
 * tokenFromValue(0); // возвращает 'none'
 * tokenFromValue(16); // возвращает 'md'
 */
export const tokenFromValue = (v: PaddingValue): 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
    switch (v) {
        case 0:
            return 'none';
        case 4:
            return 'xs';
        case 8:
            return 'sm';
        case 16:
            return 'md';
        case 24:
            return 'lg';
        default:
            return 'xl';
    }
};

/**
 * Создает массив CSS-классов для задания внутренних отступов со всех сторон
 * @param {PaddingValue} top - Верхний отступ
 * @param {PaddingValue} right - Правый отступ
 * @param {PaddingValue} bottom - Нижний отступ
 * @param {PaddingValue} left - Левый отступ
 * @returns {string[]} Массив CSS-классов для отступов
 * @example
 * buildPaddingClasses(8, 16, 8, 16); // возвращает [styles['p-t-sm'], styles['p-r-md'], ...]
 */
export const buildPaddingClasses = (
    top: PaddingValue,
    right: PaddingValue,
    bottom: PaddingValue,
    left: PaddingValue,
) => {
    const t = tokenFromValue(top);
    const r = tokenFromValue(right);
    const b = tokenFromValue(bottom);
    const l = tokenFromValue(left);

    return [styles[`p-t-${t}`], styles[`p-r-${r}`], styles[`p-b-${b}`], styles[`p-l-${l}`]];
};

/**
 * Создает CSS-классы для управления направлением flex-контейнера
 * @param {'row' | 'column' | undefined} direction - Направление flex-элементов
 * @returns {string[]} Массив CSS-классов для направления flex. Пустой массив, если direction не указан
 * @example
 * buildFlexClasses('row'); // возвращает [styles['dir-row']]
 * buildFlexClasses('column'); // возвращает [styles['dir-column']]
 * buildFlexClasses(); // возвращает []
 */
export const buildFlexClasses = (direction?: 'row' | 'column') => {
    if (!direction) return [] as string[];
    return [direction === 'row' ? styles['dir-row'] : styles['dir-column']];
};
