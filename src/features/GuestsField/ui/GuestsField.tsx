'use client';

import { type FC, useRef, useState } from 'react';
import clsx from 'clsx';

import { useIsMobile, useOutsideClick } from '@/shared/hooks';
import { Button, Counter, Typography } from '@/shared/ui';
import { Box } from '@/shared/ui/Box/ui/Box';

import { GUESTS_INFO_TEXT, GUESTS_LIMITS } from '../model/constants';
import { type GuestsFieldProps } from '../model/types';

import styles from './GuestsField.module.scss';

/**
 * Компонент выбора количества гостей
 * Позволяет выбрать число взрослых и детей для поездки.
 */
export const GuestsField: FC<GuestsFieldProps> = ({ value, onChange, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [applied, setApplied] = useState(value.adults !== 0 || value.children !== 0);
    const isMobile = useIsMobile();

    const label = !applied ? 'Кол-во гостей' : `${value.adults} взрос. ${value.children} реб.`;

    const rootRef = useRef<HTMLDivElement>(null);
    useOutsideClick(rootRef, () => {
        setIsOpen(false);
    });

    return (
        <div className={clsx(styles.root, className)} ref={rootRef}>
            <Button
                type="button"
                variant="white"
                size="big"
                className={styles.trigger}
                onClick={() => setIsOpen((v) => !v)}
                fullWidth
            >
                <Typography as="span" variant="h2" color="inherit">
                    {label}
                </Typography>
            </Button>

            {isOpen && (
                <Box as="div" className={styles.panel}>
                    <div className={styles.row}>
                        <div className={styles.title}>
                            <Typography
                                className={styles.mobileSize}
                                as="h5"
                                variant="h2"
                                color="green"
                            >
                                Взрослые
                            </Typography>
                            <Typography as="p" variant={isMobile ? 'h2' : 'h3'} color="green">
                                18 лет и старше
                            </Typography>
                        </div>
                        <Counter
                            value={value.adults}
                            onChange={(v) => {
                                onChange({ adults: v, children: value.children });
                            }}
                            min={GUESTS_LIMITS.ADULTS_MIN}
                            max={GUESTS_LIMITS.ADULTS_MAX}
                            className={styles.count}
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.title}>
                            <Typography
                                className={styles.mobileSize}
                                as="h5"
                                variant="h2"
                                color="blue"
                            >
                                Дети
                            </Typography>
                            <Typography as="p" variant={isMobile ? 'h2' : 'h3'} color="dark">
                                от 0 до 17 лет
                            </Typography>
                        </div>
                        <Counter
                            value={value.children}
                            onChange={(v) => {
                                onChange({ adults: value.adults, children: v });
                            }}
                            min={GUESTS_LIMITS.CHILDREN_MIN}
                            max={GUESTS_LIMITS.CHILDREN_MAX}
                            className={styles.count}
                        />
                    </div>

                    <div className={styles.textBlock}>
                        <Typography
                            className={styles.customLineHeight}
                            as="p"
                            variant={isMobile ? 'h2' : 'h3'}
                            color="dark"
                        >
                            {GUESTS_INFO_TEXT}
                        </Typography>
                    </div>

                    <div className={styles.footer}>
                        <Button
                            size="medium"
                            variant="cyan"
                            className={styles.footerButton}
                            onClick={() => {
                                setApplied(true);
                                setIsOpen(false);
                            }}
                            fullWidth
                        >
                            <Typography as="p" variant="h2" color="white">
                                Применить
                            </Typography>
                        </Button>
                    </div>
                </Box>
            )}
        </div>
    );
};
