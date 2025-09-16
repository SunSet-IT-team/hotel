'use client';

import { FC } from 'react';

import { SelectArrowIcon } from '@/shared/assets/icons';

import { Typography } from '../../Typography';
import s from './Counter.module.scss';

interface CounterProps {
    /** Текущее значение счетчика */
    value: number;
    /** Обработчик изменения значения */
    onChange: (value: number) => void;
    /** Минимальное значение */
    min?: number;
    /** Максимальное значение */
    max?: number;
    /** Шаг изменения */
    step?: number;
    /** Дополнительные CSS классы */
    className?: string;
}

export const Counter: FC<CounterProps> = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    className = '',
}) => {
    const handleDecrease = () => {
        const newValue = Math.max(min, value - step);
        if (newValue !== value) {
            onChange(newValue);
        }
    };

    const handleIncrease = () => {
        const newValue = Math.min(max, value + step);
        if (newValue !== value) {
            onChange(newValue);
        }
    };

    const isDecreaseDisabled = value <= min;
    const isIncreaseDisabled = value >= max;

    return (
        <div className={`${s.counter} ${className}`}>
            <button
                type="button"
                className={s.button}
                onClick={handleDecrease}
                disabled={isDecreaseDisabled}
                aria-label="Уменьшить значение"
            >
                <SelectArrowIcon color="#ff0000" style={{ rotate: '90deg', scale: 0.6 }} />
            </button>

            <div className={s.valueContainer}>
                <Typography variant="h2" as="span" color="blue" className={s.value}>
                    {value}
                </Typography>
            </div>

            <button
                type="button"
                className={s.button}
                onClick={handleIncrease}
                disabled={isIncreaseDisabled}
                aria-label="Увеличить значение"
            >
                <SelectArrowIcon color="#ff0000" style={{ rotate: '-90deg', scale: 0.6 }} />
            </button>
        </div>
    );
};
