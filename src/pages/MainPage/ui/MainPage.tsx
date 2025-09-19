import React from 'react';
import Image from 'next/image';

import HeaderBg from '@/shared/assets/img/header-bg.png';
import { BookingButtons } from '@/widgets/BookingButtons';
import { FaqSection } from '@/widgets/Faq';
import { SearchForm } from '@/widgets/SearchForm';

import styles from './MainPage.module.scss';

/** Главная страница */
export const MainPage: React.FC = () => {
    return (
        <main className={styles.mainPage}>
            <section className={styles.headerContent}>
                <div className={styles.headerContent__bg}>
                    <Image
                        src={HeaderBg}
                        alt="Красивый пейзаж"
                        className={styles.headerContent__img}
                        priority
                    />
                </div>
                <SearchForm />
            </section>
            <BookingButtons className={styles.bookingButtons} />
            <FaqSection />
        </main>
    );
};
