import { type FC } from 'react';

import { useIsMobile } from '@/shared/hooks';
import { StarRating, Typography } from '@/shared/ui';

import styles from './HotelHeader.module.scss';

interface HotelHeaderProps {
    hotelName: string;
    starRating: number;
    variant?: 'default' | 'detailed';
}

export const HotelHeader: FC<HotelHeaderProps> = ({
    hotelName,
    starRating,
    variant = 'default',
}) => {
    const isMobile = useIsMobile();

    return (
        <div className={styles.header} data-variant={variant}>
            <Typography
                variant={isMobile ? 'h4' : 'h5'}
                as="h2"
                color="blue"
                className={styles.hotelName}
            >
                {hotelName}
            </Typography>
            <StarRating
                count={starRating}
                className={styles.stars}
                classNameStar={styles.starIcon}
            />
        </div>
    );
};
