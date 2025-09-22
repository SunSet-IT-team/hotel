'use client';

import { type FC, useRef, useState } from 'react';
import clsx from 'clsx';

import { useOutsideClick } from '@/shared/hooks';
import { type ISODate } from '@/shared/types/global.types';
import { Button, Calendar, Typography } from '@/shared/ui';
import { Box } from '@/shared/ui/Box';
import type { DateRange as DateRangeType } from '@/shared/ui/Calendar';
import { formatDateRuShort } from '@/shared/utils/date/formatDate';
import { toISODate } from '@/shared/utils/date/isoDate';
import { normalizeDate } from '@/shared/utils/date/normalizeDate';

import styles from './DateRange.module.scss';

interface Props {
    /** Значение из вне в ISO формате */
    value: DateRangeType<ISODate>;

    onChange: (value: DateRangeType<ISODate>) => void;

    /** Дополнительные классы для стилей */
    className?: string;
}

export const DateRange: FC<Props> = ({ value, onChange, className }) => {
    const { startDate, endDate } = {
        startDate: value.startDate ? normalizeDate(value.startDate) : null,
        endDate: value.endDate ? normalizeDate(value.endDate) : null,
    };

    const [isOpen, setIsOpen] = useState(false);

    const startDateLabel = !startDate ? 'Дата заезда' : formatDateRuShort(startDate);

    const endDateLabel = !endDate ? 'Дата выезда' : formatDateRuShort(endDate);

    const handleOpenCalendar = () => {
        setIsOpen((v) => !v);
    };

    const handleDateRangeChange = ({ startDate, endDate }: DateRangeType) => {
        onChange({
            startDate: startDate && toISODate(startDate),
            endDate: endDate && toISODate(endDate),
        });
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
                <Typography as="span" variant="h2" color="inherit">
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
                <Typography as="span" variant="h2" color="inherit">
                    {endDateLabel}
                </Typography>
            </Button>
            {isOpen && (
                <Box
                    className={styles.panel}
                    paddingTop={0}
                    paddingRight={0}
                    paddingBottom={0}
                    paddingLeft={0}
                >
                    <Calendar
                        language="ru"
                        value={{ startDate, endDate }}
                        onChange={handleDateRangeChange}
                        className={styles.calendar}
                    />
                </Box>
            )}
        </div>
    );
};
