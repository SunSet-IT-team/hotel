import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type Language } from '@/shared/ui/Calendar/model/types';

export interface I18nState {
    currentLanguage: Language;
}

const initialState: I18nState = {
    currentLanguage: 'ru',
};

export const i18nSlice = createSlice({
    name: 'i18n',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.currentLanguage = action.payload;
        },
        toggleLanguage: (state) => {
            state.currentLanguage = state.currentLanguage === 'ru' ? 'en' : 'ru';
        },
    },
});

export const { setLanguage, toggleLanguage } = i18nSlice.actions;
export default i18nSlice.reducer;
