import type { ElementType, PropsWithChildren } from 'react';

import s from './Container.module.scss';

export type ContainerProps = PropsWithChildren<{
    as?: ElementType;
    className?: string;
}>;

export function Container({ as: Tag = 'div', className, children }: ContainerProps) {
    return <Tag className={`${s.container} ${className || ''}`}>{children}</Tag>;
}
