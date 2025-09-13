"use client"

import { useState } from "react"

import { Input, Props as InputProps } from "../../Input"
import useInputDebounce from "../hooks/useInputDebounce"

export interface Props<T> extends InputProps {
  fetchData: (query: string) => Promise<T[]>
  onData: (results: T[]) => void
  delay?: number
  resultsCount?: number
  onError?: (error: unknown) => void
  onLoadingChange?: (value: boolean) => void
}

/**
 * Базовый компонент input-поиска без меню с результатами
 */
export const SearchInput = <T,>({
  fetchData,
  onData,
  delay = 500,
  resultsCount = 3,
  onError,
  onLoadingChange,
  ...rest
}: Props<T>) => {
  const [queryString, setQueryString] = useState<string>("")

  useInputDebounce({
    queryString,
    fetchData,
    onLoadingChange,
    onData,
    onError,
    delay,
    resultsCount,
  })

  return (
    <Input
      value={queryString}
      onChange={(e) => setQueryString(e.target.value)}
      {...rest}
    />
  )
}
