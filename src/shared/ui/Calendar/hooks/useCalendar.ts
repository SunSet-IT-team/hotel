import { useCallback, useEffect, useState } from 'react';

import { type DateRange } from '../model/types';

export const useCalendar = (
    value?: DateRange,
    onChange?: (dateRange: DateRange) => void,
    activeField?: 'startDate' | 'endDate' | null,
) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedRange, setSelectedRange] = useState<DateRange>(
        value || { startDate: null, endDate: null },
    );

    useEffect(() => {
        if (value?.startDate) {
            setCurrentDate(new Date(value.startDate.getFullYear(), value.startDate.getMonth(), 1));
        }
    }, [value?.startDate]);

    /**
     * Клик на день
     */
    const handleDayClick = useCallback(
        (date: Date) => {
            let newRange: DateRange;

            // Если нет выбранных дат или обе даты уже выбраны - начинаем новый выбор
            if (!selectedRange.startDate && !selectedRange.endDate) {
                if (activeField === 'endDate') {
                    // При клике на кнопку "Дата выезда" устанавливаем endDate
                    newRange = { startDate: null, endDate: date };
                } else {
                    // При клике на кнопку "Дата заезда" устанавливаем startDate
                    newRange = { startDate: date, endDate: null };
                }
            }
            // Если обе даты уже выбраны - начинаем новый выбор
            else if (selectedRange.startDate && selectedRange.endDate) {
                if (activeField === 'endDate') {
                    newRange = { startDate: null, endDate: date };
                } else {
                    newRange = { startDate: date, endDate: null };
                }
            }
            // Если есть только startDate - выбираем endDate
            else if (selectedRange.startDate && !selectedRange.endDate) {
                if (date < selectedRange.startDate) {
                    // Если выбранная дата раньше startDate, меняем местами
                    newRange = { startDate: date, endDate: selectedRange.startDate };
                } else if (date.getTime() === selectedRange.startDate.getTime()) {
                    // Если выбрана та же дата - оставляем только одну дату
                    newRange = { startDate: date, endDate: null };
                } else {
                    // Нормальный случай - endDate после startDate
                    newRange = { startDate: selectedRange.startDate, endDate: date };
                }
            }
            // Если есть только endDate - выбираем startDate
            else if (!selectedRange.startDate && selectedRange.endDate) {
                if (date > selectedRange.endDate) {
                    newRange = { startDate: selectedRange.endDate, endDate: date };
                } else if (date.getTime() === selectedRange.endDate.getTime()) {
                    newRange = { startDate: date, endDate: null };
                } else {
                    newRange = { startDate: date, endDate: selectedRange.endDate };
                }
            } else {
                if (activeField === 'endDate') {
                    newRange = { startDate: null, endDate: date };
                } else {
                    newRange = { startDate: date, endDate: null };
                }
            }

            setSelectedRange(newRange);
        },
        [selectedRange, activeField],
    );
    /**
     * Перейти к предыдущему месяцу
     */
    const goToPreviousMonth = useCallback(() => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }, [currentDate]);

    /**
     * Перейти к следующему месяцу
     */
    const goToNextMonth = useCallback(() => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }, [currentDate]);

    /**
     * Применить
     */
    const handleApply = useCallback(() => {
        if (selectedRange.startDate || selectedRange.endDate) {
            onChange?.(selectedRange);
        }
    }, [onChange, selectedRange]);

    return {
        currentDate,
        selectedRange,
        handleDayClick,
        goToPreviousMonth,
        goToNextMonth,
        handleApply,
    };
};
