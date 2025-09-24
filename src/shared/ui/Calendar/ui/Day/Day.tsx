import { type FC } from 'react';
import clsx from 'clsx';

import { Typography } from '@/shared/ui/Typography';

import styles from './Day.module.scss';

interface Props {
    date: Date | null;
    isSelected?: boolean;
    isInRange?: boolean;
    isRangeStart?: boolean;
    isRangeEnd?: boolean;
    handleClick: (date: Date) => void;
    animationDelay?: number;
}

export const Day: FC<Props> = ({
    date,
    isSelected,
    isInRange,
    isRangeStart,
    isRangeEnd,
    handleClick,
    animationDelay = 0,
}) => {
    if (!date) {
        return <div />;
    }

    return (
        <button
            type="button"
            onClick={() => handleClick(date)}
            className={clsx(styles.root, {
                [styles.selected]: isSelected,
                [styles.inRange]: isSelected ? false : isInRange,
                [styles.isRangeStart]: isRangeStart,
                [styles.isRangeEnd]: isRangeEnd,
            })}
            style={{ animationDelay: `${animationDelay}s` }}
        >
            <Typography variant={'h4'} color={isSelected ? 'white' : 'dark'} className={styles.day}>
                {date.getDate()}
            </Typography>
        </button>
    );
};
