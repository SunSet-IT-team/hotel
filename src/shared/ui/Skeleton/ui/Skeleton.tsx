'use client';

import clsx from 'clsx';
import { FC } from 'react';

import styles from './Skeleton.module.scss';

interface Props {
    className?: string;
    variant?: 'rect' | 'circled' | 'text';
    width?: number;
    height?: number;
    // animation?: 'pulse' | 'wave';
}

export const Skeleton: FC<Props> = ({
    width,
    height,
    // animation,
    variant = 'rect',
    className,
}) => {
    return (
        <div
            style={{
                width,
                height,
            }}
            className={clsx(styles.root, className, styles[variant])}
        ></div>
    );
};
