import { type FC } from 'react';

import { Box, Skeleton, SkeletonGroup, SkeletonText } from '@/shared/ui';

import styles from './HotelCard.module.scss';

/**
 * Скелетон для карточки отеля
 */
export const HotelCardSkeleton: FC<{ className?: string }> = ({ className }) => {
    return (
        <Box as="article" className={className || styles.root}>
            <div className={styles.topSection}>
                {/* Изображение */}
                <Skeleton height={300} variant="rounded" />

                <div className={styles.infoSection}>
                    {/* Информация об отеле */}
                    <SkeletonGroup direction="column" gap={12}>
                        <Skeleton width="60%" height={32} />
                        <SkeletonText lines={2} lastLineWidth="40%" />
                    </SkeletonGroup>

                    {/* Отзывы */}
                    <Skeleton height={100} variant="rounded" />
                </div>
            </div>

            <div className={styles.bottomSection}>
                {/* Цены */}
                <Skeleton height={80} variant="rounded" />
                {/* Кнопка */}
                <Skeleton height={56} variant="rounded" style={{ maxWidth: '200px' }} />
            </div>
        </Box>
    );
};
