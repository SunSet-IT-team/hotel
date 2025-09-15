import { createElement, FC, ReactNode } from 'react';

import styles from './Typography.module.scss';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';
type As = 'p' | 'span' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Align = 'center' | 'inherit' | 'justify' | 'left' | 'right';
type Color = 'white' | 'blue' | 'dark';

interface Props {
    /**
     * Визуальный стиль текста (например, h1, h2, p, span).
     * @defaultValue "p"
     * @see {@link Variant}
     */
    variant?: Variant;

    /**
     * HTML-тег, в котором будет отрендерен текст.
     *
     * @defaultValue "p"
     * @see {@link As}
     */
    as?: As;

    /**
     * Содержимое текста или вложенные элементы.
     */
    children: ReactNode;

    /**
     * Дополнительные CSS-классы.
     */
    className?: string;

    /**
     * Цвет текста.
     *
     * Возможные значения:
     * - `"white"`
     * - `"blue"`
     * - `"dark"`
     *
     * @defaultValue "dark"
     * @see {@link Color}
     */
    color?: Color;

    /**
     * Выравнивание текста.
     *
     * Возможные значения:
     * - `"center"`
     * - `"inherit"`
     * - `"justify"`
     * - `"left"`
     * - `"right"`
     *
     * @defaultValue "inherit"
     * @see {@link Align}
     */
    align?: Align;

    /**
     * Обрезка текста с добавлением многоточия.
     *
     * @defaultValue false
     */
    truncate?: boolean;
}

/**
 * Универсальный типографический компонент для текста.
 * Позволяет задавать стиль (variant), HTML-тег (as),
 * цвет, выравнивание и обрезку текста.
 *
 * Используется везде, где нужен текст.
 *
 *  @example
 * ```tsx
 * <Typography variant="h1" as="h2" color="blue" align="center">
 *     Заголовок
 * </Typography>
 * ```
 */
export const Typography: FC<Props> = ({
    variant = 'p',
    as = 'p',
    children,
    className = '',
    align = 'inherit',
    color = 'dark',
    truncate = false,
    ...props
}) => {
    const classNames = [
        styles.root,
        styles[variant],
        styles[`align_${align}`],
        styles[`color_${color}`],
        truncate && styles.truncate,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return createElement(as, { className: classNames, ...props }, children);
};
