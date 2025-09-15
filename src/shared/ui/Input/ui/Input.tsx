'use client';

import clsx from 'clsx';
import { FC, InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> {
    /**
     * Растягивать ли компонент на всю ширину родителя
     */
    fullWidth?: boolean;

    placeholder?: string;
}

/**
 * Компонент инпута UI-кита
 */
export const Input: FC<Props> = ({ fullWidth = false, placeholder = '', className, ...rest }) => {
    return (
        <input
            className={clsx(styles.root, { [styles.fullWidth]: fullWidth }, className)}
            {...rest}
            placeholder={placeholder}
        />
    );
};
