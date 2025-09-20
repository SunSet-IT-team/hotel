'use client';

import { type FC, useRef, useState } from 'react';
import clsx from 'clsx';

import { useIsMobile, useOutsideClick } from '@/shared/hooks';
import { Button, Counter, Typography } from '@/shared/ui';
import { Box } from '@/shared/ui/Box/ui/Box';

import styles from './GuestsField.module.scss';
import { GuestsFieldValue } from '../model/types';

interface Props {
    /** Дополнительные классы для стилей */
    className?: string;

    value: GuestsFieldValue;

    /** Функция, вызываемая при изменении значения компонента */
    onChange: (value: GuestsFieldValue) => void;
}

/**
 * Компонент формы поиска на главной странице.
 * Позволяет выбрать число взрослых и детей для поездки.
 */
export const GuestsField: FC<Props> = ({ value, onChange, className }) => {
    const [adultsCount, childrenCount] = value;
    const [isOpen, setIsOpen] = useState(false);
    const [applied, setApplied] = useState(value[0] !== 0 || value[1] !== 0);
    const isMobile = useIsMobile(768);

    const label = !applied ? 'Кол-во гостей' : `${adultsCount} взрос. ${childrenCount} реб.`;

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
                            value={adultsCount}
                            onChange={(v) => {
                                onChange([v, childrenCount]);
                            }}
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
                            value={childrenCount}
                            onChange={(v) => {
                                onChange([adultsCount, v]);
                            }}
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
