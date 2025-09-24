'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import HeaderBg from '@/shared/assets/img/header-bg.png';
import { Container, Typography } from '@/shared/ui';
import { SearchForm } from '@/widgets/SearchForm';
import { parseSearchParamsToFormData } from '@/widgets/SearchForm/utils/parseSearchParams';

import styles from './SearchHotels.module.scss';

interface SearchParams {
    query?: string;
    destination?: string;
    destinationId?: string;
    city?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
}

const SearchHotels = () => {
    const searchParams = useSearchParams();

    // Парсим GET-параметры из App Router
    const params: SearchParams = useMemo(() => {
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
    const url = useMemo(() => {
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
            <Container>
                <div className={styles.content}>
                    <Typography variant="h1" as="h1">
                        Результаты поиска (отели)
                    </Typography>

                    <div className={styles.params}>
                        <Typography variant="h2" as="h2">
                            Параметры поиска:
                        </Typography>

                        <div className={styles.paramsBox}>
                            {Object.entries(params).length > 0 ? (
                                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                                    {Object.entries(params).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}:</strong> {value}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Параметры поиска не найдены</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Typography variant="h3" as="h3">
                            URL с параметрами:
                        </Typography>
                        <div className={styles.urlBox}>{url}</div>
                    </div>
                </div>
            </Container>
        </main>
    );
};

export default SearchHotels;
