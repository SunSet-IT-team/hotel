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

    // Количество гостей
    const adultsCount = formData.peoplesCount?.adults ?? 1;
    const childrenCount = formData.peoplesCount?.children ?? 0;
    parts.push(`${adultsCount} взросл. ${childrenCount} реб.`);

    return parts.filter(Boolean).join('   ');
}
