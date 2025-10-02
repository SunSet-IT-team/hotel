import { type FC } from 'react';
import clsx from 'clsx';

import { StarIcon } from '@/shared/assets/icons';

import { type StarRatingProps } from '../model/types';

import styles from './StarRating.module.scss';

export const StarRating: FC<StarRatingProps> = ({ count, className, classNameStar }) => {
    return (
        <div className={clsx(styles.root, className)}>
            {Array.from({ length: count }, (_, index) => (
                <StarIcon key={index} className={classNameStar} />
            ))}
        </div>
    );
};
