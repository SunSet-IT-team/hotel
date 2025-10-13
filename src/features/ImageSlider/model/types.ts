/**
 * Типы для компонента ImageSlider
 */

import type { SliderProps } from '@/shared/ui/Slider';

/**
 * Пропсы компонента ImageSlider
 */
export interface ImageSliderProps extends Omit<SliderProps<string>, 'renderSlide' | 'slides'> {
    /** Массив URL изображений для отображения в слайдере */
    slides: string[];
    /** Альтернативный текст для изображений (для accessibility) */
    alt?: string;
    /** Название отеля (для генерации alt текста) */
    hotelName?: string;
}
