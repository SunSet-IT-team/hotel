// src/shared/ui/Button/model/types.ts
import { type ComponentProps, type ElementType } from 'react';

export type SupportedHtmlTags = 'a' | 'button';

/** Компонент может быть: тегом или React-компонентом */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ButtonComponent = SupportedHtmlTags | ElementType<any>;

/** Дефолтный тег */
export type DefaultButtonComponent = 'button';

/** Специфичные пропсы именно для кнопки (независимые от тега в пропсе as) */
export interface BaseProps<T extends ButtonComponent = DefaultButtonComponent> {
    /** Вариация кнопки */
    variant?: 'cyan' | 'white' | 'glass';

    /** Размер кнопки */
    size?: 'small' | 'medium' | 'big';

    /** Растягивать ли компонент на всю ширину */
    fullWidth?: boolean;

    /** Какой элемент рендерить */
    as?: T;
}

export type Props<T extends ButtonComponent> = BaseProps<T> &
    Omit<ComponentProps<T>, keyof BaseProps>;
