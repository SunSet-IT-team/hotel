'use client';

import { type FC } from 'react';

import { useIsMobile } from '@/shared/hooks';
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
    const isMobile = useIsMobile(768);

    return (
        <section className={className}>
            <Container variant="header" className={styles.root}>
                {items.map((it) => (
                    <Button
                        key={it.label}
                        as="a"
                        variant={isMobile ? 'white' : 'cyan'}
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
