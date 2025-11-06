'use client';

import { type FC, useMemo } from 'react';

import { useIsMobile, useTranslation } from '@/shared/hooks';
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
    const isMobile = useIsMobile();
    const translate = useTranslation();

    // Маппинг переводов на элементы
    const translatedItems = useMemo(
        () => [
            { label: translate.booking.cars, href: items[0].href },
            { label: translate.booking.flights, href: items[1].href },
            { label: translate.booking.tours, href: items[2].href },
            { label: translate.booking.esim, href: items[3].href },
        ],
        [translate],
    );

    return (
        <section className={className}>
            <Container variant="header" className={styles.root}>
                {translatedItems.map((it) => (
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
