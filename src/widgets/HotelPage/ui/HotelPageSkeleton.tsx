import { type FC } from 'react';
import clsx from 'clsx';

import { Container, Skeleton, SkeletonGroup, SkeletonText } from '@/shared/ui';

import styles from './HotelPage.module.scss';

/**
 * Скелетон для страницы отеля
 */
export const HotelPageSkeleton: FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={clsx(styles.root, className)}>
            <Container className={styles.container}>
                {/* Слайдер */}
                <Skeleton height={400} variant="rounded" />

                {/* Информация об отеле */}
                <SkeletonGroup direction="column" gap={16}>
                    <Skeleton width="50%" height={48} />
                    <SkeletonText lines={2} lastLineWidth="30%" />
                </SkeletonGroup>

                {/* Описание */}
                <SkeletonGroup direction="column" gap={12}>
                    <Skeleton width="20%" height={32} />
                    <SkeletonText lines={3} lastLineWidth="70%" />
                </SkeletonGroup>

                {/* Удобства */}
                <SkeletonGroup direction="column" gap={16}>
                    <Skeleton width="20%" height={32} />
                    <SkeletonGroup direction="row" gap={16}>
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} height={60} variant="rounded" />
                        ))}
                    </SkeletonGroup>
                </SkeletonGroup>

                {/* Отзывы */}
                <Skeleton height={200} variant="rounded" />

                {/* Цены */}
                <SkeletonGroup direction="row" gap={16}>
                    <Skeleton height={120} variant="rounded" />
                    <Skeleton height={120} variant="rounded" />
                    <Skeleton height={120} variant="rounded" />
                </SkeletonGroup>

                {/* Кнопка */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Skeleton width={300} height={60} variant="rounded" />
                </div>
            </Container>
        </div>
    );
};
