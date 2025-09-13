import { useCallback, useEffect, useMemo } from "react"

// Вспомогательная функция debounce
function debounce<F extends (...args: any[]) => void>(func: F, delay: number) {
  let timer: NodeJS.Timeout
  return (...args: Parameters<F>) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), delay)
  }
}

interface UseInputDebounceArgs<T> {
  queryString: string
  fetchData: (query: string) => Promise<T[]>
  onData: (data: T[]) => void
  delay: number
  resultsCount: number
  onLoadingChange?: (value: boolean) => void
  onError?: (error: unknown) => any
}

export const useInputDebounce = <T>({
  queryString,
  fetchData,
  onData,
  delay,
  resultsCount,
  onLoadingChange,
  onError,
}: UseInputDebounceArgs<T>) => {
  const debouncedSearch = useCallback(
    debounce(async (q: string) => {
      if (!q.trim()) {
        onData([])
        return
      }
      onLoadingChange?.(true)
      try {
        const data = await fetchData(q)
        onData(data.slice(0, resultsCount))
      } catch (e) {
        onError?.(e)
      } finally {
        onLoadingChange?.(false)
      }
    }, delay),
    [resultsCount, delay]
  )

  useEffect(() => {
    debouncedSearch(queryString)
  }, [queryString, debouncedSearch])
}

export default useInputDebounce
