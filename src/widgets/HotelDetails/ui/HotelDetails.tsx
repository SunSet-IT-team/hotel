import { type FC } from 'react';
import clsx from 'clsx';

import { Amenities } from '@/features/Amenities';
import { HotelInfo } from '@/features/HotelInfo';
import { ConferenceIcon } from '@/shared/assets/icons';
import { Button, Typography } from '@/shared/ui';

import { type HotelDetailsProps } from '../model/types';

import styles from './HotelDetails.module.scss';

const AmenitiesOptions = [
    {
        label: 'Частная парковка',
        icon: <ConferenceIcon />,
    },
    {
        label: 'Ресторан',
        icon: <ConferenceIcon />,
    },
    {
        label: 'Конференц-зал',
        icon: <ConferenceIcon />,
    },
    {
        label: 'Конференц-зал',
        icon: <ConferenceIcon />,
    },
    {
        label: 'Услуга «звонок-будильник»',
        icon: <ConferenceIcon />,
    },
    {
        label: 'Конференц-зал',
        icon: <ConferenceIcon />,
    },
    {
        label: 'Конференц-зал',
        icon: <ConferenceIcon />,
    },
    {
        label: 'Конференц-зал',
        icon: <ConferenceIcon />,
    },
];

export const HotelDetails: FC<HotelDetailsProps> = ({ className }) => {
    return (
        <div className={clsx(styles.root, className)}>
            <div className={styles.images}>Картинки отеля</div>
            <div className={styles.info}>
                <HotelInfo
                    hotelName="Hotel Tarigua Ocaña"
                    starRating={3}
                    address="Cra 12 N° 8-47 centro, 546561 Оканья, Норте-де-Сантандер, Колумбия"
                />
                <Button variant="cyan" className={styles.button}>
                    <Typography variant="h2" as="span" color="white">
                        Забронировать
                    </Typography>
                </Button>
            </div>
            <div className={styles.amenities}>
                <Amenities amenities={AmenitiesOptions} title="Удобства" />
            </div>
            <div className={styles.Reviews} />
        </div>
    );
};

export default HotelDetails;
