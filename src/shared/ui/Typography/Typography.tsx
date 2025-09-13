import { createElement, ReactNode } from 'react';
import s from './Typography.module.scss';

/**
 * Универсальный типографический компонент для текста.
 * Позволяет задавать стиль (variant), HTML-тег (as),
 * цвет, выравнивание и обрезку текста.
 *
 * Используется везде, где нужен текст.
 *
 * @prop {Variant} [variant="p"] — визуальный стиль текста (h1, h2, p, span и т.д.)
 * @prop {As} [as="p"] — HTML-тег, в котором будет отрендерен текст
 * @prop {ReactNode} children — содержимое текста/элементов
 * @prop {string} [className] — дополнительные CSS-классы
 * @prop {Color} [color="dark"] — цвет текста (white, blue, dark)
 * @prop {Align} [align="inherit"] — выравнивание текста
 * @prop {boolean} [truncate=false] — обрезка текста с многоточием
 *
 * @example
 * <Typography variant="h1" as="h2" color="blue" align="center">
 *   Заголовок
 * </Typography>
 */

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';

type As = 'p' | 'span' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Align = 'center' | 'inherit' | 'justify' | 'left' | 'right';

type Color = 'white' | 'blue' | 'dark';

type TypographyProps = {
    variant?: Variant;
    as?: As;
    children: ReactNode;
    className?: string;
    color?: Color;
    align?: Align;
    truncate?: boolean;
};

export const Typography = ({
    variant = 'p',
    as = 'p',
    children,
    className = '',
    align = 'inherit',
    color = 'dark',
    truncate = false,
    ...props
}: TypographyProps) => {
    const classNames = [
        s.root,
        s[variant],
        s[`align_${align}`],
        s[`color_${color}`],
        truncate && s.truncate,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return createElement(as, { className: classNames, ...props }, children);
};
