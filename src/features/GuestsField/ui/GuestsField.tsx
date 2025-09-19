'use client';

import { type FC, useRef, useState } from 'react';
import clsx from 'clsx';

import { useIsMobile, useOutsideClick } from '@/shared/hooks';
import { Button, Counter, Typography } from '@/shared/ui';
import { Box } from '@/shared/ui/Box/ui/Box';

import styles from './GuestsField.module.scss';

interface Props {
    className?: string;
}

export const GuestsField: FC<Props> = ({ className }) => {
    const adults = 1;
    const children = 1;
    const [isOpen, setIsOpen] = useState(false);
    const [applied, setApplied] = useState(false);
    const isMobile = useIsMobile(768);

    const label = !applied ? 'Кол-во гостей' : `${adults} взрос. ${children} реб.`;

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
                <Typography as="span" variant="h2">
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
                            value={adults}
                            onChange={() => {}}
                            min={1}
                            max={10}
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
                            value={children}
                            onChange={() => {}}
                            min={0}
                            max={10}
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
                            Ваш возраст на момент поездки должен соответствовать категории
                            забронированного билета. У авиакомпаний есть ограничения для пассажиров
                            младше 18 лет, путешествующих без сопровождения. У авиакомпаний есть
                            ограничения для пассажиров младше 18 лет, путешествующих без
                            сопровождения. Ваш возраст на момент поездки должен соответствовать
                            категории забронированного билета. У авиакомпаний есть ограничения для
                            пассажиров младше 18 лет, путешествующих без сопровождения. У
                            авиакомпаний есть ограничения для пассажиров младше 18 лет,
                            путешествующих без сопровождения. Ваш возраст на момент поездки должен
                            соответствовать категории забронированного билета. У авиакомпаний есть
                            ограничения для пассажиров младше 18 лет, путешествующих без
                            сопровождения. У авиакомпаний есть ограничения для пассажиров младше 18
                            лет, путешествующих без сопровождения.
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
