import { type FC, memo } from 'react';

import { HotelDescription } from '@/features/HotelDescription';
import { useTranslation } from '@/shared/hooks';

import { type HotelDescriptionSectionProps } from './types';

import styles from '../HotelPage.module.scss';

/**
 * Секция описания отеля (два горизонтальных блока)
 */
export const HotelDescriptionSection: FC<HotelDescriptionSectionProps> = memo(
    ({ description, importantInfo }) => {
        const translate = useTranslation();

        if (description.length === 0 && importantInfo.length === 0) return null;

        return (
            <section className={styles.horizontalBlocks}>
                {description.length > 0 && (
                    <HotelDescription
                        title={translate.hotel.description}
                        description={description}
                    />
                )}
                {importantInfo.length > 0 && (
                    <HotelDescription
                        title={translate.hotel.importantInfo}
                        description={importantInfo}
                    />
                )}
            </section>
        );
    },
);

HotelDescriptionSection.displayName = 'HotelDescriptionSection';
