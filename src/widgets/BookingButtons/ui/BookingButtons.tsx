'use client';

import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';

import styles from './BookingButtons.module.scss';

type Item = { label: string; href: string };

const items: Item[] = [
    { label: 'Бронирование автомобилей', href: 'https://example.com/cars' },
    { label: 'Бронирование авиарейсов', href: 'https://example.com/flights' },
    { label: 'Бронирование туров', href: 'https://example.com/tours' },
    { label: 'Бронирование e-sim', href: 'https://example.com/esim' },
];

export const BookingButtons = () => {
    return (
        <section className={styles.root}>
            <>
                {items.map((it) => (
                    <Button key={it.label} variant="cyan" size="medium" className={styles.buttons}>
                        <Typography color="inherit" as="h2" variant="h2">
                            {it.label}
                        </Typography>
                    </Button>
                ))}
            </>
        </section>
    );
};
