import { type FC } from 'react';
import Image from 'next/image';

import HeaderBg from '@/shared/assets/img/header-bg.png';
import { BookingButtons } from '@/widgets/BookingButtons';
import { FaqSection } from '@/widgets/Faq';
import { ReviewsBlock } from '@/widgets/ReviewsBlock/ui/ReviewsBlock';
import { SearchForm } from '@/widgets/SearchForm';

import styles from './Home.module.scss';

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
            <ReviewsBlock
                averageRating={8.7}
                reviews={[
                    {
                        text: 'Всё понравилось. Чистые номера, удобная кровать и очень приветливый персонал. Завтраки вкусные, особенно круассаны:) Расположение супер — до центра 10 минут пешком. Обязательно приедем снова!',
                        rating: 8.2,
                    },
                    {
                        text: 'In a busy outskirt of the busy city Ocaña, this nice hotel offers all a tired traveler might need : a good bed, complimentary coffee in the lobby and a safe parking spot for your car. Rooms are small but spotlessly clean and comfortable.',
                        rating: 10,
                    },
                    {
                        text: 'No recomiendo éste Hotel, la atención en la recepción fue indignante, es evidente que personas que no aman lo que hacen, jamás harán nada para que un sitio como éste evolucione, el propietario debería evaluar profundamente la falta de profesionalismo, fue tan compleja mi estadía que salí a buscar otro Hotel, en verdad, regalado es caro...',
                        rating: 2,
                    },
                    {
                        text: 'No recomiendo éste Hotel, la atención en la recepción fue indignante, es evidente que personas que no aman lo que hacen, jamás harán nada para que un sitio como éste evolucione, el propietario debería evaluar profundamente la falta de profesionalismo, fue tan compleja mi estadía que salí a buscar otro Hotel, en verdad, regalado es caro...',
                        rating: 2,
                    },
                ]}
            />
        </main>
    );
};

export default Home;
