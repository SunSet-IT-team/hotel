import { configureStore } from '@reduxjs/toolkit';

import { searchFormReducer } from '@/widgets/SearchForm';

export const store = configureStore({
    reducer: {
        searchForm: searchFormReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
