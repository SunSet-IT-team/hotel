import { type FC } from 'react';
import clsx from 'clsx';

import { Box, Typography } from '@/shared/ui';

import { type HotelDescriptionProps } from '../model/types';

import styles from './HotelDescription.module.scss';

export const HotelDescription: FC<HotelDescriptionProps> = ({ title, description, className }) => {
    return (
        <Box className={clsx(styles.root, className)}>
            <div className={styles.container}>
                <Typography variant="h5" as="h3" color="blue" className={styles.title}>
                    {title}
                </Typography>
                {description.map((item) => (
                    <div key={item.subtitle || item.subtext.substring(0, 50)}>
                        {item.subtitle && (
                            <Typography
                                variant="h2"
                                as="h4"
                                color="dark"
                                className={styles.subtitle}
                            >
                                {item.subtitle}
                            </Typography>
                        )}
                        <Typography
                            variant="h3"
                            as="div"
                            color="dark"
                            className={styles.subtext}
                            dangerouslySetInnerHTML={{ __html: item.subtext }}
                        />
                    </div>
                ))}
            </div>
        </Box>
    );
};
