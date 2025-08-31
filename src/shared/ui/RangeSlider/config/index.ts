import { DeepRequired } from "@/shared/types/global.types"
import { RangeSlider } from "../ui/RangeSlider"

/** Настройки для плашек над ползунками слайдера */
type ThumbOptions = {
  visibleTime?: number
  toggleVisible?: boolean
}

/** Дополнительные настройки для компонента RangeSlider
 * @see {@link RangeSlider}
 * */
export type RangeSliderOptions = {
  renderDisplayedValues?: (value: number, forDisplay: "min" | "max") => string
  thumbs?: ThumbOptions
}

/** Дефолтные настройки для компонента RangeSlider
 * @see {@link RangeSlider}
 * */
const defaultOptions: DeepRequired<RangeSliderOptions> = {
  renderDisplayedValues: (value, _) => {
    return value.toString()
  },
  thumbs: {
    visibleTime: 3000,
    toggleVisible: true,
  },
}

export default defaultOptions
