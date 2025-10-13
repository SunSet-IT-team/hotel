/**
 * Типы для компонента PricesSlider
 */

import type { HotelPrice } from '@/entities/hotel';
import type { SliderProps } from '@/shared/ui/Slider';

/**
 * Пропсы компонента PricesSlider
 */
export interface PricesSliderProps extends Omit<SliderProps<HotelPrice>, 'renderSlide' | 'slides'> {
    /** Массив цен от партнёров */
    prices: HotelPrice[];
    /** Валюта для отображения */
    currency?: string;
    /** Дополнительные CSS классы */
    className?: string;
}
