'use client';

import { FC, useRef, useState } from 'react';

import { useIsMobile } from '@/shared/hooks/useMediaQuery';
import { Button, Calendar, Input, Typography } from '@/shared/ui';
import { Box } from '@/shared/ui/Box';
import type { DateRange as DateRangeType } from '@/shared/ui/Calendar';
import { formatDateRuShort } from '@/shared/utils/date/formatDate';
import { normalizeDate } from '@/shared/utils/date/normalizeDate';

import styles from './DateRange.module.scss';
import { useOutsideClick } from '@/shared/hooks';
import clsx from 'clsx';

interface Props {
    className?: string;
    onChange?: (value: any) => void;
}

export const DateRange: FC<Props> = ({ onChange, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile(768);

    const [selectedRange, setSelectedRange] = useState<DateRangeType>({
        startDate: null,
        endDate: null,
    });

    const startDateLabel = !selectedRange.startDate
        ? 'Дата заезда'
        : formatDateRuShort(selectedRange.startDate);

    const endDateLabel = !selectedRange.endDate
        ? 'Дата выезда'
        : formatDateRuShort(selectedRange.endDate);

    const handleOpenCalendar = () => {
        setIsOpen(!isOpen);
    };

    const handleDateRangeChange = (dateRange: DateRangeType) => {
        setSelectedRange(dateRange);
        onChange?.(dateRange);
        setIsOpen(false);
    };

    const rootRef = useRef<HTMLDivElement>(null);
    useOutsideClick(rootRef, () => {
        setIsOpen(false);
    });

    return (
        <div className={clsx(styles.root, className)} ref={rootRef}>
            <Button
                type="button"
                variant="white"
                size="big"
                className={styles.trigger}
                onClick={handleOpenCalendar}
            >
                <Typography as="span" variant="h2" color="dark">
                    {startDateLabel}
                </Typography>
            </Button>

            <Button
                type="button"
                variant="white"
                size="big"
                className={styles.trigger}
                onClick={handleOpenCalendar}
            >
                <Typography as="span" variant="h2" color="dark">
                    {endDateLabel}
                </Typography>
            </Button>
            {isOpen && (
                <Box
                    paddingLeft={isMobile ? 30 : 25}
                    paddingRight={isMobile ? 19 : 25}
                    paddingTop={isMobile ? 22 : 19}
                    paddingBottom={isMobile ? 14 : 19}
                    className={styles.panel}
                >
                    <Calendar
                        // key={`${checkIn}-${checkOut}`}
                        language="ru"
                        value={selectedRange}
                        onChange={handleDateRangeChange}
                        className={styles.calendar}
                    />
                </Box>
            )}
        </div>
    );
};
