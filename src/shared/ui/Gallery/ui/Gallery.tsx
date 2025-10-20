'use client';

import { type FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { PhotoIcon } from '@/shared/assets/icons';

import { Typography } from '../../Typography';

import styles from './Gallery.module.scss';

interface Props {
    images: string[];
    /**
     * Alt текст для изображений
     */
    alt?: string;
    /**
     * Callback при клике на изображение
     * Передает индекс кликнутого изображения
     */
    onImageClick?: (index: number) => void;
    /**
     * Дополнительный CSS класс
     */
    className?: string;
}

export const Gallery: FC<Props> = ({ images, alt = 'Gallery image', onImageClick, className }) => {
    const totalImages = images.length;

    // Определяем сколько картинок показывать и сколько скрыто
    let displayImages: string[];
    let remainingCount = 0;
    let gridLayout: string;

    if (totalImages <= 4) {
        // До 4 картинок: простая сетка
        displayImages = images;
        gridLayout = 'simpleGrid';
    } else {
        // 5+ картинок: сложная сетка (большие по краям, маленькие в центре)
        displayImages = images.slice(0, 6);
        remainingCount = totalImages - 6;
        gridLayout = 'complexGrid';
    }

    const handleImageClick = (index: number) => {
        onImageClick?.(index);
    };

    const handleOpenSlider = () => {
        // TODO: Открыть слайдер на весь экран
        console.info('Open fullscreen slider with', totalImages, 'images');
    };

    return (
        <div className={clsx(styles.root, styles[gridLayout], className)}>
            {displayImages.map((image, index) => {
                const isLast = index === displayImages.length - 1;
                const hasMore = remainingCount > 0 && isLast;

                return (
                    <div
                        key={image}
                        className={clsx(styles.imageWrapper, styles[`image${index + 1}`])}
                        onClick={() => handleImageClick(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleImageClick(index);
                            }
                        }}
                    >
                        <Image
                            src={image}
                            alt={`${alt} ${index + 1}`}
                            className={styles.image}
                            fill
                        />
                        {hasMore && (
                            <div className={styles.overlay} onClick={handleOpenSlider}>
                                <PhotoIcon className={styles.photoIcon} />
                                <Typography
                                    variant="h3"
                                    color="white"
                                    className={styles.viewAllText}
                                >
                                    Посмотреть все фото
                                </Typography>
                            </div>
                        )}
                        {!hasMore && isLast && totalImages > 6 && (
                            <div className={styles.viewAllOverlay} onClick={handleOpenSlider}>
                                <Typography
                                    variant="h3"
                                    color="white"
                                    className={styles.viewAllText}
                                >
                                    Смотреть все фото
                                </Typography>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
