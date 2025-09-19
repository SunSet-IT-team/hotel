import { type DeepRequired } from '@/shared/types/global.types';

interface ThumbOptions {
    visibleTime?: number;
    toggleVisible?: boolean;
}

export interface RangeSliderOptions {
    renderDisplayedValues?: (value: number, forDisplay: 'min' | 'max') => string;
    thumbs?: ThumbOptions;
}

// Явный тип функции — будем переиспользовать в компоненте
export type RenderDisplayedValues = NonNullable<RangeSliderOptions['renderDisplayedValues']>;

export const defaultOptions = {
    // важно: зафиксировать тип конкретно у поля
    renderDisplayedValues: ((value: number, _forDisplay: 'min' | 'max') => {
        return value.toString();
    }) as RenderDisplayedValues,
    thumbs: {
        visibleTime: 3000,
        toggleVisible: true,
    },
} satisfies DeepRequired<RangeSliderOptions>;

export default defaultOptions;
