'use client';

import { type ChangeEvent, type FC, type InputHTMLAttributes, useRef, useState } from 'react';
import clsx from 'clsx';

import defaultOptions, { type RangeSliderOptions } from '../config';
import {
    calcThumbPosPercent,
    doChangeActiveInput,
    getInputs,
    normalizeValue,
    validateValue,
} from '../utils/functions';

import styles from './RangeSlider.module.scss';

interface Props
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'value' | 'onChange'> {
    min: number;
    max: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    step?: number;
    variant?: 'circleThumbs' | 'roundedThumbs';
    fullWidth?: boolean;
    options?: RangeSliderOptions;
}

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

    // ── РЕЗОЛВ ОПЦИЙ ПО ОТДЕЛЬНОСТИ (без merged-объекта) ────────────────────────
    type RDV = NonNullable<RangeSliderOptions['renderDisplayedValues']>;
    const renderDisplayedValues: RDV =
        options?.renderDisplayedValues ?? defaultOptions.renderDisplayedValues;

    const visibleTime = options?.thumbs?.visibleTime ?? defaultOptions.thumbs.visibleTime;

    const toggleVisible = options?.thumbs?.toggleVisible ?? defaultOptions.thumbs.toggleVisible;

    // ─────────────────────────────────────────────────────────────────────────────

    const [visibleDisplay, setvisibleDisplay] = useState<'min' | 'max' | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    const changeActiveInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputs = getInputs(inputContainer);
        doChangeActiveInput({ e, inputs, min, max, value, step, styles });
    };

    const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeActiveInput(e);
        const newMin = Math.min(Number(e.target.value), value[1] - step);
        onChange([newMin, value[1]]);
        if (toggleVisible) showOutput('min');
    };

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
            style={
                {
                    '--thumbMin-pos': `${thumbMinPos}%`,
                    '--thumbMax-pos': `${thumbMaxPos}%`,
                } as React.CSSProperties
            }
        >
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

            <div className={styles.slider}>
                <span className={styles.progress} />
            </div>
        </form>
    );
};
