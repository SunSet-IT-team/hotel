import { type ComponentProps, type CSSProperties, type ElementType, type JSX } from 'react';

type AllHtmlTags = {
    [K in keyof JSX.IntrinsicElements]: K;
};

/** Html-теги, которые поддерживает Typography */
type SupportedHtmlTags = AllHtmlTags[
    | 'p'
    | 'span'
    | 'a'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'div'];

/**
 * Html-теги, которые поддерживает Typography + кастомные React компоненты
 */
/* eslint-disable */
export type TypographyComponent = ElementType<any, SupportedHtmlTags>;

/** Дефолтный тег, используемый Typography */
export type DefaultTypographyComponent = Extract<TypographyComponent, 'p'>;

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';
type NamedColor = 'white' | 'blue' | 'dark' | 'green';
type Color = NamedColor | CSSProperties['color'];

/** Специфичные пропсы именно для Typography (независимые от тега в пропсе as) */
export interface BaseProps<T extends TypographyComponent = DefaultTypographyComponent> {
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
     */
    variant?: Variant;

    /**
     * HTML-тег, в котором будет отрендерен текст.
     *
     * @defaultValue "p"
     */
    as?: T;

    /**
     * Цвет текста.
     *
     * Возможные значения:
     * - `"white"`
     * - `"blue"`
     * - `"dark"`
     * - `"green"`
     *
     * @defaultValue "dark"
     */
    color?: Color;

    /**
     * Обрезка текста с добавлением многоточия.
     *
     * @defaultValue false
     */
    truncate?: boolean;
}

/** Тип пропсов для ui-компонента Typography */
export type Props<T extends TypographyComponent> = BaseProps<T> &
    Omit<ComponentProps<T>, keyof BaseProps>;
