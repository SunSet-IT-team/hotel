'use client';

import { Button, Container, Typography } from '@/shared/ui';
import clsx from 'clsx';
import { FC } from 'react';

import styles from './SearchForm.module.scss';
import { fetchMockData, SearchLocation } from '@/features/SearchLocation';
import { GuestsField } from '@/features/GuestsField';

export const SearchForm: FC = () => {
    return (
        <div className={styles.root}>
            <Container variant="header">
                <Typography color="white" variant="h1" as="h1">
                    Открой мир и путешествуй легко
                </Typography>
                <form className={styles.form}>
                    <div className={clsx(styles.form__body, styles.formBody)}>
                        <SearchLocation
                            className={styles.formBody__item}
                            fetchData={fetchMockData}
                        />
                        <Button className={styles.formBody__item} variant="white">
                            Дата заезда
                        </Button>
                        <Button className={styles.formBody__item} variant="white">
                            Дата выезда
                        </Button>
                        <GuestsField className={styles.formBody__item} />
                        <Button className={styles.formBody__item}>Поиск</Button>
                    </div>
                </form>
            </Container>
        </div>
    );
};
