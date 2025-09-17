import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Destination, ISODate, SearchFormState, SearchFormValues } from './types';

const initialValues: SearchFormValues = {
    query: '',
    destination: null,
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0,
};

const initialState: SearchFormState = {
    values: initialValues,
    isSubmitting: false,
};

const slice = createSlice({
    name: 'searchForm',
    initialState,
    reducers: {
        init(state, { payload }: PayloadAction<Partial<SearchFormValues> | undefined>) {
            state.values = { ...initialValues, ...(payload || {}) };
            state.isSubmitting = false;
        },
        reset(state) {
            state.values = initialValues;
            state.isSubmitting = false;
        },

        // 1) Город/страна
        setQuery(state, { payload }: PayloadAction<string>) {
            state.values.query = payload;
        },
        setDestination(state, { payload }: PayloadAction<Destination>) {
            state.values.destination = payload;
            if (payload?.label) state.values.query = payload.label;
        },

        // 2–3) Даты с ISODate
        setCheckIn(state, { payload }: PayloadAction<ISODate | null>) {
            state.values.checkIn = payload;
            const { checkOut } = state.values;
            if (payload && checkOut && new Date(checkOut) <= new Date(payload)) {
                state.values.checkOut = null; // защита: выезд не может быть раньше/равен заезду
            }
        },
        setCheckOut(state, { payload }: PayloadAction<ISODate | null>) {
            state.values.checkOut = payload;
        },
        setDates(
            state,
            { payload }: PayloadAction<{ checkIn: ISODate | null; checkOut: ISODate | null }>,
        ) {
            state.values.checkIn = payload.checkIn;
            state.values.checkOut = payload.checkOut;
        },

        // 4) Гости
        setAdults(state, { payload }: PayloadAction<number>) {
            state.values.adults = Math.max(1, Math.floor(payload) || 1);
        },
        incAdults(state) {
            state.values.adults = Math.max(1, state.values.adults + 1);
        },
        decAdults(state) {
            state.values.adults = Math.max(1, state.values.adults - 1);
        },

        setChildren(state, { payload }: PayloadAction<number>) {
            state.values.children = Math.max(0, Math.floor(payload) || 0);
        },
        incChildren(state) {
            state.values.children = Math.max(0, state.values.children + 1);
        },
        decChildren(state) {
            state.values.children = Math.max(0, state.values.children - 1);
        },

        setSubmitting(state, { payload }: PayloadAction<boolean>) {
            state.isSubmitting = payload;
        },
    },
});

export const {
    init,
    reset,
    setQuery,
    setDestination,
    setCheckIn,
    setCheckOut,
    setDates,
    setAdults,
    incAdults,
    decAdults,
    setChildren,
    incChildren,
    decChildren,
    setSubmitting,
} = slice.actions;

export const searchFormReducer = slice.reducer;
