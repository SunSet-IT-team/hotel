import { type CSSProperties, type ReactNode } from 'react';

/**
 * Варианты формы скелетона
 */
export type SkeletonVariant = 'rect' | 'circle' | 'text' | 'rounded';

/**
 * Типы анимации
 */
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

/**
 * Пропсы базового компонента Skeleton
 */
export interface SkeletonProps {
    /** CSS класс */
    className?: string;
    /** Вариант отображения */
    variant?: SkeletonVariant;
    /** Ширина в пикселях или строка (100%, 50px и т.д.) */
    width?: number | string;
    /** Высота в пикселях или строка */
    height?: number | string;
    /** Анимация */
    animation?: SkeletonAnimation;
    /** Дополнительные inline стили */
    style?: CSSProperties;
}

/**
 * Пропсы для SkeletonGroup - контейнер для группы скелетонов
 */
export interface SkeletonGroupProps {
    /** Дочерние элементы */
    children: ReactNode;
    /** CSS класс */
    className?: string;
    /** Направление расположения */
    direction?: 'row' | 'column';
    /** Расстояние между элементами в пикселях */
    gap?: number;
    /** Дополнительные inline стили */
    style?: CSSProperties;
}

/**
 * Пропсы для SkeletonText - для текстовых блоков
 */
export interface SkeletonTextProps {
    /** Количество строк */
    lines?: number;
    /** Ширина последней строки в процентах */
    lastLineWidth?: number | string;
    /** CSS класс */
    className?: string;
    /** Анимация */
    animation?: SkeletonAnimation;
}
