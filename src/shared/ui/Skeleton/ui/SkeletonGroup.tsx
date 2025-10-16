'use client';

import { type FC, memo, useMemo } from 'react';
import clsx from 'clsx';

import { type SkeletonGroupProps } from '../model/types';

import styles from './Skeleton.module.scss';

/**
 * Контейнер для группы скелетонов
 * Упрощает создание композиций из нескольких скелетонов
 *
 * @example
 * ```tsx
 * <SkeletonGroup direction="column" gap={12}>
 *   <Skeleton width="60%" height={32} />
 *   <Skeleton width="80%" height={24} />
 *   <Skeleton width="40%" height={20} />
 * </SkeletonGroup>
 * ```
 */
const SkeletonGroupComponent: FC<SkeletonGroupProps> = ({
    children,
    className,
    direction = 'column',
    gap = 12,
    style,
}) => {
    const inlineStyle = useMemo(
        () => ({
            display: 'flex',
            flexDirection: direction,
            gap: `${gap}px`,
            ...style,
        }),
        [direction, gap, style],
    );

    return (
        <div style={inlineStyle} className={clsx(styles.group, className)}>
            {children}
        </div>
    );
};

export const SkeletonGroup = memo(SkeletonGroupComponent);
