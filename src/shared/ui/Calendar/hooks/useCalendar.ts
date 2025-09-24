import { useCallback, useEffect, useState } from 'react';

import { type DateRange } from '../model/types';

export const useCalendar = (value?: DateRange, onChange?: (dateRange: DateRange) => void) => {
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

            if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
                newRange = { startDate: date, endDate: null };
            } else {
                if (date < selectedRange.startDate) {
                    newRange = { startDate: date, endDate: selectedRange.startDate };
                } else {
                    newRange = { startDate: selectedRange.startDate, endDate: date };
                }
            }

            setSelectedRange(newRange);
        },
        [selectedRange],
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
        onChange?.(selectedRange);
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
