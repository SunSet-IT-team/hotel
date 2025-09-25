'use client';

/**
 * Универсальный компонент выпадающего списка для выбора опций
 * Используется в фильтре для цены
 * Внутри используется Typography для отображения текста
 * @see Typography
 *  * Пропсы:
 * - options: SelectOption[] — список опций вида { value: string; label: string }.
 *            `value` должен быть уникальным и стабильным ключом.
 * - onChange?: (value: string) => void — колбэк, вызывается только при явном выборе пользователем.
 * - className?: string — дополнительный CSS-класс для корневого элемента.
 */

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { SelectArrowIcon } from '../../../assets/icons';
import { useIsMobile } from '../../../hooks';
import { Typography } from '../../Typography';

import styles from './Select.module.scss';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps {
    options: SelectOption[];
    onChange?: (value: string) => void;
    className?: string;
}

export const Select = ({ options, onChange, className }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const selectRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile(768);

    useEffect(() => {
        if (options.length > 0 && !selectedValue) {
            setSelectedValue(options[0].value);
        }
    }, [options, selectedValue]);

    const selectedOption = options.find((option) => option.value === selectedValue);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (optionValue: string) => {
        setSelectedValue(optionValue);

        if (onChange) {
            onChange(optionValue);
        }

        setIsOpen(false);
    };

    const getDisplayText = () => {
        if (selectedOption) {
            return selectedOption.label;
        }

        return options[0]?.label || '';
    };

    if (options.length === 0) {
        return (
            <div ref={selectRef} className={clsx(styles.root, className)}>
                <button type="button" className={styles.button} disabled={true}>
                    <Typography variant="h3" color="dark" className={styles.label}>
                        Нет доступных опций
                    </Typography>
                </button>
            </div>
        );
    }

    return (
        <div ref={selectRef} className={clsx(styles.root, isOpen && styles.open, className)}>
            <button
                type="button"
                className={styles.button}
                onClick={handleToggle}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <Typography
                    variant={isMobile ? 'h2' : 'h3'}
                    color="dark"
                    truncate={true}
                    className={styles.label}
                >
                    {getDisplayText()}
                </Typography>
                <SelectArrowIcon className={styles.arrow} />
            </button>

            {isOpen && (
                <ul className={styles.list} role="listbox">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={clsx(
                                styles.option,
                                selectedValue === option.value && styles.optionSelected,
                            )}
                            onClick={() => handleOptionSelect(option.value)}
                            role="option"
                            aria-selected={selectedValue === option.value}
                        >
                            <Typography
                                variant={isMobile ? 'h2' : 'h3'}
                                color={selectedValue === option.value ? 'blue' : 'dark'}
                            >
                                {option.label}
                            </Typography>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
