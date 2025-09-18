'use client';

import { FC } from 'react';

import { Container } from '@/shared/ui';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';

import { items } from '../model/data';
import styles from './BookingButtons.module.scss';

interface Props {
    /** Дополнительный класс для стилей */
    className?: string;
}

export const BookingButtons: FC<Props> = ({ className }) => {
    return (
        <section className={className}>
            <Container className={styles.root}>
                {items.map((it) => (
                    <Button
                        key={it.label}
                        as="a"
                        variant="cyan"
                        size="medium"
                        href={it.href}
                        className={styles.buttons}
                    >
                        <Typography color="inherit" as="h2" variant="h2">
                            {it.label}
                        </Typography>
                    </Button>
                ))}
            </Container>
        </section>
    );
};
