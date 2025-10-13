import { createElement } from 'react';
import clsx from 'clsx';

import {
    type DefaultTypographyComponent,
    type Props,
    type TypographyComponent,
} from '../model/types';

import styles from './Typography.module.scss';

type NamedColor = 'white' | 'blue' | 'dark' | 'green';

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
export const Typography = <T extends TypographyComponent = DefaultTypographyComponent>({
    variant = 'p',
    as,
    children,
    className = '',
    color = 'var(--color-text-dark)',
    truncate = false,
    ...props
}: Props<T>) => {
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

    const Component = (as || 'p') as T;

    return createElement(
        Component,
        { className: classNames, style: { color: resolvedColor }, ...props },
        children,
    );
};
