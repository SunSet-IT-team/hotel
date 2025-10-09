'use client';

import { Suspense, useMemo } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import HeaderBg from '@/shared/assets/img/header-bg.png';
import { Container } from '@/shared/ui';
import { FilterForm } from '@/widgets/FilterForm/ui/FilterForm';
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
                    // ключ можно оставить, если вы хотите реинициализировать форму на изменение параметров
                    key={searchParams?.toString() || 'hotels-form'}
                    initialValues={useMemo(() => {
                        const sp = new URLSearchParams(searchParams?.toString());
                        return parseSearchParamsToFormData(sp);
                    }, [searchParams])}
                    collapsedInitially
                />
            </section>

            <Container variant="header">
                <FilterForm />
            </Container>
        </main>
    );
};

const SearchHotels = () => {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <SearchHotelsContent />
        </Suspense>
    );
};

export default SearchHotels;
