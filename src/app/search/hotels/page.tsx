'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import HeaderBg from '@/shared/assets/img/header-bg.png';
import { Container } from '@/shared/ui';
import { FilterForm } from '@/widgets/FilterForm/ui/FilterForm';
import { SearchForm } from '@/widgets/SearchForm';
import { parseSearchParamsToFormData } from '@/widgets/SearchForm/utils/parseSearchParams';

import styles from './SearchHotels.module.scss';

// interface SearchParams {
//     query?: string;
//     destination?: string;
//     destinationId?: string;
//     city?: string;
//     checkIn?: string;
//     checkOut?: string;
//     adults?: string;
//     children?: string;
// }

const SearchHotels = () => {
    const searchParams = useSearchParams();

    // Парсим GET-параметры из App Router
    // const params: SearchParams = useMemo(() => {
    useMemo(() => {
        if (!searchParams) return {};
        const get = (key: string): string | undefined => searchParams.get(key) ?? undefined;
        return {
            query: get('query'),
            destination: get('destination'),
            destinationId: get('destinationId'),
            city: get('city'),
            checkIn: get('checkIn'),
            checkOut: get('checkOut'),
            adults: get('adults'),
            children: get('children'),
        };
    }, [searchParams]);

    // Формируем URL на основе searchParams
    useMemo(() => {
        const qs = searchParams?.toString();
        return qs ? `/search/hotels?${qs}` : '/search/hotels';
    }, [searchParams]);

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
                {/* Сворачиваем форму на этой странице и инициализируем из URL */}
                <SearchForm
                    key={searchParams?.toString() || 'hotels-form'}
                    initialValues={useMemo(() => {
                        // Переводим URLSearchParams -> структуру формы
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

export default SearchHotels;
