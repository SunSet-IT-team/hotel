import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { type RootState } from '@/app/store';
import { type Translations, translations } from '@/shared/lib/i18n';

/**
 * Хук для получения переводов текущего языка
 * @returns Объект с переводами для текущего языка
 */
export const useTranslation = (): Translations => {
    const currentLanguage = useSelector((state: RootState) => state.i18n.currentLanguage);

    return useMemo(() => translations[currentLanguage], [currentLanguage]);
};

/**
 * Хук для получения текущего языка
 * @returns Текущий язык ('ru' или 'en')
 */
export const useLanguage = (): 'ru' | 'en' => {
    return useSelector((state: RootState) => state.i18n.currentLanguage);
};
