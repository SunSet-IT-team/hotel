'use client';

import { type FC } from 'react';
import clsx from 'clsx';

import { DateRange } from '@/features/DateRange';
import { GuestsField } from '@/features/GuestsField';
import type { LocationOption as SearchLocationOption } from '@/features/SearchLocation';
import { SearchLocation } from '@/features/SearchLocation';
import { useTranslation } from '@/shared/hooks';
import { fetchMockData1 } from '@/shared/mocks/searchLocation';
import type { ISODate } from '@/shared/types/global.types';
import { Button, Typography } from '@/shared/ui';
import { type DateRange as DateRangeType } from '@/shared/ui/Calendar';

import { type FormData } from '../model/types';

import styles from './SearchForm.module.scss';

interface Props {
    formData: FormData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: Record<string, any> | undefined;
    isSubmitting: boolean;
    onChangeQuery: (v: string) => void;
    onSelectDestination: (v: SearchLocationOption) => void;
    onChangeDateRange: (v: DateRangeType<ISODate>) => void;
    onChangePeoplesCount: (v: { adults: number; children: number }) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
}

export const SearchFormFields: FC<Props> = ({
    formData,
    isSubmitting,
    onChangeQuery,
    onSelectDestination,
    onChangeDateRange,
    onChangePeoplesCount,
    onSubmit,
}) => {
    const translate = useTranslation();

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={clsx(styles.form__body, styles.formBody)}>
                <SearchLocation
                    value={formData.query ?? ''}
                    onChange={onChangeQuery}
                    onSelect={onSelectDestination}
                    className={clsx(styles.formBody__item, styles.formBody__item_searchLocation)}
                    placeholder={translate.search.placeholder}
                    fetchData={fetchMockData1}
                />

                <DateRange
                    value={formData.dateRange as DateRangeType<ISODate>}
                    onChange={onChangeDateRange}
                    className={clsx(styles.formBody__item, styles.formBody__item_date)}
                />

                <GuestsField
                    value={formData.peoplesCount}
                    onChange={onChangePeoplesCount}
                    className={clsx(styles.formBody__item, styles.formBody__item_guests)}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={clsx(styles.formBody__item, styles.formBody__item_searchBtn)}
                >
                    <Typography variant="h2" as="span" color="inherit">
                        {isSubmitting ? translate.search.searching : translate.search.search}
                    </Typography>
                </Button>
            </div>
        </form>
    );
};
