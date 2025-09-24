import React, { type FC } from 'react';

import { Typography } from '@/shared/ui/Typography';

import { type DateRange, type Language } from '../../model/types';
import {
    generateCalendarDays,
    isInFullRange,
    isRangeEnd,
    isRangeStart,
} from '../../utils/dateUtils';
import { i18n } from '../../utils/i18n';
import { Day } from '../Day/Day';

import styles from './MonthView.module.scss';

interface Props {
    language: Language;
    currentDate: Date;
    dateRange: DateRange;
    onDayClick: (date: Date) => void;
    className?: string;
}

export const MonthView: FC<Props> = ({
    language,
    currentDate,
    dateRange,
    onDayClick,
    className,
}) => {
    const days = generateCalendarDays(currentDate, language === 'en');
    const texts = i18n(language);

    return (
        <div className={className}>
            {/* Дни недели - сохраняем вашу структуру */}
            <div className={styles.monthView}>
                {texts.weekdays.map((weekday) => (
                    <Typography key={weekday} variant="h4" color="blue" className={styles.weekday}>
                        {weekday}
                    </Typography>
                ))}
            </div>

            {/* Дни месяца */}
            <div className={styles.daysGrid}>
                {days.map((date, index) => (
                    <Day
                        key={date ? date.getTime() : `empty-${index}`}
                        date={date}
                        isSelected={
                            date
                                ? isRangeStart(date, dateRange) || isRangeEnd(date, dateRange)
                                : false
                        }
                        isInRange={date ? isInFullRange(date, dateRange) : false}
                        isRangeStart={date ? isRangeStart(date, dateRange) : false}
                        isRangeEnd={date ? isRangeEnd(date, dateRange) : false}
                        handleClick={onDayClick}
                        animationDelay={index * 0.01}
                    />
                ))}
            </div>
        </div>
    );
};
