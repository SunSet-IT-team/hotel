import { searchFormReducer } from '@/features/search-form'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		searchForm: searchFormReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
