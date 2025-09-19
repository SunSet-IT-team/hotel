'use client';

import { type FC, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './Input.module.scss';

export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'size'> {
    /**
     * Растягивать ли компонент на всю ширину родителя
     * @default false
     */
    fullWidth?: boolean;

    /**
     * Размер input (влияет на внутренние отступы и размер шрифта)
     */
    size?: 'small' | 'medium' | 'big';
}

/**
 * Компонент инпута UI-кита
 */
export const Input: FC<Props> = ({
    fullWidth = false,
    placeholder = '',
    size = 'medium',
    className,
    ...rest
}) => {
    return (
        <input
            className={clsx(
                styles.root,
                styles[size],
                { [styles.fullWidth]: fullWidth },
                className,
            )}
            {...rest}
            placeholder={placeholder}
        />
    );
};
