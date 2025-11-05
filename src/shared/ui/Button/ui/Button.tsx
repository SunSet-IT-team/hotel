// src/shared/ui/Button/ui/Button.tsx
'use client';

import { type ElementType } from 'react';
import clsx from 'clsx';

import { type ButtonComponent, type DefaultButtonComponent, type Props } from '../model/types';

import styles from './Button.module.scss';

/**
 * Компонент кнопки UI-кита (полиморфный без ref)
 */
export const Button = <T extends ButtonComponent = DefaultButtonComponent>({
    as,
    variant = 'cyan',
    size = 'medium',
    fullWidth = false,
    className,
    ...rest
}: Props<T>) => {
    const Component = (as ?? 'button') as ElementType;

    return (
        <Component
            className={clsx(
                styles.root,
                styles[variant],
                styles[size],
                { [styles.fullWidth]: fullWidth },
                className,
            )}
            {...(rest as object)}
        />
    );
};
