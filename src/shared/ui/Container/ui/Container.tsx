import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import styles from './Container.module.scss';

export interface ContainerProps {
    /** В качестве какого тега использовать компонент
     * @todo можно расширять union
     */
    as?: 'div' | 'section';

    /** Дополнительные классы для стилей */
    className?: string;

    /** Контент, который мы помещаем в контейнер */
    children?: ReactNode;

    /**
     * Пресет контейнера
     * @default undefined
     */
    variant?: 'header' | 'footer' | 'mobile' | 'mobileBig';
}

/** Компонент-обертка для ограничения максимальной ширины контента на странице */
export const Container: FC<ContainerProps> = ({
    as: Tag = 'div',
    variant,
    className,
    children,
}) => {
    const preset = variant ? styles[variant] : '';
    return <Tag className={clsx(styles.root, preset, className)}>{children}</Tag>;
};
