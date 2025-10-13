import { type FC } from 'react';

import { AmenitiesIcon } from '@/shared/assets/icons';
import { Typography } from '@/shared/ui';

import styles from './HotelAmenities.module.scss';

interface HotelAmenitiesProps {
    amenities: string[];
}

export const HotelAmenities: FC<HotelAmenitiesProps> = ({ amenities }) => {
    if (!amenities.length) return null;

    return (
        <div className={styles.amenities}>
            <AmenitiesIcon className={styles.amenitiesIcon} />
            <Typography variant="h3" as="span" color="dark">
                {amenities.join(', ')}
            </Typography>
        </div>
    );
};
