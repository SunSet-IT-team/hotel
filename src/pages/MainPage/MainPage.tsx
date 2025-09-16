import React from 'react';

import { BookingButtons } from '@/widgets/BookingButtons';

import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
    return (
        <main className={styles.mainPage}>
            <section className={styles.hero}>
                <div className={styles.heroContent}></div>
            </section>
            <div className={styles.container}>
                <BookingButtons />
                {/* <FaqSection /> */}
            </div>
        </main>
    );
};

export default MainPage;
