import { type Translations } from '@/shared/lib/i18n';

import { type FormData } from '../model/types';

/**
 * Собирает краткое резюме параметров поиска для отображения на большой кнопке
 * Формат: «Локация {Город}   ДатаНачала — ДатаОкончания   X взросл. Y реб.»
 */
export function buildFormSummary(formData: FormData): string {
    const parts: string[] = [];

    // Локация: название и, при наличии, город в фигурных скобках
    if (formData.destination?.name) {
        const cityLabel = formData.destination.city ? ` {${formData.destination.city}}` : '';
        parts.push(`${formData.destination.name}${cityLabel}`);
    } else if (formData.query) {
        parts.push(formData.query);
    }

    // Диапазон дат
    const startDate = formData.dateRange?.startDate ?? '';
    const endDate = formData.dateRange?.endDate ?? '';
    if (startDate || endDate) parts.push(`${startDate} — ${endDate}`);

    // Количество гостей - используем переводы
    const adultsCount = formData.peoplesCount?.adults ?? 1;
    const childrenCount = formData.peoplesCount?.children ?? 0;

    // Этот хук должен вызываться внутри React компонента, поэтому создадим отдельную функцию
    // которая будет использоваться в компоненте
    return parts.filter(Boolean).join('   ');
}

/**
 * Создает функцию для использования в компоненте с доступом к переводам
 */
export function createBuildFormSummaryWithTranslations(translate: Translations) {
    return (formData: FormData): string => {
        const parts: string[] = [];

        // Локация: название и, при наличии, город в фигурных скобках
        if (formData.destination?.name) {
            const cityLabel = formData.destination.city ? ` {${formData.destination.city}}` : '';
            parts.push(`${formData.destination.name}${cityLabel}`);
        } else if (formData.query) {
            parts.push(formData.query);
        }

        // Диапазон дат
        const startDate = formData.dateRange?.startDate ?? '';
        const endDate = formData.dateRange?.endDate ?? '';
        if (startDate || endDate) parts.push(`${startDate} — ${endDate}`);

        // Количество гостей - используем переводы
        const adultsCount = formData.peoplesCount?.adults ?? 1;
        const childrenCount = formData.peoplesCount?.children ?? 0;
        parts.push(
            `${adultsCount} ${translate.search.summaryAdults} ${childrenCount} ${translate.search.summaryChildren}`,
        );

        return parts.filter(Boolean).join('   ');
    };
}
