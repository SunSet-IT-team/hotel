'use client';

import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import { Box } from '../../Box';
import { Button } from '../../Button';
import { Typography } from '../../Typography';
import styles from './Calendar.module.scss';

export type Language = 'ru' | 'en';

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

export interface CalendarProps {
    /** Язык интерфейса */
    language?: Language;
    /** Выбранный диапазон дат */
    value?: DateRange;
    /** Обработчик изменения диапазона дат */
    onChange?: (dateRange: DateRange) => void;
    /** Дополнительные CSS классы */
    className?: string;
}

const localization = {
    ru: {
        months: [
            'январь',
            'февраль',
            'март',
            'апрель',
            'май',
            'июнь',
            'июль',
            'август',
            'сентябрь',
            'октябрь',
            'ноябрь',
            'декабрь',
        ],
        weekdays: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
        applyButton: 'Применить',
    },
    en: {
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        applyButton: 'Apply',
    },
};

export const Calendar: React.FC<CalendarProps> = ({
    language = 'ru',
    value,
    onChange,
    className,
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedRange, setSelectedRange] = useState<DateRange>(
        value || { startDate: null, endDate: null },
    );
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const texts = localization[language];
    const isUSWeek = language === 'en';

    useEffect(() => {
        const checkIsMobile = () => {
            if (typeof window !== 'undefined') {
                setIsMobile(window.innerWidth <= 768);
            }
        };

        checkIsMobile();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', checkIsMobile);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', checkIsMobile);
            }
        };
    }, []);

    const firstMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const secondMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    const getWeekdays = useCallback(() => {
        return texts.weekdays;
    }, [texts.weekdays]);

    const getFirstDayOfMonth = useCallback(
        (date: Date) => {
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            let dayOfWeek = firstDay.getDay();

            if (!isUSWeek) {
                dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            }

            return dayOfWeek;
        },
        [isUSWeek],
    );

    const getDaysInMonth = useCallback((date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }, []);

    const isInRange = useCallback(
        (date: Date) => {
            if (!selectedRange.startDate || !selectedRange.endDate) return false;
            const startTime = selectedRange.startDate.getTime();
            const endTime = selectedRange.endDate.getTime();
            const dateTime = date.getTime();
            return dateTime >= startTime && dateTime <= endTime;
        },
        [selectedRange],
    );

    const isRangeEnd = useCallback(
        (date: Date) => {
            if (!selectedRange.endDate) return false;
            const dateTime = date.getTime();
            return dateTime === selectedRange.endDate.getTime();
        },
        [selectedRange],
    );

    const isRangeStart = useCallback(
        (date: Date) => {
            if (!selectedRange.startDate) return false;
            const dateTime = date.getTime();
            return dateTime === selectedRange.startDate.getTime();
        },
        [selectedRange],
    );

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

    const goToPreviousMonth = useCallback(() => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }, [currentDate]);

    const goToNextMonth = useCallback(() => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }, [currentDate]);

    const handleApply = useCallback(() => {
        onChange?.(selectedRange);
    }, [onChange, selectedRange]);

    const generateCalendarDays = useCallback(
        (monthDate: Date) => {
            const firstDay = getFirstDayOfMonth(monthDate);
            const daysInMonth = getDaysInMonth(monthDate);
            const days: (Date | null)[] = [];

            for (let i = 0; i < firstDay; i++) {
                days.push(null);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                days.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day));
            }

            return days;
        },
        [getFirstDayOfMonth, getDaysInMonth],
    );

    const firstMonthDays = generateCalendarDays(firstMonth);
    const secondMonthDays = generateCalendarDays(secondMonth);
    const weekdays = getWeekdays();

    const renderMonth = (monthDate: Date, days: (Date | null)[], monthIndex: number) => (
        <div className={styles.monthContainer}>
            <div className={styles.monthHeader}>
                {monthIndex === 0 && (
                    <button
                        className={clsx(styles.navButton, styles.navButtonLeft)}
                        onClick={goToPreviousMonth}
                        aria-label="Previous month"
                    >
                        <div className={styles.navIcon} />
                    </button>
                )}

                <Typography
                    variant={isMobile ? 'h2' : 'h2'}
                    color="blue"
                    className={styles.monthTitle}
                >
                    {texts.months[monthDate.getMonth()].toLowerCase()}
                </Typography>

                {monthIndex === 1 && (
                    <button
                        className={clsx(styles.navButton, styles.navButtonRight)}
                        onClick={goToNextMonth}
                        aria-label="Next month"
                    >
                        <div className={styles.navIcon} />
                    </button>
                )}
            </div>

            <div className={styles.weekdaysRow}>
                {weekdays.map((day, index) => (
                    <Typography
                        key={index}
                        variant={isMobile ? 'h2' : 'h4'}
                        className={styles.weekday}
                        color="blue"
                    >
                        {day}
                    </Typography>
                ))}
            </div>

            <div className={styles.calendarGrid}>
                {days.map((date, index) => {
                    if (!date) {
                        return <div key={index} className={styles.emptyDay} />;
                    }

                    const isSingleDay =
                        selectedRange.startDate &&
                        selectedRange.endDate &&
                        selectedRange.startDate.getTime() === selectedRange.endDate.getTime();

                    const dayClasses = clsx(styles.day, {
                        [styles.rangeEnd]: isRangeEnd(date),
                        [styles.rangeStart]: isRangeStart(date),
                        [styles.inRange]:
                            isInRange(date) && !isRangeEnd(date) && !isRangeStart(date),
                        [styles.singleDay]: isSingleDay && (isRangeEnd(date) || isRangeStart(date)),
                        [styles.hovered]: hoverDate && date.getTime() === hoverDate.getTime(),
                    });

                    return (
                        <button
                            key={index}
                            className={dayClasses}
                            onClick={() => handleDayClick(date)}
                            onMouseEnter={() => setHoverDate(date)}
                            onMouseLeave={() => setHoverDate(null)}
                        >
                            <Typography
                                variant={isMobile ? 'h2' : 'h4'}
                                color={isRangeEnd(date) || isRangeStart(date) ? 'white' : 'dark'}
                                className={styles.dayNumber}
                            >
                                {date.getDate()}
                            </Typography>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <Box
            className={clsx(styles.calendar, className, {
                [styles.english]: language === 'en',
            })}
            paddingTop={25}
            paddingRight={23}
            paddingBottom={25}
            paddingLeft={23}
        >
            <div className={styles.monthsContainer}>
                {renderMonth(firstMonth, firstMonthDays, 0)}
                {renderMonth(secondMonth, secondMonthDays, 1)}
            </div>

            <Button
                variant="cyan"
                size="big"
                fullWidth
                className={styles.applyButton}
                onClick={handleApply}
                disabled={!selectedRange.startDate || !selectedRange.endDate}
            >
                <Typography variant="h2" color="white">
                    {texts.applyButton}
                </Typography>
            </Button>
        </Box>
    );
};
