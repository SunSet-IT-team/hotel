import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { DateRange, Destination } from './types';
import { GuestsFieldValue } from '@/features/GuestsField';

export interface SearchFormSlice {
    values: {
        /** Запрос в поисковой строке */
        query?: string;

        /** Выбранный пункт в меню выбра города/отеля */
        destination?: Destination | null;

        /** Дата заезда/Дата выезда */
        dateRange?: DateRange;

        /** Количество взрослых/детей */
        peoplesCount?: GuestsFieldValue;
    };
    isSubmitting: boolean;
}

const initialState: SearchFormSlice = {
    values: {},
    isSubmitting: false,
};

const searchFormSlice = createSlice({
    name: 'searchForm',
    initialState,
    reducers: {
        reset(state) {
            state.values = initialState.values;
            state.isSubmitting = false;
        },

        setQuery(state, { payload }: PayloadAction<string>) {
            state.values.query = payload;
        },

        setDestination(state, { payload }: PayloadAction<Destination>) {
            state.values.destination = payload;
            if (payload.name) state.values.query = payload.name;
        },

        setDateRange(state, { payload }: PayloadAction<DateRange>) {
            let { startDate, endDate } = payload;

            // простая валидация: если endDate < startDate, сбрасываем endDate
            if (startDate && endDate && endDate < startDate) {
                endDate = null;
            }

            state.values.dateRange = { startDate, endDate };
        },

        setPeoplesCount(state, { payload }: PayloadAction<GuestsFieldValue>) {
            state.values.peoplesCount = payload;
        },

        setSubmitting(state, { payload }: PayloadAction<boolean>) {
            state.isSubmitting = payload;
        },
    },
});

export const { reset, setQuery, setDestination, setDateRange, setPeoplesCount, setSubmitting } =
    searchFormSlice.actions;

export const searchFormReducer = searchFormSlice.reducer;
