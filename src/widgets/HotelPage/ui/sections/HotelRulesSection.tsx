import { type FC, memo } from 'react';

import { HotelDescription } from '@/features/HotelDescription';

import { type HotelRulesSectionProps } from './types';

import styles from '../HotelPage.module.scss';

/**
 * Секция правил отеля
 */
export const HotelRulesSection: FC<HotelRulesSectionProps> = memo(({ rules }) => {
    if (rules.length === 0) return null;

    return (
        <section className={styles.descriptionSection}>
            <HotelDescription title="Правила объекта размещения" description={rules} />
        </section>
    );
});

HotelRulesSection.displayName = 'HotelRulesSection';
