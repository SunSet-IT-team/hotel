import { Skeleton } from '@/shared/ui';

import styles from './SearchLocation.module.scss';

/**
 * Количество skeleton-загрузчиков при загрузке результатов
 */
const SKELETON_COUNT = 3;

interface SearchLocationSkeletonProps {
    /**
     * Количество элементов скелетона
     * @default 3
     */
    count?: number;
}

/**
 * Скелетон для результатов поиска локаций
 * Отображается во время загрузки результатов поиска городов/отелей
 */
export const SearchLocationSkeleton = ({ count = SKELETON_COUNT }: SearchLocationSkeletonProps) => {
    return (
        <>
            {Array.from({ length: count }, (_, i) => (
                <Skeleton
                    key={`skeleton-${i}`}
                    className={styles.searchMenu__resultOption}
                    height={84}
                    variant="rounded"
                />
            ))}
        </>
    );
};
