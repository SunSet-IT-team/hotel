'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Вариация кнопки
     */
    variant?: 'cyan' | 'white' | 'glass';

    /**
     * Размер кнопки (влияет на внутренние отступы и размер шрифта)
     */
    size?: 'small' | 'medium' | 'big';

    /**
     * Растягивать ли компонент на всю ширину родителя
     */
    fullWidth?: boolean;
}

/**
 * Компонент кнопки UI-кита
 */
export const Button: FC<Props> = ({
    variant = 'cyan',
    size = 'medium',
    fullWidth = false,
    className,
    ...rest
}) => {
    return (
        <button
            className={clsx(
                styles.root,
                styles[variant],
                styles[size],
                {
                    [styles.fullWidth]: fullWidth,
                },
                className,
            )}
            {...rest}
        />
    );
};
