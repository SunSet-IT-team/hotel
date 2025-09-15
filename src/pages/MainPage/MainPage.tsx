import React from 'react';

import { BookingButtons } from '@/widgets/BookingButtons';
import { FaqSection } from '@/widgets/faq';

import styles from './MainPage.module.scss';
import { SearchForm } from '@/widgets/SearchForm';

import HeaderBg from '@/shared/assets/img/header-bg.png';
import Image from 'next/image';

const MainPage: React.FC = () => {
    return (
        <main className={styles.mainPage}>
            <section className={styles.headerContent}>
                <div className={styles.headerContent__bg}>
                    <Image
                        src={HeaderBg}
                        alt="Красивый пейзаж"
                        className={styles.headerContent__img}
                    />
                </div>
                <SearchForm />
            </section>
            <div className={styles.container}>
                <BookingButtons />
                <FaqSection />
            </div>
        </main>
    );
};

export default MainPage;
