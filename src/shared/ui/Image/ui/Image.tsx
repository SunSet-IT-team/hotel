import { type FC } from 'react';
import clsx from 'clsx';
import NextImage from 'next/image';

import styles from './Image.module.scss';

interface Props {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
}

export const Image: FC<Props> = ({ src, alt, width, height, className }) => {
    return (
        <NextImage
            src={src}
            alt={alt || ''}
            width={width || 100}
            height={height || 100}
            className={clsx(styles.root, className)}
        />
    );
};
