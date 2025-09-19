import { createElement, type CSSProperties, type FC, type ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Typography.module.scss';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';
type As = 'p' | 'span' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type NamedColor = 'white' | 'blue' | 'dark' | 'green';

type Color = NamedColor | CSSProperties['color'];

interface Props {
    /**
     * Визуальный стиль текста (например, h1, h2, p, span).
     * Возможные значения:
     * - `"h1"` 64px
     * - `"h2"` 36px
     * - `"h3"` 20px
     * - `"h4"` 24px
     * - `"h5"` 48px
     * - `"p"` 16px
     * - `"span"` 16px
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
    color = 'var(--color-text-dark)',
    truncate = false,
    ...props
}) => {
    const classNames = clsx(
        styles.root,
        styles[variant],
        { [styles.truncate]: truncate },
        className,
    );

    const colorMap: Record<NamedColor, string> = {
        white: 'var(--color-primary-white)',
        blue: 'var(--color-text-blue)',
        dark: 'var(--color-text-dark)',
        green: 'var(--color-text-green)',
    };

    const resolvedColor =
        typeof color === 'string' && color in colorMap ? colorMap[color as NamedColor] : color;

    return createElement(
        as,
        { className: classNames, style: { color: resolvedColor }, ...props },
        children,
    );
};
