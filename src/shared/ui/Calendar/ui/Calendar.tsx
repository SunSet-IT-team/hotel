'use client';

import React, { type FC } from 'react';
import clsx from 'clsx';

import { SelectArrowIcon } from '@/shared/assets/icons';
import { useIsMobile } from '@/shared/hooks';

import { Box } from '../../Box';
import { Button } from '../../Button';
import { Typography } from '../../Typography';
import { useCalendar } from '../hooks/useCalendar';
import { type DateRange, type Language } from '../model/types';
import { i18n } from '../utils/i18n';

import { MonthView } from './MonthView/MonthView';

import styles from './Calendar.module.scss';

interface Props {
    language?: Language;
    dateRange: DateRange;
    onChange: (dateRange: DateRange) => void;
    className?: string;
}

export const Calendar: FC<Props> = ({ language = 'ru', dateRange, onChange, className }) => {
    const isMobile = useIsMobile(768);

    const {
        currentDate,
        selectedRange,
        handleDayClick,
        goToPreviousMonth,
        goToNextMonth,
        handleApply,
    } = useCalendar(dateRange, onChange);

    const texts = i18n(language);

    const firstMonthDate = currentDate;
    const secondMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    const firstMonthName = texts.months[firstMonthDate.getMonth()];
    const secondMonthName = texts.months[secondMonthDate.getMonth()];

    return (
        <Box className={clsx(styles.root)}>
            <div className={clsx(styles.calendar)}>
                <button
                    type="button"
                    className={clsx(styles.button, styles.buttonPrev)}
                    onClick={goToPreviousMonth}
                >
                    <SelectArrowIcon className={styles.icon} />
                </button>

                <div>
                    <div className={styles.direction}>
                        <div className={styles.monthWrapper}>
                            <div className={styles.monthHeader}>
                                <Typography
                                    variant={isMobile ? 'h1' : 'h2'}
                                    className={styles.monthTitle}
                                    color="blue"
                                >
                                    {firstMonthName}
                                </Typography>
                            </div>
                            <MonthView
                                language={language}
                                currentDate={firstMonthDate}
                                dateRange={selectedRange}
                                onDayClick={handleDayClick}
                                className={clsx(styles.monthView, styles['monthView--prev'])}
                            />
                        </div>

                        <div className={styles.monthWrapper}>
                            <div className={styles.monthHeader}>
                                <Typography
                                    variant={isMobile ? 'h1' : 'h2'}
                                    className={styles.monthTitle}
                                    color="blue"
                                >
                                    {secondMonthName}
                                </Typography>
                            </div>
                            <MonthView
                                language={language}
                                currentDate={secondMonthDate}
                                dateRange={selectedRange}
                                onDayClick={handleDayClick}
                                className={clsx(styles.monthView, styles['monthView--next'])}
                            />
                        </div>
                    </div>
                    <Button
                        fullWidth
                        style={{ borderRadius: 12, marginTop: 20 }}
                        onClick={handleApply}
                        disabled={!selectedRange.startDate || !selectedRange.endDate}
                    >
                        <Typography variant="h2" color="inherit">
                            {texts.applyButton}
                        </Typography>
                    </Button>
                </div>

                <button
                    type="button"
                    className={clsx(styles.button, styles.buttonNext)}
                    onClick={goToNextMonth}
                >
                    <SelectArrowIcon className={styles.icon} />
                </button>
            </div>
        </Box>
    );
};
