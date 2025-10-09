import { calendarLocalization } from '../constants/month';

type Language = keyof typeof calendarLocalization;

export const i18n = (language: Language = 'ru') => {
    return calendarLocalization[language];
};
