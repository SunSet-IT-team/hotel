'use client';

import { type ComponentPropsWithoutRef, type FC } from 'react';
import clsx from 'clsx';

import { Typography } from '../../Typography';

import styles from './Chip.module.scss';

export interface Props extends ComponentPropsWithoutRef<'div'> {
    /**
     * Дополнительные css классы
     */
    className?: string;

    /**
     * текстовый контент внутри
     */
    children: string;
}

/**
 * Текст в небольшой круглой плашке
 */
export const Chip: FC<Props> = ({ className, children, ...rest }) => {
    return (
        <div className={clsx(styles.root, className)} {...rest}>
            <Typography as="span" variant="h3">
                {children}
            </Typography>
        </div>
    );
};
