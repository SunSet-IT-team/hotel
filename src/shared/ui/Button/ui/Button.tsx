'use client';

import clsx from 'clsx';

import { type ButtonComponent, type DefaultButtonComponent, type Props } from '../model/types';

import styles from './Button.module.scss';

/**
 * Компонент кнопки UI-кита
 */
export const Button = <T extends ButtonComponent = DefaultButtonComponent>({
    variant = 'cyan',
    size = 'medium',
    fullWidth = false,
    className,
    ...rest
}: Props<T>) => {
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
