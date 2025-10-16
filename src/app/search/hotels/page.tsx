'use client';

import { Suspense, useMemo } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { mockHotels } from '@/entities/hotel';
import HeaderBg from '@/shared/assets/img/header-bg.png';
import { Container, Typography } from '@/shared/ui';
import { FilterForm, FilterFormSkeleton } from '@/widgets/FilterForm';
import { HotelCard, HotelCardSkeleton } from '@/widgets/HotelCard';
import { SearchForm } from '@/widgets/SearchForm';
import { parseSearchParamsToFormData } from '@/widgets/SearchForm/utils/parseSearchParams';

import styles from './SearchHotels.module.scss';

const SearchHotelsContent = () => {
    const searchParams = useSearchParams();

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

                <SearchForm
                    key={searchParams?.toString() || 'hotels-form'}
                    initialValues={useMemo(() => {
                        const sp = new URLSearchParams(searchParams?.toString());
                        return parseSearchParamsToFormData(sp);
                    }, [searchParams])}
                    collapsedInitially
                />
            </section>

            <Container>
                <Typography variant="h1" color="green" className={styles.headerText}>
                    Открой мир и путешествуй легко
                </Typography>
                <div className={styles.contentGrid}>
                    <aside className={styles.filterAside}>
                        <FilterForm />
                    </aside>

                    <section className={styles.hotelsSection}>
                        <div className={styles.hotelsList}>
                            {mockHotels.map((hotel) => (
                                <HotelCard key={hotel.id} hotel={hotel} />
                            ))}
                        </div>
                    </section>
                </div>
            </Container>
        </main>
    );
};

const SearchHotels = () => {
    return (
        <Suspense
            fallback={
                <main className={styles.mainPage}>
                    <section
                        className={styles.headerContent}
                        style={{ minHeight: '270px' }}
                     />
                    <Container>
                        <div className={styles.contentGrid}>
                            <aside className={styles.filterAside}>
                                <FilterFormSkeleton />
                            </aside>
                            <section className={styles.hotelsSection}>
                                <div className={styles.hotelsList}>
                                    {[1, 2, 3].map((i) => (
                                        <HotelCardSkeleton key={i} />
                                    ))}
                                </div>
                            </section>
                        </div>
                    </Container>
                </main>
            }
        >
            <SearchHotelsContent />
        </Suspense>
    );
};

export default SearchHotels;
