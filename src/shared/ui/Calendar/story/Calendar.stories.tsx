import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import type { DateRange } from '../ui/Calendar';
import { Calendar } from '../ui/Calendar';

import styles from './Calendar.stories.module.scss';

type CalendarProps = React.ComponentProps<typeof Calendar>;

interface InteractiveArgs {
    language: CalendarProps['language'];
    initialStartDate: number | null;
    initialEndDate: number | null;
    className?: string;
}

const meta: Meta<InteractiveArgs> = {
    title: 'UI/Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        language: {
            control: { type: 'select' },
            options: ['ru', 'en'],
            description: 'Язык интерфейса календаря',
        },
        initialStartDate: {
            control: { type: 'date' },
            description: 'Начальная дата диапазона',
        },
        initialEndDate: {
            control: { type: 'date' },
            description: 'Конечная дата диапазона',
        },
        className: {
            control: { type: 'text' },
            description: 'Дополнительные CSS классы',
        },
    },
};
export default meta;

type Story = StoryObj<InteractiveArgs>;

export const Interactive: Story = {
    render: (args) => {
        const startDate = args.initialStartDate ? new Date(args.initialStartDate) : null;
        const endDate = args.initialEndDate ? new Date(args.initialEndDate) : null;

        const [dateRange, setDateRange] = useState<DateRange>({
            startDate,
            endDate,
        });

        useEffect(() => {
            setDateRange({
                startDate: args.initialStartDate ? new Date(args.initialStartDate) : null,
                endDate: args.initialEndDate ? new Date(args.initialEndDate) : null,
            });
        }, [args.initialStartDate, args.initialEndDate]);

        return (
            <div className={styles.interactiveContainer}>
                <Calendar
                    language={args.language}
                    className={args.className}
                    value={dateRange}
                    onChange={setDateRange}
                />

                <div className={styles.infoPanel}>
                    <h4 className={styles.infoTitle}>Информация о выбранном периоде:</h4>
                    <p className={styles.infoText}>
                        <strong>Начало:</strong>{' '}
                        {dateRange.startDate?.toLocaleDateString() || 'не выбрано'}
                    </p>
                    <p className={styles.infoText}>
                        <strong>Конец:</strong>{' '}
                        {dateRange.endDate?.toLocaleDateString() || 'не выбрано'}
                    </p>
                    {dateRange.startDate && dateRange.endDate && (
                        <p className={styles.infoText}>
                            <strong>Количество дней:</strong>{' '}
                            {Math.ceil(
                                (dateRange.endDate.getTime() - dateRange.startDate.getTime()) /
                                    (1000 * 60 * 60 * 24),
                            ) + 1}
                        </p>
                    )}
                </div>
            </div>
        );
    },
    args: {
        language: 'ru',
        initialStartDate: null,
        initialEndDate: null,
        className: '',
    },
};
