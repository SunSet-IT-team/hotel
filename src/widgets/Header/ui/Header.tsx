'use client';

import { type FC } from 'react';
import clsx from 'clsx';

import { LogoIcon } from '@/shared/assets/icons';
import { useAppDispatch, useTranslation } from '@/shared/hooks';
import { toggleLanguage } from '@/shared/lib/i18n';
import { Container, Typography } from '@/shared/ui';

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
                    <LogoIcon className={styles.logo} />

                    <ChangeLaguageMenu />
                </div>
            </Container>
        </header>
    );
};

/** Компонент переключения языка */
const ChangeLaguageMenu = () => {
    const dispatch = useAppDispatch();
    const translate = useTranslation();

    const handleToggleLanguage = () => {
        dispatch(toggleLanguage());
    };

    return (
        <Typography color="white" className={styles.langMenu} onClick={handleToggleLanguage}>
            {translate.header.langMenu}
        </Typography>
    );
};
