import { useIsMobile } from '@/shared/hooks/useMediaQuery';
import { Typography } from '@/shared/ui/Typography';

import styles from './NoResults.module.scss';

interface NoResultsProps {
    className?: string;
    title?: string;
    text?: string;
}

export const NoResults = ({
    className,
    title = 'По вашему запросу отелей не найдено.',
    text = 'Пожалуйста измените настройки поиска.',
}: NoResultsProps) => {
    const isMobile = useIsMobile();
    return (
        <div className={`${styles.root} ${className || ''}`}>
            <Typography variant={isMobile ? 'h4' : 'h2'} color="blue" className={styles.message}>
                {title}
            </Typography>
            <Typography variant={isMobile ? 'h2' : 'h3'} color="dark" className={styles.subMessage}>
                {text}
            </Typography>
        </div>
    );
};
