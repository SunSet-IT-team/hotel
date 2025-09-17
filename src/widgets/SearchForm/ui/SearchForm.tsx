'use client';

import clsx from 'clsx';
import { FC } from 'react';

import { GuestsField } from '@/features/GuestsField';
import { Option, SearchLocation } from '@/features/searchLocation';
import { Button, Container, Typography } from '@/shared/ui';

import styles from './SearchForm.module.scss';

export const fetchMockData1 = (query: string): Promise<Option[]> => {
    // Можно добавить фильтрацию по query, если нужно
    return Promise.resolve([
        { id: 1, name: 'Москва', city: 'Россия' },
        { id: 2, name: 'Санкт-Петербург', city: 'Россия' },
    ]);
};

/** Форма поиска под Header */
export const SearchForm: FC = () => {
    return (
        <div className={styles.root} onSubmit={(e) => e.preventDefault()}>
            <Container variant="header">
                <Typography color="white" variant="h1" as="h1">
                    Открой мир и путешествуй легко
                </Typography>
                <form className={styles.form}>
                    <div className={clsx(styles.form__body, styles.formBody)}>
                        <SearchLocation
                            className={clsx(
                                styles.formBody__item,
                                styles.formBody__item_searchLocation,
                            )}
                            placeholder="Город или отель"
                            fetchData={fetchMockData1}
                        />
                        <Button
                            className={clsx(styles.formBody__item, styles.formBody__item_date)}
                            variant="white"
                        >
                            <Typography variant="h2" as="span">
                                Дата заезда
                            </Typography>
                        </Button>
                        <Button
                            className={clsx(styles.formBody__item, styles.formBody__item_date)}
                            variant="white"
                        >
                            <Typography variant="h2" as="span">
                                Дата выезда
                            </Typography>
                        </Button>
                        <GuestsField
                            className={clsx(styles.formBody__item, styles.formBody__item_guests)}
                        />
                        <Button className={styles.formBody__item}>
                            <Typography variant="h2" as="span">
                                Поиск
                            </Typography>
                        </Button>
                    </div>
                </form>
            </Container>
        </div>
    );
};
