import React from 'react';

import { Container, Typography } from '@/shared/ui';
import { Accordion } from '@/shared/ui/Accordion';

import { FAQ_STUBS } from '../model/data';
import styles from './FaqSection.module.scss';

export const FaqSection = () => {
    // Разделяем FAQ на две колонки
    const leftColumn = FAQ_STUBS.filter((_, index) => index % 2 === 0);
    const rightColumn = FAQ_STUBS.filter((_, index) => index % 2 === 1);

    return (
        <Container>
            <section className={styles.section}>
                <div className={styles.container}>
                    <Typography as="h2" variant="h1" color="blue" className={styles.title}>
                        Ответы на часто задаваемые вопросы
                    </Typography>
                    <div className={styles.grid}>
                        {/* Десктопная версия - две колонки */}
                        <div className={styles.column}>
                            {leftColumn.map((item) => (
                                <div className={styles.cell} key={item.id}>
                                    <Accordion title={item.question} className={styles.accord}>
                                        {Array.isArray(item.answer)
                                            ? item.answer.map((text, idx) => (
                                                  <React.Fragment key={idx}>{text}</React.Fragment>
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
                                            ? item.answer.map((text, idx) => (
                                                  <React.Fragment key={idx}>{text}</React.Fragment>
                                              ))
                                            : item.answer}
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                        {/* Мобильная версия - одна колонка со всеми аккордеонами */}
                        <div className={styles.mobileColumn}>
                            {FAQ_STUBS.map((item) => (
                                <div className={styles.cell} key={item.id}>
                                    <Accordion title={item.question} className={styles.accord}>
                                        {Array.isArray(item.answer)
                                            ? item.answer.map((text, idx) => (
                                                  <React.Fragment key={idx}>{text}</React.Fragment>
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
