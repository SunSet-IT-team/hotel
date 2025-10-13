/**
 * Типы для компонента ReviewsSlider
 */

import type { HotelReview } from '@/entities/hotel';
import type { SliderProps } from '@/shared/ui/Slider';

/**
 * Пропсы компонента ReviewsSlider
 */
export interface ReviewsSliderProps
    extends Omit<SliderProps<HotelReview>, 'renderSlide' | 'slides'> {
    /** Массив отзывов об отеле */
    reviews: HotelReview[];
    /** Количество отзывов на одном слайде */
    slidesPerView?: number;
    /** Дополнительные CSS классы */
    className?: string;
}
