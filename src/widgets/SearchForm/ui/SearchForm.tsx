'use client';

import { useState, type FC } from 'react';
import clsx from 'clsx';

import { GuestsField } from '@/features/GuestsField';
import { DateRange } from '@/features/DateRange';
import { type Option as SearchLacationOption, SearchLocation } from '@/features/SearchLocation';
import { Button, Container, Typography } from '@/shared/ui';

import styles from './SearchForm.module.scss';
import { DateRange as DateRangeType } from '@/shared/ui/Calendar';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { setDateRange, setDestination, setPeoplesCount, setQuery } from '../model';
import { FormData, formDataSchema } from '../model/shema';
import z from 'zod';
import { ISODate } from '@/shared/types/global.types';

export const fetchMockData1 = (): Promise<SearchLacationOption[]> => {
    // Можно добавить фильтрацию по query, если нужно
    return Promise.resolve([
        { id: 1, name: 'Москва', city: 'Россия' },
        { id: 2, name: 'Санкт-Петербург', city: 'Россия' },
    ]);
};

const defaultValues: FormData = {
    query: '',
    destination: null,
    dateRange: {
        startDate: null,
        endDate: null,
    },
    peoplesCount: [0, 0],
};

/** Форма поиска под Header */
export const SearchForm: FC = () => {
    const [isShowErrors, setIsShowErrors] = useState(true);

    const userFormData = useAppSelector((state) => state.searchForm.values);
    const dispatch = useAppDispatch();

    const formData = {
        ...defaultValues,
        ...userFormData,
    };

    const validate = () => {
        const res = formDataSchema.safeParse(formData);
        if (res.success) return undefined;
        else return z.treeifyError(res.error);
    };

    const errors = isShowErrors ? validate() : undefined;

    if (errors && errors.properties) {
        console.log(
            errors.properties.query?.errors.join(' '),
            errors.properties.destination?.errors.join(' '),
            errors.properties.dateRange?.errors.join(' '),
            errors.properties.peoplesCount?.items?.[0]?.errors,
        );
    } else {
        console.log('Ошибок нет!');
    }

    return (
        <div className={styles.root} onSubmit={(e) => e.preventDefault()}>
            <Container variant="header">
                <Typography color="white" variant="h1" as="h1" className={styles.root__title}>
                    Открой мир и путешествуй легко
                </Typography>
                <form className={styles.form}>
                    <div className={clsx(styles.form__body, styles.formBody)}>
                        <SearchLocation
                            value={formData.query}
                            onChange={(v) => dispatch(setQuery(v))}
                            onSelect={(v) => dispatch(setDestination(v))}
                            className={clsx(
                                styles.formBody__item,
                                styles.formBody__item_searchLocation,
                            )}
                            placeholder="Город или отель"
                            fetchData={fetchMockData1}
                        />
                        <DateRange
                            value={formData.dateRange as DateRangeType<ISODate>}
                            onChange={(v) => dispatch(setDateRange(v))}
                            className={clsx(styles.formBody__item, styles.formBody__item_date)}
                        />
                        <GuestsField
                            value={formData.peoplesCount}
                            onChange={(v) => dispatch(setPeoplesCount(v))}
                            className={clsx(styles.formBody__item, styles.formBody__item_guests)}
                        />

                        <Button
                            className={clsx(styles.formBody__item, styles.formBody__item_searchBtn)}
                        >
                            <Typography variant="h2" as="span" color="inherit">
                                Поиск
                            </Typography>
                        </Button>
                    </div>
                </form>
            </Container>
        </div>
    );
};
