'use client';

import { type FC } from 'react';
import clsx from 'clsx';

import { type SkeletonProps } from '../model/types';

import styles from './Skeleton.module.scss';

/**
 * Компонент скелетона для индикации загрузки
 * Поддерживает различные варианты отображения и анимации
 */
export const Skeleton: FC<SkeletonProps> = ({
    width,
    height,
    animation = 'wave',
    variant = 'rect',
    className,
}) => {
    return (
        <div
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
            }}
            className={clsx(
                styles.root,
                className,
                styles[variant],
                animation && styles[`animation-${animation}`],
            )}
        />
    );
};
