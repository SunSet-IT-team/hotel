import { configureStore } from '@reduxjs/toolkit';

import { i18nReducer } from '@/shared/lib/i18n';
import { searchFormReducer } from '@/widgets/SearchForm';

export const store = configureStore({
    reducer: {
        searchForm: searchFormReducer,
        i18n: i18nReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { AppThunkParams } from './types/types';
