'use client';

import { type FC, useEffect, useMemo, useState } from 'react';

import { Button, Container, Typography } from '@/shared/ui';

import { useSearchForm } from '../hooks/useSearchForm';
import { type FormData } from '../model/types';
import { buildFormSummary } from '../utils/buildFormSummary';
import { type ParsedFormFromURL } from '../utils/parseSearchParams';

import { SearchFormFields } from './SearchFromFields';

import styles from './SearchForm.module.scss';

export const SearchForm: FC<{
    initialValues?: Partial<FormData> | ParsedFormFromURL;
    collapsedInitially?: boolean;
    title?: string;
}> = ({ initialValues, collapsedInitially, title = 'Открой мир и путешествуй легко' }) => {
    const hook = useSearchForm(initialValues);
    const [collapsed, setCollapsed] = useState<boolean>(() => !!collapsedInitially);

    // Синхронизируем collapsed, если пропс явно поменялся
    useEffect(() => {
        if (collapsedInitially !== undefined) setCollapsed(!!collapsedInitially);
    }, [collapsedInitially]);

    const summary = useMemo(() => buildFormSummary(hook.formData), [hook.formData]);

    return (
        <div className={styles.root}>
            <Container variant="header">
                {!collapsed && (
                    <Typography color="white" variant="h1" as="h1" className={styles.root__title}>
                        {title}
                    </Typography>
                )}

                {collapsed ? (
                    // Свёрнутый режим: показываем одну большую кнопку с резюме
                    <Button
                        type="button"
                        className={`${styles.formBody__item} ${styles.formBody__item_searchAllBtn}`}
                        onClick={() => setCollapsed(false)}
                        aria-label="Развернуть поиск"
                        variant="white"
                    >
                        <Typography variant="h2" as="span" color="inherit">
                            {summary || 'Поиск'}
                        </Typography>
                    </Button>
                ) : (
                    <SearchFormFields
                        formData={hook.formData}
                        errors={hook.errors}
                        isSubmitting={hook.isSubmitting}
                        onChangeQuery={hook.onChangeQuery}
                        onSelectDestination={hook.onSelectDestination}
                        onChangeDateRange={hook.onChangeDateRange}
                        onChangePeoplesCount={hook.onChangePeoplesCount}
                        onSubmit={(e) => {
                            setCollapsed(true);
                            return hook.handleSubmit(e);
                        }}
                    />
                )}
            </Container>
        </div>
    );
};
