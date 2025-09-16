'use client';

import { Button, Container, Typography } from '@/shared/ui';
import clsx from 'clsx';
import { FC } from 'react';

import styles from './SearchForm.module.scss';
import { fetchMockData, SearchLocation } from '@/features/SearchLocation';
import { GuestsField } from '@/features/GuestsField';

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
                            fetchData={fetchMockData}
                        />
                        <Button className={clsx(styles.formBody__item, styles.formBody__item_date)} variant="white">
                            <Typography variant="h2" as="span">
                                Дата заезда
                            </Typography>
                        </Button>
                        <Button className={clsx(styles.formBody__item, styles.formBody__item_date)} variant="white">
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
