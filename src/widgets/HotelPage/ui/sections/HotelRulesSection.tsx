import { type FC, memo } from 'react';

import { HotelDescription } from '@/features/HotelDescription';
import { useTranslation } from '@/shared/hooks';

import { type HotelRulesSectionProps } from './types';

import styles from '../HotelPage.module.scss';

/**
 * Секция правил отеля
 */
export const HotelRulesSection: FC<HotelRulesSectionProps> = memo(({ rules }) => {
    const translate = useTranslation();

    if (rules.length === 0) return null;

    return (
        <section className={styles.descriptionSection}>
            <HotelDescription title={translate.hotel.rules} description={rules} />
        </section>
    );
});

HotelRulesSection.displayName = 'HotelRulesSection';
