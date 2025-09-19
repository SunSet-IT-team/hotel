import { type ComponentProps, type ElementType, type JSX } from 'node_modules/@types/react';

type AllHtmlTags = {
    [K in keyof JSX.IntrinsicElements]: K;
};

/** Html-теги, которые поддерживает кнопка */
type SupportedHtmlTags = AllHtmlTags['a' | 'button'];

/**
 * Html-теги, которые поддерживает кнопка + кастомные React компоненты
 */
/* eslint-disable */
export type ButtonComponent = ElementType<any, SupportedHtmlTags>;

/** Дефолтный тег, используемый кнопкой */
export type DefaultButtonComponent = Extract<ButtonComponent, 'button'>;

/** Специфичные пропсы именно для кнопки (независимые от тега в пропсе as) */
export interface BaseProps<T extends ButtonComponent = DefaultButtonComponent> {
    /**
     * Вариация кнопки
     */
    variant?: 'cyan' | 'white' | 'glass';

    /**
     * Размер кнопки (влияет на внутренние отступы и размер шрифта)
     */
    size?: 'small' | 'medium' | 'big';

    /**
     * Растягивать ли компонент на всю ширину родителя
     */
    fullWidth?: boolean;

    /**
     * В виде какого HTML-тега представлять компонент на странице
     * @default "button"
     */
    as?: T;
}

/** Тип пропсов для ui-компонента Button */
export type Props<T extends ButtonComponent> = BaseProps<T> &
    Omit<ComponentProps<T>, keyof BaseProps>;

// Работает это так: берем все базовые пропсы BaseProps + добавляем все остальные пропсы, относящиеся
// к конкретному тегу компонента. При этом мы из этих остальных пропсов исключаем все базовые.
