import React, { type FC } from 'react';
import Image from 'next/image';

import HeaderBg from '@/shared/assets/img/header-bg.png';
import SlideImage from '@/shared/assets/img/slide.jpg';
import { BookingButtons } from '@/widgets/BookingButtons';
import { FaqSection } from '@/widgets/Faq';
import { SearchForm } from '@/widgets/SearchForm';

import styles from './Home.module.scss';
import { ImageSlider } from '@/features/ImageSlider';
import { ReviewsSlider } from '@/features/ReviewsSlider';
import { PricesSlider } from '@/features/PricesSlider/ui/PricesSlider/PricesSlider';

/** Главная страница */
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

                <ImageSlider sliders={[SlideImage.src, SlideImage.src, SlideImage.src]} />

                <ReviewsSlider
                    reviews={[
                        'Всё понравилось. Чистые номера, удобная кровать и очень приветливый персонал. Завтраки вкусные, особенно круассаны:) Расположение супер — до центра 10 минут пешком. Обязательно приедем снова!',
                        'Всё понравилось. Чистые номера, удобная кровать и очень приветливый персонал. Завтраки вкусные, особенно круассаны:) Расположение супер — до центра 10 минут пешком. Обязательно приедем снова!',
                        'Всё понравилось. Чистые номера, удобная кровать и очень приветливый персонал. Завтраки вкусные, особенно круассаны:) Расположение супер — до центра 10 минут пешком. Обязательно приедем снова!',
                    ]}
                />

                <PricesSlider
                    prices={[
                        { price: 2.341, website: 'part1.com' },
                        { price: 2.341, website: 'part2.com' },
                        { price: 2.341, website: 'part2.com' },
                        { price: 2.341, website: 'part2.com' },
                        { price: 2.341, website: 'part2.com' },
                    ]}
                />
                <SearchForm />
            </section>
            <BookingButtons className={styles.bookingButtons} />
            <FaqSection />
        </main>
    );
};

export default Home;
