import type { CSSProperties, FC, JSX, ReactNode } from 'react';
import clsx from 'clsx';

import { buildFlexClasses, buildPaddingClasses, clampToScale } from '../utils/utils';

import styles from './Box.module.scss';

interface BoxProps {
    /** Содержимое блока */
    children: ReactNode;

    /** Дополнительные CSS классы */
    className?: string;

    /**
     * HTML-элемент или компонент для рендера
     * @default "div"
     */
    as?: keyof JSX.IntrinsicElements;

    /** Отступ сверху в пикселях */
    paddingTop?: number;

    /** Отступ справа в пикселях */
    paddingRight?: number;

    /** Отступ снизу в пикселях */
    paddingBottom?: number;

    /** Отступ слева в пикселях */
    paddingLeft?: number;

    /** Единый внутренний отступ со всех сторон в пикселях */
    padding?: number;

    /** Направление расположения дочерних элементов, включает display:flex */
    flexDirection?: CSSProperties['flexDirection'];
}

export const Box: FC<BoxProps> = ({
    children,
    className,
    as: TagName = 'div',
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    padding,
    flexDirection,
}) => {
    const resolvedTop = clampToScale(paddingTop ?? padding, 16);
    const resolvedRight = clampToScale(paddingRight ?? padding, 8);
    const resolvedBottom = clampToScale(paddingBottom ?? padding, 16);
    const resolvedLeft = clampToScale(paddingLeft ?? padding, 8);

    const boxClasses = clsx(
        styles.box,
        ...buildPaddingClasses(resolvedTop, resolvedRight, resolvedBottom, resolvedLeft),
        ...buildFlexClasses(flexDirection as 'row' | 'column' | undefined),
        className,
    );

    return <TagName className={boxClasses}>{children}</TagName>;
};
