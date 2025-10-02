'use client';

import { type FC, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import { useIsMobile } from '@/shared/hooks/useMediaQuery';
import { RangeList, RangeSlider, Select, Typography } from '@/shared/ui';
import type { RangeListOption } from '@/shared/ui/RangeList/ui/RangeList';

import type { PriceFilterProps } from '../model/types';

import styles from './PriceFilter.module.scss';

/**
 * @Kempek
 *
 * TODO:
 *
 * У селекта стоит max-width? Лучше дать ему width: 100%;
 *
 * val -> value (ну опять таки это вкусовщина, но хотелось бы не додумывать)
 * it -> items или item
 *
 * Так ведь проще, когда у нас есть value и items или item
 */

export const PriceFilter: FC<PriceFilterProps> = ({
    title = 'Цена',
    price,
    selectItems,
    rangeItems = [],
    onPriceChange,
    onSelectChange,
    className,
}) => {
    const [range, setRange] = useState<[number, number]>(price.value ?? [price.min, price.max]);
    const isMobile = useIsMobile();
    const [selectedValue, setSelectedValue] = useState<string>(selectItems?.[0]?.value ?? '');

    const [selectedRange, setSelectedRange] = useState<string>('');

    useEffect(() => {
        if (price.value) {
            setRange(price.value);
        }
    }, [price.value]);

    useEffect(() => {
        if (selectItems && selectItems.length > 0) {
            const exists = selectItems.some((it) => it.value === selectedValue);
            if (!exists) {
                setSelectedValue(selectItems[0].value);
            }
        }
    }, [selectItems, selectedValue]);

    const formatPrice = useCallback((v: number) => `${v.toLocaleString('ru-RU')}₽`, []);

    const handleSliderChange = useCallback(
        (val: [number, number]) => {
            setRange(val);
            setSelectedRange('');
            onPriceChange?.(val);
        },
        [onPriceChange],
    );

    const handleSelectChange = useCallback(
        (val: string) => {
            setSelectedValue(val);
            onSelectChange?.(val);
        },
        [onSelectChange],
    );

    const handleRangeChange = useCallback(
        (selectedRanges: RangeListOption[]) => {
            if (selectedRanges.length > 0) {
                const selectedRangeValue = selectedRanges[0].value;
                setSelectedRange(selectedRangeValue);

                const rangeItem = rangeItems.find((item) => item.value === selectedRangeValue);
                if (
                    rangeItem &&
                    rangeItem.minPrice !== undefined &&
                    rangeItem.maxPrice !== undefined
                ) {
                    const newRange: [number, number] = [rangeItem.minPrice, rangeItem.maxPrice];
                    setRange(newRange);
                    onPriceChange?.(newRange);
                }
            }
        },
        [rangeItems, onPriceChange],
    );

    return (
        <div className={clsx(styles.root, className)}>
            <div className={styles.titleContainer}>
                <Typography as="h5" variant="h5" color="blue" className={styles.title}>
                    {title}
                </Typography>

                <div className={styles.sliderContainer}>
                    <RangeSlider
                        min={price.min}
                        max={price.max}
                        value={range}
                        onChange={handleSliderChange}
                        step={price.step ?? 100}
                        variant={isMobile ? 'circleThumbs' : 'roundedThumbs'}
                        fullWidth
                        options={{
                            renderDisplayedValues: formatPrice,
                            thumbs: { toggleVisible: false },
                        }}
                    />
                </div>
            </div>

            <div className={styles.selectContainer}>
                <Select
                    options={selectItems}
                    onChange={handleSelectChange}
                    className={styles.select}
                />
            </div>

            <div className={styles.rangesContainer}>
                {rangeItems.length > 0 && (
                    <RangeList
                        options={rangeItems.map((item) => ({
                            value: item.value,
                            label: item.label,
                            id: item.value,
                        }))}
                        orientation="horizontal"
                        selectionMode="single"
                        align="center"
                        selectedItems={
                            selectedRange
                                ? [{ value: selectedRange, label: '', id: selectedRange }]
                                : []
                        }
                        onChange={handleRangeChange}
                        className={styles.ranges}
                    />
                )}
            </div>
        </div>
    );
};
