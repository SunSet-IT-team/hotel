export interface SkeletonProps {
    /** CSS класс */
    className?: string;
    /** Вариант отображения */
    variant?: 'rect' | 'circle' | 'text' | 'rounded';
    /** Ширина в пикселях или строка (100%, 50px и т.д.) */
    width?: number | string;
    /** Высота в пикселях или строка */
    height?: number | string;
    /** Анимация */
    animation?: 'pulse' | 'wave' | 'none';
}
