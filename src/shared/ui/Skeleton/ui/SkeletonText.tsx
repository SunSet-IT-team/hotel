'use client';

import { type FC, memo } from 'react';

import { type SkeletonTextProps } from '../model/types';

import { Skeleton } from './Skeleton';
import { SkeletonGroup } from './SkeletonGroup';

/**
 * Компонент для отображения скелетона текстового блока
 * Автоматически создает несколько строк текста
 *
 * @example
 * ```tsx
 * <SkeletonText lines={3} lastLineWidth="60%" />
 * ```
 */
const SkeletonTextComponent: FC<SkeletonTextProps> = ({
    lines = 3,
    lastLineWidth = '60%',
    className,
    animation = 'wave',
}) => {
    if (lines === 1) {
        return (
            <Skeleton
                width={lastLineWidth}
                variant="text"
                animation={animation}
                className={className}
            />
        );
    }

    return (
        <SkeletonGroup direction="column" gap={8} className={className}>
            {Array.from({ length: lines }).map((_, index) => {
                const isLastLine = index === lines - 1;
                const width = isLastLine ? lastLineWidth : '100%';

                return <Skeleton key={index} width={width} variant="text" animation={animation} />;
            })}
        </SkeletonGroup>
    );
};

export const SkeletonText = memo(SkeletonTextComponent);
