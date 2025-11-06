'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { useTranslation } from '@/shared/hooks';
import { useIsMobile } from '@/shared/hooks/useMediaQuery';
import { Box, Button, Typography } from '@/shared/ui';
import { StarRating } from '@/shared/ui/StarRating';

import { type PartnerOffersProps } from '../model/types';

import styles from './PartnerOffers.module.scss';

export const PartnerOffers: FC<PartnerOffersProps> = ({
    title,
    amenities,
    price,
    starRating,
    image,
    link,
    className,
}) => {
    const isMobile = useIsMobile();
    const translate = useTranslation();

    return (
        <Box className={clsx(styles.root, className)}>
            <div className={styles.imageContainer}>
                <Image src={image} alt="Фото номера" className={styles.image} fill />
            </div>
            <div className={styles.content}>
                <Typography
                    variant={isMobile ? 'h4' : 'h5'}
                    as="h3"
                    color="blue"
                    className={styles.title}
                >
                    {title}
                </Typography>
                {!isMobile && (
                    <StarRating
                        count={starRating}
                        className={styles.stars}
                        classNameStar={styles.starIcon}
                    />
                )}
                <div className={styles.amenities}>
                    {amenities.map((amenity) => (
                        <Typography
                            key={amenity}
                            variant="h2"
                            as="span"
                            color="dark"
                            className={styles.amenity}
                        >
                            {amenity}
                        </Typography>
                    ))}
                </div>
                <div className={styles.mobileContainer}>
                    <div className={styles.priceContainer}>
                        <Typography
                            variant={isMobile ? 'h4' : 'h5'}
                            as="span"
                            color="blue"
                            className={styles.price}
                        >
                            {translate.partnerOffers.price}
                        </Typography>
                        <Typography
                            variant="h2"
                            as="span"
                            color="dark"
                            className={styles.priceValue}
                        >
                            {price}
                        </Typography>
                    </div>
                    <Button variant="cyan" fullWidth className={styles.button} as="a" href={link}>
                        <Typography variant="h2" as="span" color="#FFFFFF">
                            {translate.partnerOffers.booking}
                        </Typography>
                    </Button>
                </div>
            </div>
        </Box>
    );
};
