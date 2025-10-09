import { type FC } from 'react';
import Image from 'next/image';

import HeaderBg from '@/shared/assets/img/header-bg.png';
import { BookingButtons } from '@/widgets/BookingButtons';
import { FaqSection } from '@/widgets/Faq';
import { SearchForm } from '@/widgets/SearchForm';

import styles from './page.module.scss';

const Home: FC = () => {
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
                <SearchForm title="Открой мир и путешествуй легко" />
            </section>
            <BookingButtons className={styles.bookingButtons} />
            <FaqSection />
        </main>
    );
};

export default Home;
