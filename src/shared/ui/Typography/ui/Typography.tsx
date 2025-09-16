import clsx from 'clsx';
import { createElement, CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';

import styles from './Typography.module.scss';

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
 * @prop {boolean} [truncate=false] — обрезка текста с многоточием
 *
 * @example
 * <Typography variant="h1" as="h2" color="blue" align="center">
 *   Заголовок
 * </Typography>
 */

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';

type As = 'p' | 'span' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props extends HTMLAttributes<HTMLElement> {
    variant?: Variant;
    as?: As;
    children: ReactNode;
    className?: string;
    color?: CSSProperties['color'];
    truncate?: boolean;
}

export const Typography: FC<Props> = ({
    variant = 'p',
    as = 'p',
    children,
    className = '',
    color = 'dark',
    truncate = false,
    ...rest
}) => {
    const classNames = clsx(className, styles.root, styles[variant], {
        [styles.truncate]: truncate,
    });

    return createElement(as, { className: classNames, style: { color }, ...rest }, children);
};
