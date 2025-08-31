import { ChangeEvent, RefObject } from "react"

/** Формула расчета положения тумблера input относительно всей беговой дорожки в % */
export const calcThumbPosPercent = (
  value: number,
  min: number,
  max: number
) => {
  return ((value - min) / (max - min)) * 100
}

/** Получение минимального и макс. инпутов из inptContainer */
export const getInputs = (inputContainer: RefObject<HTMLDivElement | null>) =>
  Array.from(
    inputContainer.current?.querySelectorAll("input[type=range]") || []
  ) as [HTMLInputElement, HTMLInputElement] | []

type ChangeActiveInputArgs = {
  e: ChangeEvent<HTMLInputElement>
  inputs: [HTMLInputElement, HTMLInputElement] | []
  min: number
  max: number
  value: [number, number]
  step: number
  styles: Record<string, string>
}

/** Добавление класса _active input элементу, если пользователь передвигает его ползунок */
export const doChangeActiveInput = ({
  e,
  inputs,
  min,
  max,
  value,
  step,
  styles,
}: ChangeActiveInputArgs) => {
  if (!inputs.length) return
  inputs.forEach((input) => input.classList.remove(styles._active))

  const maxValue = min + Math.floor((max - min) / step) * step
  if (value[1] - value[0] === step) {
    if (value[1] === maxValue) {
      inputs[0].classList.add(styles._active)
    } else if (value[0] === min) {
      inputs[1].classList.add(styles._active)
    }
  } else e.target.classList.add(styles._active)
}

/** Валидация значений min/max */
export const validateValue = (min: number, max: number) => {
  if (min > max) throw new Error("The prop max cannot be greater than min!")
}

/** Получение максимально возможного значения с учетом step */
export const getMaxValue = (min: number, max: number, step: number) =>
  min + Math.floor((max - min) / step) * step

type NormalizeValueArgs = {
  min: number
  max: number
  value: [number, number]
  step: number
  onChange: (val: [number, number]) => void
}

/** Нормализация значения текущего value под значения props (min,max,step).
 * PS: Случаи, когда min > max исключаяются - см. функцию [validateValue]
 * @see {@link validateValue}
 */
export const normalizeValue = ({
  min,
  max,
  step,
  value,
  onChange,
}: NormalizeValueArgs) => {
  const maxValue = getMaxValue(min, max, step)

  let [currentMin, currentMax] = value

  // Текущее минимальное значение не должно быть ниже минимального порога
  if (currentMin < min) currentMin = min
  // Текущее максимальное значение не должно быть ниже максимального порога
  if (currentMax > maxValue) currentMax = maxValue

  if (currentMin !== value[0] || currentMax !== value[1]) {
    onChange([currentMin, currentMax])
  }
}
