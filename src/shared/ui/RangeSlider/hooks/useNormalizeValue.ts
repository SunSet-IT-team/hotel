import { useEffect } from "react"

interface UseNormaliseValueProps {
  min: number
  max: number
  step: number
  value: [number, number]
  onChange: (value: [number, number]) => void
}

/**
 * Нормализация значения RangeSlider по min/max/step
 */
export const useNormaliseValue = ({
  min,
  max,
  step,
  value,
  onChange,
}: UseNormaliseValueProps) => {
  useEffect(() => {
    console.log("Effect!")

    // Проверка на корректность min/max
    if (min > max) throw new Error("The prop max cannot be greater than min!")

    // Нормализуем min/max с учётом step
    const maxValue = min + Math.floor((max - min) / step) * step

    let [newMin, newMax] = value

    if (newMin < min) newMin = min
    if (newMax > maxValue) newMax = maxValue

    if (newMin !== value[0] || newMax !== value[1]) {
      onChange([newMin, newMax])
    }
  }, [min, max, value, step])
}
