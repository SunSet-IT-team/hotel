import { type FC } from 'react';

import { MapIcon } from '@/shared/assets/icons';
import { useIsMobile } from '@/shared/hooks';
import { Typography } from '@/shared/ui';

import styles from './HotelLocation.module.scss';

interface HotelLocationProps {
    address: string;
    variant?: 'default' | 'detailed';
}

export const HotelLocation: FC<HotelLocationProps> = ({ address, variant = 'default' }) => {
    const isMobile = useIsMobile();
    const yandexMapLink = `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;

    return (
        <div className={styles.location} data-variant={variant}>
            <MapIcon className={styles.mapIcon} />
            <Typography variant="h3" as="span" color="dark" className={styles.address}>
                {address}
            </Typography>
            <Typography
                variant="h3"
                as="a"
                color="blue"
                className={styles.mapLink}
                href={yandexMapLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                {isMobile ? 'На карте' : 'Посмотреть на карте'}
            </Typography>
        </div>
    );
};
