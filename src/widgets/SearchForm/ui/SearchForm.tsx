'use client';

import { type FC, useState } from 'react';
import clsx from 'clsx';
import z from 'zod';

import { DateRange } from '@/features/DateRange';
import { GuestsField } from '@/features/GuestsField';
import { SearchLocation } from '@/features/SearchLocation';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { fetchMockData1 } from '@/shared/mocks/searchLocation';
import { type ISODate } from '@/shared/types/global.types';
import { Button, Container, Typography } from '@/shared/ui';
import { type DateRange as DateRangeType } from '@/shared/ui/Calendar';

import { setDateRange, setDestination, setPeoplesCount, setQuery } from '../model';
import { type FormData, formDataSchema } from '../model/shema';

import styles from './SearchForm.module.scss';

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
    const [isShowErrors, _setIsShowErrors] = useState(true);

    const userFormData = useAppSelector((state) => state.searchForm.values);
    const dispatch = useAppDispatch();

    const formData = {
        ...defaultValues,
        ...userFormData,
    };

    const validate = () => {
        const res = formDataSchema.safeParse(formData);
        if (res.success) return undefined;
        return z.treeifyError(res.error);
    };

    const errors = isShowErrors ? validate() : undefined;

    if (errors && errors.properties) {
        console.warn(
            errors.properties.query?.errors.join(' '),
            errors.properties.destination?.errors.join(' '),
            errors.properties.dateRange?.errors.join(' '),
            errors.properties.peoplesCount?.items?.[0]?.errors,
        );
    } else {
        console.info('Ошибок нет!');
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
