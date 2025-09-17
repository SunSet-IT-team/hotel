'use client';

import clsx from 'clsx';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, ReactNode } from 'react';

import styles from './Button.module.scss';

type Variants = 'cyan' | 'white' | 'glass';
type Sizes = 'small' | 'medium' | 'big';

type CommonProps = {
    /**
     * Вариация кнопки
     */
    variant?: Variants;

    /**
     * Размер кнопки (влияет на внутренние отступы и размер шрифта)
     */
    size?: Sizes;

    /**
     * Растягивать ли компонент на всю ширину родителя
     */
    fullWidth?: boolean;

    children?: ReactNode;
    className?: string;
};

type ButtonAsAnchor = CommonProps & { as: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonAsButton = CommonProps & { as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>;

export type Props = ButtonAsButton | ButtonAsAnchor;

export const Button: FC<Props> = (props) => {
    const {
        variant = 'cyan',
        size = 'medium',
        fullWidth = false,
        className,
        children,
        as = 'button',
        ...rest
    } = props as Props & { as: 'button' | 'a' };

    const rootClassName = clsx(
        styles.root,
        styles[variant],
        styles[size],
        {
            [styles.fullWidth]: fullWidth,
        },
        className,
    );

    if (as === 'a') {
        const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
        return (
            <a className={rootClassName} {...anchorProps}>
                {children}
            </a>
        );
    }

    const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
        <button className={rootClassName} {...buttonProps}>
            {children}
        </button>
    );
};
