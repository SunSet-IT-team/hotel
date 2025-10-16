import { type FC, memo } from 'react';

import { HotelDescription } from '@/features/HotelDescription';

import { type HotelDescriptionSectionProps } from './types';

import styles from '../HotelPage.module.scss';

/**
 * Секция описания отеля (два горизонтальных блока)
 */
export const HotelDescriptionSection: FC<HotelDescriptionSectionProps> = memo(
    ({ description, importantInfo }) => {
        if (description.length === 0 && importantInfo.length === 0) return null;

        return (
            <section className={styles.horizontalBlocks}>
                {description.length > 0 && (
                    <HotelDescription
                        title="Описание объекта размещения"
                        description={description}
                    />
                )}
                {importantInfo.length > 0 && (
                    <HotelDescription title="Важная информация" description={importantInfo} />
                )}
            </section>
        );
    },
);

HotelDescriptionSection.displayName = 'HotelDescriptionSection';
