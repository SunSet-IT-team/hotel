import type { AppDispatch, RootState } from '@/app/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Типизированные хуки для Redux
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
