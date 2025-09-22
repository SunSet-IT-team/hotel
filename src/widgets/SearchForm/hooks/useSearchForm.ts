'use client';

import { type FormEvent, startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import z from 'zod';

import { useAppDispatch, useAppSelector, useDebouncedCallback } from '@/shared/hooks';
import type { ISODate } from '@/shared/types/global.types';
import { type DateRange as DateRangeType } from '@/shared/ui/Calendar';

import { setDateRange, setDestination, setPeoplesCount, setQuery, setSubmitting } from '../model';
import { formDataSchema } from '../model/shema';
import { type FormData } from '../model/types';
import { buildSearchUrl } from '../utils/buildSearchUrl';

const defaultValues: FormData = {
    query: '',
    destination: null,
    dateRange: {
        startDate: null,
        endDate: null,
    },
    peoplesCount: { adults: 1, children: 0 },
};

export const useSearchForm = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const userFormData = useAppSelector((state) => state.searchForm.values);
    const isSubmitting = useAppSelector((state) => state.searchForm.isSubmitting);

    const formData: FormData = useMemo(
        () => ({ ...defaultValues, ...userFormData }),
        [userFormData],
    );

    const [isShowErrors, setIsShowErrors] = useState(false);

    const validate = useCallback(() => {
        const res = formDataSchema.safeParse(formData);

        if (res.success) return undefined;

        return z.treeifyError(res.error);
    }, [formData]);

    const errors = isShowErrors ? validate() : undefined;

    const debouncedPrefetch = useDebouncedCallback((data: FormData) => {
        const url = buildSearchUrl('/search/hotels', {
            query: data.query,
            destination: data.destination,
            dateRange: data.dateRange,
            peoplesCount: data.peoplesCount,
        });
        router.prefetch(url);
    }, 250);

    useEffect(() => {
        debouncedPrefetch(formData);
    }, [formData, debouncedPrefetch, router]);

    const onChangeQuery = useCallback(
        (v: string) => {
            dispatch(setQuery(v));
        },
        [dispatch],
    );

    const onSelectDestination = useCallback(
        (v: { id: number; name: string; city: string }) => {
            dispatch(setDestination(v));
        },
        [dispatch],
    );

    const onChangeDateRange = useCallback(
        (v: DateRangeType<ISODate>) => {
            dispatch(setDateRange(v));
        },
        [dispatch],
    );

    const onChangePeoplesCount = useCallback(
        (v: { adults: number; children: number }) => {
            dispatch(setPeoplesCount(v));
        },
        [dispatch],
    );

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsShowErrors(true);

            const validationErrors = validate();
            if (validationErrors) {
                console.warn('Ошибки валидации (игнорируем для сабмита):', validationErrors);
            }

            try {
                dispatch(setSubmitting(true));

                const url = buildSearchUrl('/search/hotels', {
                    query: formData.query,
                    destination: formData.destination,
                    dateRange: formData.dateRange,
                    peoplesCount: formData.peoplesCount,
                });

                startTransition(() => {
                    router.push(url);
                });
            } catch (err) {
                console.error('Search submit error:', err);
            } finally {
                dispatch(setSubmitting(false));
            }
        },
        [dispatch, formData, router, validate],
    );

    return useMemo(
        () => ({
            formData,
            errors,
            isSubmitting,
            onChangeQuery,
            onSelectDestination,
            onChangeDateRange,
            onChangePeoplesCount,
            handleSubmit,
        }),
        [
            formData,
            errors,
            isSubmitting,
            onChangeQuery,
            onSelectDestination,
            onChangeDateRange,
            onChangePeoplesCount,
            handleSubmit,
        ],
    );
};
