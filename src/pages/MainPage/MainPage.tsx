import { BookingButtons } from '@/widgets/booking-buttons';
import { FaqSection } from '@/widgets/faq';
import React from 'react';
import styles from './MainPage.module.scss';

export const MainPage: React.FC = () => {
    return (
        <main className={styles.mainPage}>
            <section className={styles.hero}>
                <div className={styles.heroContent}></div>
            </section>
            <div className={styles.container}>
                <BookingButtons />
                <FaqSection />
            </div>
        </main>
    );
};
