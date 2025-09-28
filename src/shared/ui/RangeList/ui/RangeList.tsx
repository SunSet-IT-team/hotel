'use client';

import { type FC, useEffect } from 'react';
import clsx from 'clsx';

import { StarIcon } from '../../../assets/icons';
import { useIsMobile } from '../../../hooks';
import { Typography } from '../../Typography/ui/Typography';

import styles from './RangeList.module.scss';

export interface RangeListOption {
    /** Значение элемента списка */
    value: string;
    /** Отображаемый текст элемента */
    label: string;
    /** Уникальный идентификатор элемента (опционально) */
    id?: string;
}

export interface RangeListProps {
    /** Дополнительные CSS-классы */
    className?: string;

    /**
     * Массив опций для отображения в списке.
     * Каждая опция содержит value, label и опциональный id.
     */
    options: RangeListOption[];

    /**
     * Ориентация списка элементов.
     *
     * Возможные значения:
     * - `"vertical"` - элементы расположены вертикально (по умолчанию)
     * - `"horizontal"` - элементы расположены горизонтально
     *
     * @defaultValue "vertical"
     */
    orientation?: 'vertical' | 'horizontal';

    /**
     * Callback функция, вызываемая при изменении выбранных элементов.
     *
     * @param selectedItems - массив выбранных элементов
     */
    onChange: (selectedItems: RangeListOption[]) => void;

    /**
     * Режим выбора элементов.
     *
     * Возможные значения:
     * - `"single"` - можно выбрать только один элемент
     * - `"multiple"` - можно выбрать несколько элементов
     *
     * @defaultValue "multiple"
     */
    selectionMode?: 'single' | 'multiple';

    /**
     * Массив выбранных элементов.
     * Используется для контролируемого компонента.
     *
     * @defaultValue []
     */
    selectedItems?: RangeListOption[];

    /**
     * Показывать ли иконку звезды рядом с текстом.
     *
     * @defaultValue false
     */
    showStarIcon?: boolean;

    /**
     * Выравнивание содержимого внутри элементов.
     *
     * Возможные значения:
     * - `"left"` - по левому краю
     * - `"center"` - по центру
     * - `"right"` - по правому краю
     *
     * @defaultValue "left"
     */
    align?: 'left' | 'center' | 'right';

    /**
     * Ширина элементов списка.
     * Может быть задана в любых CSS единицах (px, %, rem, etc.)
     *
     * @defaultValue "auto"
     */
    itemWidth?: string;

    /**
     * Скрывать ли границы элементов.
     * Если false, границы элементов будут скрыты.
     *
     * @defaultValue true
     */
    hideBorder?: boolean;
}

/**
 * Компонент списка выбора с возможностью множественного или одиночного выбора.
 * Поддерживает различные ориентации, выравнивание содержимого и отображение иконок.
 *
 * Особенности:
 * - Адаптивная типографика (h2 на мобильных, h3 на десктопе)
 * - Поддержка вертикальной и горизонтальной ориентации
 * - Настраиваемое выравнивание содержимого
 * - Возможность отображения иконки звезды
 * - Режимы одиночного и множественного выбора
 *
 * @example
 * ```tsx
 * <RangeList
 *     options={options}
 *     orientation="horizontal"
 *     selectionMode="single"
 *     showStarIcon={true}
 *     align="center"
 *     itemWidth="150px"
 *     onChange={handleChange}
 * />
 * ```
 */
export const RangeList: FC<RangeListProps> = ({
    className,
    options,
    orientation = 'vertical',
    onChange,
    selectionMode = 'multiple',
    selectedItems = [],
    showStarIcon = false,
    align = 'left',
    itemWidth = 'auto',
    hideBorder = true,
}) => {
    const isMobile = useIsMobile();
    const getItemKey = (item: RangeListOption) => item.id || item.value;

    useEffect(() => {
        // Отладочная информация (можно убрать в продакшене)
    }, [options, selectedItems]);

    const handleItemClick = (item: RangeListOption) => {
        const itemKey = getItemKey(item);
        const isSelected = selectedItems.some((selected) => getItemKey(selected) === itemKey);

        if (selectionMode === 'single') {
            if (isSelected) {
                onChange([]);
            } else {
                onChange([item]);
            }
        } else {
            if (isSelected) {
                onChange(selectedItems.filter((selected) => getItemKey(selected) !== itemKey));
            } else {
                onChange([...selectedItems, item]);
            }
        }
    };

    return (
        <div
            className={clsx(styles.root, styles[`root_${orientation}`], className)}
            style={{ '--item-width': itemWidth } as React.CSSProperties}
        >
            {options.map((item) => {
                const itemKey = getItemKey(item);
                const isSelected = selectedItems.some(
                    (selected) => getItemKey(selected) === itemKey,
                );

                return (
                    <button
                        key={itemKey}
                        type="button"
                        className={clsx(
                            styles.item,
                            styles[`item_${align}`],
                            isSelected &&
                                (hideBorder ? styles.item_selected : styles.item_selected_noBorder),
                            !hideBorder && styles.item_noBorder,
                        )}
                        onClick={() => handleItemClick(item)}
                    >
                        <Typography
                            variant={isMobile ? 'h2' : 'h3'}
                            as="span"
                            className={styles.text}
                            color={isSelected ? (hideBorder ? 'white' : 'blue') : 'dark'}
                        >
                            {item.label}
                        </Typography>
                        {showStarIcon && <StarIcon className={styles.starIcon} />}
                    </button>
                );
            })}
        </div>
    );
};
