'use client';

import { ChangeEvent, FC, InputHTMLAttributes, useRef, useState } from 'react';

import styles from './RangeSlider.module.scss';
import clsx from 'clsx';
import defaultOptions, { RangeSliderOptions } from '../config';
import {
    calcThumbPosPercent,
    doChangeActiveInput,
    getInputs,
    normalizeValue,
    validateValue,
} from '../utils/functions';

interface Props
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'value' | 'onChange'> {
    /** Минимальное значение диапазона */
    min: number;

    /** Максимальное значение диапазона */
    max: number;

    /** Текущее значение диапазона [min, max] */
    value: [number, number];

    /** Callback при изменении значения */
    onChange: (value: [number, number]) => void;

    /** Шаг изменения */
    step?: number;

    /** Вариация слайдера */
    variant?: 'circleThumbs' | 'roundedThumbs';

    /** Растягивать ли компонент на всю ширину родителя */
    fullWidth?: boolean;

    /** Дополнительные настройки для компонента */
    options?: RangeSliderOptions;
}

/**
 * Компонент слайдера UI-кита для выбора диапазона значений
 */
export const RangeSlider: FC<Props> = ({
    min,
    max,
    value,
    onChange,
    step = 1,
    fullWidth = false,
    id,
    variant = 'circleThumbs',
    className,
    options,
    ...rest
}) => {
    validateValue(min, max);
    normalizeValue({ min, max, value, step, onChange });

    const mergedOptions: typeof defaultOptions = {
        ...defaultOptions,
        ...options,
        thumbs: {
            ...defaultOptions.thumbs,
            ...options?.thumbs,
        },
    };

    const {
        renderDisplayedValues,
        thumbs: { visibleTime, toggleVisible },
    } = mergedOptions;

    /** Отвечает за показ конкретной плашки над ползунком */
    const [visibleDisplay, setvisibleDisplay] = useState<'min' | 'max' | null>(null);

    /** Кешируем таймаут для корректной работы логики показа/скрытия плашек над ползунками */
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    /** Функция для отображения плашки над max/min range ползунком */
    const showOutput = (type: 'min' | 'max') => {
        setvisibleDisplay(type);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setvisibleDisplay(null), visibleTime);
    };

    const inputContainer = useRef<HTMLDivElement>(null);

    const inputMin_Id = id ? `min_${id}` : undefined;
    const inputMax_Id = id ? `max_${id}` : undefined;

    const thumbMinPos = calcThumbPosPercent(value[0], min, max);
    const thumbMaxPos = calcThumbPosPercent(value[1], min, max);

    /** Добавление класса _active input элементу, если пользователь передвигает его ползунок */
    const changeActiveInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputs = getInputs(inputContainer);
        doChangeActiveInput({ e, inputs, min, max, value, step, styles });
    };

    /** Изменение значения у min input */
    const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeActiveInput(e);
        const newMin = Math.min(Number(e.target.value), value[1] - step);
        onChange([newMin, value[1]]);
        if (toggleVisible) showOutput('min');
    };

    /** Изменение значения у max input */
    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeActiveInput(e);
        const newMax = Math.max(Number(e.target.value), value[0] + step);
        onChange([value[0], newMax]);
        if (toggleVisible) showOutput('max');
    };

    return (
        <form
            className={clsx(
                styles.root,
                styles[variant],
                { [styles.fullWidth]: fullWidth },
                className,
            )}
            /** Обновление css переменных, отвечающих за положение каждого из ползунков RangeSlider-а */
            style={
                {
                    '--thumbMin-pos': `${thumbMinPos}%`,
                    '--thumbMax-pos': `${thumbMaxPos}%`,
                } as React.CSSProperties
            }
        >
            {/** Секция инпутов с их плашками вверху */}
            <div className={styles.inputContainer} ref={inputContainer}>
                <input
                    type="range"
                    id={inputMin_Id}
                    min={min}
                    max={max}
                    step={step}
                    value={value[0]}
                    onChange={handleMinChange}
                    {...rest}
                />
                <output
                    htmlFor={inputMin_Id}
                    className={clsx(styles.displayedValue, {
                        [styles._visible]: visibleDisplay === 'min' || !toggleVisible,
                    })}
                >
                    <span>{renderDisplayedValues(value[0], 'min')}</span>
                </output>

                <input
                    type="range"
                    id={inputMax_Id}
                    min={min}
                    max={max}
                    step={step}
                    value={value[1]}
                    onChange={handleMaxChange}
                    {...rest}
                />
                <output
                    htmlFor={inputMax_Id}
                    className={clsx(styles.displayedValue, {
                        [styles._visible]: visibleDisplay === 'max' || !toggleVisible,
                    })}
                >
                    <span>{renderDisplayedValues(value[1], 'max')}</span>
                </output>
            </div>

            {/** Секция, отвечающая за общую видимую часть беговой дорожки, а также за область между ползунками слайдера */}
            <div className={styles.slider}>
                <span className={styles.progress}></span>
            </div>
        </form>
    );
};
