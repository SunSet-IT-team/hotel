import { type FC } from 'react';
import clsx from 'clsx';

import { Typography } from '../../Typography';
import { type ConvenienceProps } from '../model/types';

import styles from './Convenience.module.scss';

export const Convenience: FC<ConvenienceProps> = ({ label, icon, className }) => {
    return (
        <div className={clsx(styles.root, className)}>
            <div className={styles.icon}>{icon}</div>
            <Typography variant="h2" as="span" color="dark" className={styles.label}>
                {label}
            </Typography>
        </div>
    );
};
