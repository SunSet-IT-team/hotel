import clsx from 'clsx';
import type { CSSProperties, FC, JSX, ReactNode } from 'react';

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
    const resolvedPaddingTop = paddingTop ?? padding ?? 16;
    const resolvedPaddingRight = paddingRight ?? padding ?? 8;
    const resolvedPaddingBottom = paddingBottom ?? padding ?? 16;
    const resolvedPaddingLeft = paddingLeft ?? padding ?? 8;

    const boxStyle: CSSProperties = {
        '--padding-top': `${resolvedPaddingTop}px`,
        '--padding-right': `${resolvedPaddingRight}px`,
        '--padding-bottom': `${resolvedPaddingBottom}px`,
        '--padding-left': `${resolvedPaddingLeft}px`,
        ...(flexDirection && {
            '--display': 'flex',
            '--flex-direction': flexDirection,
        }),
    } as CSSProperties;

    const boxClasses = clsx(styles.box, className);

    return (
        <TagName className={boxClasses} style={boxStyle}>
            {children}
        </TagName>
    );
};
