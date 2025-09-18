'use client';

import clsx from 'clsx';

import styles from './Button.module.scss';
import { Props, ButtonComponent, DefaultButtonComponent } from '../model/types';

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
