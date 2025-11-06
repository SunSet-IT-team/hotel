export type FormatDateOptions = Intl.DateTimeFormatOptions & { locale?: string };

export function formatDate(
    date: Date | null | undefined,
    { locale = 'ru-RU', ...options }: FormatDateOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    },
): string {
    if (!date) return '';
    return new Intl.DateTimeFormat(locale, options).format(date);
}

export const formatDateRuShort = (date: Date | null) =>
    formatDate(date, { locale: 'ru-RU', day: '2-digit', month: '2-digit', year: 'numeric' });

export const formatDateEnShort = (date: Date | null) =>
    formatDate(date, { locale: 'en-US', day: '2-digit', month: '2-digit', year: 'numeric' });

export const formatDateShort = (date: Date | null, language: 'ru' | 'en' = 'ru') =>
    language === 'en' ? formatDateEnShort(date) : formatDateRuShort(date);
