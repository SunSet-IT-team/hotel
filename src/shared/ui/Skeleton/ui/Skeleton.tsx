'use client';

import { type FC, memo, useMemo } from 'react';
import clsx from 'clsx';

import { type SkeletonProps } from '../model/types';

import styles from './Skeleton.module.scss';

/**
 * Базовый компонент скелетона для индикации загрузки
 * Поддерживает различные варианты отображения и анимации
 *
 * @example
 * ```tsx
 * <Skeleton width={200} height={40} variant="text" />
 * <Skeleton width="100%" height={300} variant="rounded" animation="pulse" />
 * ```
 */
const SkeletonComponent: FC<SkeletonProps> = ({
    width,
    height,
    animation = 'wave',
    variant = 'rect',
    className,
    style,
}) => {
    // Мемоизируем стили для оптимизации
    const inlineStyle = useMemo(
        () => ({
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            ...style,
        }),
        [width, height, style],
    );

    // Мемоизируем классы
    const classes = useMemo(
        () =>
            clsx(
                styles.root,
                className,
                styles[variant],
                animation && styles[`animation-${animation}`],
            ),
        [className, variant, animation],
    );

    return <div style={inlineStyle} className={classes} aria-busy="true" aria-live="polite" />;
};

// Оптимизация с React.memo для предотвращения лишних ререндеров
export const Skeleton = memo(SkeletonComponent);
