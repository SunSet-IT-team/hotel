import { FC, ReactNode } from 'react';

import styles from './Container.module.scss';
import clsx from 'clsx';

interface Props {
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
export const Container: FC<Props> = ({ as: Tag = 'div', variant, className, children }) => {
    const preset = variant ? styles[variant] : '';
    return <Tag className={clsx(styles.root, preset, className)}>{children}</Tag>;
};
