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
