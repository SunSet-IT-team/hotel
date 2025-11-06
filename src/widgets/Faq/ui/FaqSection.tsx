'use client';

import React from 'react';

import { useTranslation } from '@/shared/hooks';
import { Container, Typography } from '@/shared/ui';
import { Accordion } from '@/shared/ui/Accordion';

import styles from './FaqSection.module.scss';

export const FaqSection = () => {
    const translate = useTranslation();

    // Используем переводы вместо статических данных
    const faqItems = translate.faq.items;

    // Разделяем FAQ на две колонки
    const leftColumn = faqItems.filter((_, index) => index % 2 === 0);
    const rightColumn = faqItems.filter((_, index) => index % 2 === 1);

    return (
        <Container>
            <section className={styles.section}>
                <div className={styles.container}>
                    <Typography as="h2" variant="h1" color="blue" className={styles.title}>
                        {translate.faq.title}
                    </Typography>
                    <div className={styles.grid}>
                        {/* Десктопная версия - две колонки */}
                        <div className={styles.column}>
                            {leftColumn.map((item) => (
                                <div className={styles.cell} key={item.id}>
                                    <Accordion title={item.question} className={styles.accord}>
                                        {Array.isArray(item.answer)
                                            ? item.answer.map((text) => (
                                                  <React.Fragment key={text}>{text}</React.Fragment>
                                              ))
                                            : item.answer}
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                        <div className={styles.column}>
                            {rightColumn.map((item) => (
                                <div className={styles.cell} key={item.id}>
                                    <Accordion title={item.question} className={styles.accord}>
                                        {Array.isArray(item.answer)
                                            ? item.answer.map((text) => (
                                                  <React.Fragment key={text}>{text}</React.Fragment>
                                              ))
                                            : item.answer}
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                        {/* Мобильная версия - одна колонка со всеми аккордеонами */}
                        <div className={styles.mobileColumn}>
                            {faqItems.map((item) => (
                                <div className={styles.cell} key={item.id}>
                                    <Accordion title={item.question} className={styles.accord}>
                                        {Array.isArray(item.answer)
                                            ? item.answer.map((text) => (
                                                  <React.Fragment key={text}>{text}</React.Fragment>
                                              ))
                                            : item.answer}
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
};
