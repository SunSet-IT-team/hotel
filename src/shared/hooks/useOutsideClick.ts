import { useEffect } from "react"

/**
 * Хук, который вызывает callback при клике вне элемента
 */
export const useOutsideClick = (
  componentRef: React.RefObject<HTMLElement | null>,
  callback: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        event.target &&
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        callback(event)
      }
    }

    window.addEventListener("mousedown", handleOutsideClick)
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [componentRef, callback])
}
