'use client';

import { type FC, useRef, useState } from 'react';
import clsx from 'clsx';

import { type ISODate } from '@/shared/types/global.types';
import { Button, Calendar, Typography } from '@/shared/ui';
import type { DateRange as DateRangeType } from '@/shared/ui/Calendar';
import { Popup } from '@/shared/ui/Popup';
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
    const rootRef = useRef(null); // Родительский компонент

    // Состояние модального окна с выбором даты
    const [isOpen, setIsOpen] = useState(false);

    // Добавляем состояние для отслеживания какая кнопка была нажата
    const [activeField, setActiveField] = useState<'startDate' | 'endDate' | null>(null);

    // Дата начала - Дата конца
    const { startDate, endDate } = {
        startDate: value?.startDate ? normalizeDate(value.startDate) : null,
        endDate: value?.endDate ? normalizeDate(value.endDate) : null,
    };

    const startDateLabel = !startDate ? 'Дата заезда' : formatDateRuShort(startDate);
    const endDateLabel = !endDate ? 'Дата выезда' : formatDateRuShort(endDate);

    const handleDateRangeChange = ({ startDate, endDate }: DateRangeType) => {
        onChange({
            startDate: startDate && toISODate(startDate),
            endDate: endDate && toISODate(endDate),
        });
        setIsOpen(false);
    };

    return (
        <div className={clsx(styles.root, className)} ref={rootRef}>
            <Button
                type="button"
                variant="white"
                size="big"
                className={styles.trigger}
                onClick={() => {
                    setActiveField('startDate');
                    setIsOpen((prev) => !prev);
                }}
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
                onClick={() => {
                    setActiveField('endDate');
                    setIsOpen((prev) => !prev);
                }}
            >
                <Typography as="span" variant="h2" color="inherit">
                    {endDateLabel}
                </Typography>
            </Button>
            {isOpen && (
                <Popup
                    triggerRef={rootRef}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    position="center"
                >
                    <Calendar
                        language="ru"
                        dateRange={{ startDate, endDate }}
                        onChange={handleDateRangeChange}
                        className={styles.panelInner}
                        activeField={activeField}
                    />
                </Popup>
            )}
        </div>
    );
};
