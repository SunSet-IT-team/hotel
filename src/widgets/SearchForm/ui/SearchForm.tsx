// widgets/SearchFormWidget/index.tsx
'use client';

import { type FC } from 'react';

import { Container, Typography } from '@/shared/ui';

import { useSearchForm } from '../hooks/useSearchForm';

import { SearchFormFields } from './SearchFromFields';

import styles from './SearchForm.module.scss';

export const SearchForm: FC = () => {
    const hook = useSearchForm();

    return (
        <div className={styles.root}>
            <Container variant="header">
                <Typography color="white" variant="h1" as="h1" className={styles.root__title}>
                    Открой мир и путешествуй легко
                </Typography>

                <SearchFormFields
                    formData={hook.formData}
                    errors={hook.errors}
                    isSubmitting={hook.isSubmitting}
                    onChangeQuery={hook.onChangeQuery}
                    onSelectDestination={hook.onSelectDestination}
                    onChangeDateRange={hook.onChangeDateRange}
                    onChangePeoplesCount={hook.onChangePeoplesCount}
                    onSubmit={hook.handleSubmit}
                />
            </Container>
        </div>
    );
};
