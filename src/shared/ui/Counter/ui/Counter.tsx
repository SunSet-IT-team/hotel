'use client';

import { FC } from 'react';

import { SelectArrowIcon } from '@/shared/assets/icons';

import { Typography } from '../../Typography';
import styles from './Counter.module.scss';

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
        <div className={`${styles.counter} ${className}`}>
            <button
                type="button"
                className={styles.button}
                onClick={handleDecrease}
                disabled={isDecreaseDisabled}
                aria-label="Уменьшить значение"
            >
                <SelectArrowIcon className={styles.arrowIcon} />
            </button>

            <div className={styles.valueContainer}>
                <Typography variant="h2" as="span" color="blue" className={styles.value}>
                    {value}
                </Typography>
            </div>

            <button
                type="button"
                className={styles.button}
                onClick={handleIncrease}
                disabled={isIncreaseDisabled}
                aria-label="Увеличить значение"
            >
                <SelectArrowIcon className={styles.arrowIcon} />
            </button>
        </div>
    );
};
