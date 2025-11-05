'use client';

import { type FC, useMemo, useState } from 'react';

import { Button, Container, Typography } from '@/shared/ui';

import { useSearchForm } from '../hooks/useSearchForm';
import { type FormData } from '../model/types';
import { buildFormSummary } from '../utils/buildFormSummary';
import { type ParsedFormFromURL } from '../utils/parseSearchParams';

import { SearchFormFields } from './SearchFromFields';

import styles from './SearchForm.module.scss';

interface Props {
    initialValues?: Partial<FormData> | ParsedFormFromURL;
    /** Контролируемое состояние: активен ли компактный режим */
    active?: boolean;
    /** Начальное значение для неконтролируемого режима */
    defaultActive?: boolean;
    /** Сообщить родителю об изменении */
    onActiveChange?: (next: boolean) => void;
    title?: string;
}

export const SearchForm: FC<Props> = ({
    initialValues,
    active,
    defaultActive = false,
    onActiveChange,
    title = 'Открой мир и путешествуй легко',
}) => {
    // локальный стейт, если внешнее value не передано
    const [innerActive, setInnerActive] = useState(defaultActive);
    const isActive = active ?? innerActive;

    const setActive = (next: boolean) => {
        if (onActiveChange) onActiveChange(next);
        if (active === undefined) setInnerActive(next);
    };

    const toggleActive = () => setActive(!isActive);

    const hook = useSearchForm(initialValues);
    const summary = useMemo(() => buildFormSummary(hook.formData), [hook.formData]);

    return (
        <div className={styles.root}>
            <Container variant="header">
                {isActive && (
                    <Typography color="white" variant="h1" as="h1" className={styles.root__title}>
                        {title}
                    </Typography>
                )}

                {!isActive ? (
                    <Button
                        type="button"
                        className={`${styles.formBody__item} ${styles.formBody__item_searchAllBtn}`}
                        onClick={toggleActive}
                        aria-label="Развернуть поиск"
                        aria-expanded={!isActive}
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
                            setActive(false); // включаем компактный режим
                            return hook.handleSubmit(e);
                        }}
                    />
                )}
            </Container>
        </div>
    );
};
