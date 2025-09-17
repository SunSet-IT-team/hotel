'use client';

import { FC, useEffect, useState } from 'react';

import { Button, Container, Typography } from '@/shared/ui/';

import styles from './BookingButtons.module.scss';
import clsx from 'clsx';

type Item = { label: string; href: string };

const items: Item[] = [
    { label: 'Бронирование автомобилей', href: 'https://example.com/cars' },
    { label: 'Бронирование авиарейсов', href: 'https://example.com/flights' },
    { label: 'Бронирование туров', href: 'https://example.com/tours' },
    { label: 'Бронирование e-sim', href: 'https://example.com/esim' },
];

interface Props {
    /** Дополнительный класс для стилей */
    className?: string;
}

export const BookingButtons: FC<Props> = ({ className }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener?.('change', update);
        return () => mq.removeEventListener?.('change', update);
    }, []);

    const variant = isMobile ? 'white' : 'cyan';
    const textColor = isMobile ? 'dark' : 'white';

    return (
        <section className={clsx(styles.root, className)}>
            <Container variant="header">
                <div className={styles.grid}>
                    {items.map((it) => (
                        <a
                            key={it.label}
                            href={it.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.linkReset}
                            aria-label={it.label}
                        >
                            <Button variant={variant} size="medium" className={styles.button}>
                                <Typography
                                    as="h2"
                                    variant="h2"
                                    color={textColor}
                                    align="center"
                                    className={styles.btnText}
                                >
                                    {it.label}
                                </Typography>
                            </Button>
                        </a>
                    ))}
                </div>
            </Container>
        </section>
    );
};
