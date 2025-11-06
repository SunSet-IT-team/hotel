'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { mockHotels } from '@/entities/hotel';
import HeaderBg from '@/shared/assets/img/header-bg.png';
import { useTranslation } from '@/shared/hooks';
import { Container, Typography } from '@/shared/ui';
import { FilterForm, FilterFormSkeleton } from '@/widgets/FilterForm';
import { HotelCard, HotelCardSkeleton } from '@/widgets/HotelCard';
import { SearchForm } from '@/widgets/SearchForm';
import { parseSearchParamsToFormData } from '@/widgets/SearchForm/utils/parseSearchParams';

import styles from './SearchHotels.module.scss';

const SearchHotelsContent = () => {
    const searchParams = useSearchParams();
    const translate = useTranslation();

    // единый источник правды для режима "активного поиска"
    const [activeSearch, setActiveSearch] = useState(false);

    // блокируем скролл, когда открыт активный поиск
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = activeSearch ? 'hidden' : prev || '';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [activeSearch]);

    // закрытие по ESC
    useEffect(() => {
        if (!activeSearch) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveSearch(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [activeSearch]);

    const initialValues = useMemo(() => {
        const sp = new URLSearchParams(searchParams?.toString());
        return parseSearchParamsToFormData(sp);
    }, [searchParams]);

    return (
        <div
            className={styles.mainPage}
            style={{ overflow: 'hidden', position: activeSearch ? 'fixed' : 'relative' }}
        >
            <section className={styles.headerContent} style={{ zIndex: 10 }}>
                <div className={styles.headerContent__bg} style={{ background: '#3333' }}>
                    <Image
                        src={HeaderBg}
                        alt="Красивый пейзаж"
                        className={styles.headerContent__img}
                        priority
                    />
                </div>

                <div>
                    <SearchForm
                        // если хочешь жёстко сбрасывать форму при смене query — оставь key
                        key={searchParams?.toString() || 'hotels-form'}
                        initialValues={initialValues}
                        active={activeSearch} // 👈 контролируемое значение
                        onActiveChange={setActiveSearch} // 👈 колбэк из родителя
                        // defaultActive можно не передавать в контролируемом режиме
                    />
                </div>
            </section>

            {activeSearch && (
                <div
                    role="button"
                    aria-label={translate.hotels.closeExtendedSearch}
                    aria-hidden={false}
                    tabIndex={0}
                    onClick={() => setActiveSearch(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveSearch(false)}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        height: '100vh',
                        background: '#0003',
                        zIndex: 1,
                    }}
                />
            )}

            <Container>
                {!activeSearch && (
                    <Typography variant="h1" color="green" className={styles.headerText}>
                        {translate.search.title}
                    </Typography>
                )}

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
        </div>
    );
};

const SearchHotels = () => {
    return (
        <Suspense
            fallback={
                <div className={styles.mainPage}>
                    <section className={styles.headerContent} />
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
                </div>
            }
        >
            <SearchHotelsContent />
        </Suspense>
    );
};

export default SearchHotels;
