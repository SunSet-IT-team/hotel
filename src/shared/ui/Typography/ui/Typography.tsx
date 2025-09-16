import clsx from 'clsx';
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
    color = 'dark',
    truncate = false,
    ...props
}) => {
    const classNames = clsx(
        styles.root,
        styles[variant],
        { [styles.truncate]: truncate },
        className,
    );

    return createElement(as, { className: classNames, style: { color }, ...props }, children);
};
