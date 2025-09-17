'use client';

import clsx from 'clsx';
import { FC } from 'react';

import { LogoIcon } from '@/shared/assets/img/LogoIcon';
import { Typography } from '@/shared/ui';
import { Container } from '@/shared/ui/';

import styles from './Header.module.scss';

interface HeaderProps {
    /** Вариация заднего фона хедера с синим фоном/прозрачный
     * @default "transparent"
     */
    variant?: 'withSolidBg' | 'transparent';

    /** CSS-классы для изменения стилей компонента */
    className?: string;
}

/** Компонент шапки сайта */
export const Header: FC<HeaderProps> = ({ className, variant = 'transparent' }) => {
    return (
        <header className={clsx(styles.root, styles[variant], className)}>
            <Container variant="header">
                <div className={styles.body}>
                    <LogoIcon />
                    <ChangeLaguageMenu />
                </div>
            </Container>
        </header>
    );
};

// @TODO: В дальнейшем реализовываем фичу менюшки с выбором языков
const ChangeLaguageMenu = () => {
    return (
        <Typography color="white" className={styles.langMenu}>
            RU/EN
        </Typography>
    );
};
