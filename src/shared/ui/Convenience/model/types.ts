import { type ReactNode } from 'react';

export interface ConvenienceProps {
    /** Название удобства */
    label: string;
    /** Иконка удобства */
    icon: ReactNode;
    /** Дополнительные CSS классы */
    className?: string;
}
