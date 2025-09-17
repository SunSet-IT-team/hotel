'use client';

import { ReactNode, useState } from 'react';

import { Box } from '@/shared/ui/Box/ui/Box';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';

import styles from './Accordion.module.scss';

type AccordionProps = {
    /** Заголовок секции */
    title: string | ReactNode;
    /** Контент секции */
    children: ReactNode | ReactNode[];
    /** Открыто по умолчанию */
    defaultOpen?: boolean;
    /** Дополнительный класс */
    className?: string;
};

export const Accordion = ({ title, children, className = '' }: AccordionProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.root}>
            <Box
                as="div"
                paddingTop={15}
                paddingBottom={15}
                paddingLeft={0}
                paddingRight={0}
                className={`${styles.item} ${open ? styles.item_open : ''} ${className}`}
            >
                <Button
                    type="button"
                    variant="white"
                    size="big"
                    className={styles.trigger}
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                >
                    <Typography as="span" variant="h2" color="dark" className={styles.question}>
                        {title}
                    </Typography>
                    <span
                        aria-hidden
                        className={`${styles.arrow} ${open ? styles.arrow_open : ''}`}
                    />
                </Button>

                {open && (
                    <div className={styles.content}>
                        {(Array.isArray(children) ? children : [children]).map((child, idx) => (
                            <Typography
                                key={idx}
                                as="p"
                                variant="h3"
                                color="blue"
                                className={styles.answer}
                            >
                                {child}
                            </Typography>
                        ))}
                    </div>
                )}
            </Box>
        </div>
    );
};
