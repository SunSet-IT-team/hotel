/**
 * Форматирование цены
 */

/**
 * Форматирует число в строку с разделителями тысяч
 *
 * @param price - Цена для форматирования
 * @param currency - Символ валюты (по умолчанию '₽')
 * @param locale - Локаль для форматирования (по умолчанию 'ru-RU')
 * @returns Отформатированная строка цены
 *
 * @example
 * formatPrice(10000) // "10 000 ₽"
 * formatPrice(1500.5, '$', 'en-US') // "$1,500.50"
 */
export const formatPrice = (
    price: number,
    currency: string = '₽',
    locale: string = 'ru-RU',
): string => {
    const formatted = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);

    return `${formatted} ${currency}`;
};

/**
 * Форматирует диапазон цен
 *
 * @param minPrice - Минимальная цена
 * @param maxPrice - Максимальная цена
 * @param currency - Символ валюты
 * @returns Отформатированная строка диапазона
 *
 * @example
 * formatPriceRange(5000, 10000) // "5 000 ₽ - 10 000 ₽"
 */
export const formatPriceRange = (
    minPrice: number,
    maxPrice: number,
    currency: string = '₽',
): string => {
    return `${formatPrice(minPrice, currency)} - ${formatPrice(maxPrice, currency)}`;
};
