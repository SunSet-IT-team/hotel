import { Box, Skeleton, SkeletonGroup } from '@/shared/ui';

import styles from './FilterForm.module.scss';

/**
 * Скелетон для формы фильтра отелей
 */
export const FilterFormSkeleton = () => {
    return (
        <div className={styles.root}>
            <Box className={styles.box}>
                {/* Фильтр цены */}
                <div className={styles.priceContainer}>
                    <SkeletonGroup direction="column" gap={20}>
                        <Skeleton width="40%" height={28} />
                        <Skeleton height={120} variant="rounded" />
                        <SkeletonGroup direction="column" gap={8}>
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} height={32} variant="rounded" />
                            ))}
                        </SkeletonGroup>
                    </SkeletonGroup>
                </div>

                {/* Фильтр по звездам */}
                <div className={styles.starRatingContainer}>
                    <SkeletonGroup direction="column" gap={16}>
                        <Skeleton width="50%" height={24} />
                        <SkeletonGroup direction="row" gap={12}>
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} width={50} height={32} variant="rounded" />
                            ))}
                        </SkeletonGroup>
                    </SkeletonGroup>
                </div>

                {/* Фильтр по рейтингу */}
                <div className={styles.reviewRatingContainer}>
                    <SkeletonGroup direction="column" gap={16}>
                        <Skeleton width="50%" height={24} />
                        <Skeleton height={60} variant="rounded" />
                    </SkeletonGroup>
                </div>

                {/* Фильтр удобств */}
                <div className={styles.amenitiesContainer}>
                    <SkeletonGroup direction="column" gap={16}>
                        <Skeleton width="40%" height={24} />
                        <SkeletonGroup direction="column" gap={8}>
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} height={28} variant="rounded" />
                            ))}
                        </SkeletonGroup>
                    </SkeletonGroup>
                </div>

                {/* Фильтр по локации */}
                <div className={styles.locationContainer}>
                    <SkeletonGroup direction="column" gap={16}>
                        <Skeleton width="45%" height={24} />
                        <Skeleton height={48} variant="rounded" />
                        <SkeletonGroup direction="column" gap={8}>
                            {[1, 2].map((i) => (
                                <Skeleton key={i} height={28} variant="rounded" />
                            ))}
                        </SkeletonGroup>
                    </SkeletonGroup>
                </div>
            </Box>
        </div>
    );
};
