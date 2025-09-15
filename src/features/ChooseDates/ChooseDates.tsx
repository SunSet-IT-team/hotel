'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { Button, Calendar, Typography } from '@/shared/ui';
import { Box } from '@/shared/ui/Box';
import type { DateRange } from '@/shared/ui/Calendar';
import { normalizeDate } from '@/shared/utils/date/normalizeDate';
import { setDates } from '@/widgets/SearchForm/model';
import { toISODate } from '@/widgets/SearchForm/model/types';
import { useIsMobile } from '@/shared/hooks/useMediaQuery';
import styles from './ChooseDates.module.scss';
import { formatDateRuShort } from '@/shared/utils/date/formatDate';

export const ChooseDates = () => {
    const dispatch = useAppDispatch();
    const { checkIn, checkOut } = useAppSelector((s) => s.searchForm.values);

    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile(768);

    const [selectedRange, setSelectedRange] = useState<DateRange>({
        startDate: checkIn ? new Date(checkIn) : null,
        endDate: checkOut ? new Date(checkOut) : null,
    });

    const getCheckInLabel = () =>
        !checkIn ? 'Дата заезда' : formatDateRuShort(selectedRange.startDate);
    const getCheckOutLabel = () =>
        !checkOut ? 'Дата выезда' : formatDateRuShort(selectedRange.endDate);

    const handleOpenCalendar = () => {
        setSelectedRange({
            startDate: checkIn ? normalizeDate(checkIn) : null,
            endDate: checkOut ? normalizeDate(checkOut) : null,
        });
        setOpen((v) => !v);
    };

    const handleDateRangeChange = (dateRange: DateRange) => {
        setSelectedRange(dateRange);
        if (dateRange.startDate && dateRange.endDate) {
            dispatch(
                setDates({
                    checkIn: toISODate(dateRange.startDate),
                    checkOut: toISODate(dateRange.endDate),
                }),
            );
            setOpen(false);
        }
    };

    const borderRadius = isMobile ? '12px' : '24px';

    return (
        <div className={styles.root}>
            <div className={styles.buttonsContainer}>
                <Button
                    type="button"
                    variant="white"
                    size="big"
                    className={styles.trigger}
                    onClick={handleOpenCalendar}
                    style={{ borderRadius }}
                >
                    <Typography as="span" variant="h2" color="dark">
                        {getCheckInLabel()}
                    </Typography>
                </Button>

                <Button
                    type="button"
                    variant="white"
                    size="big"
                    className={styles.trigger}
                    onClick={handleOpenCalendar}
                    style={{ borderRadius }}
                >
                    <Typography as="span" variant="h2" color="dark">
                        {getCheckOutLabel()}
                    </Typography>
                </Button>
            </div>

            {open && (
                <Box
                    as="div"
                    paddingLeft={isMobile ? 30 : 25}
                    paddingRight={isMobile ? 19 : 25}
                    paddingTop={isMobile ? 22 : 19}
                    paddingBottom={isMobile ? 14 : 19}
                    className={styles.panel}
                >
                    <Calendar
                        key={`${checkIn}-${checkOut}`}
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
