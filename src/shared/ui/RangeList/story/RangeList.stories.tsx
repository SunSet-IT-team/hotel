import { useState } from 'react';
import { type Meta, type StoryObj } from '@storybook/nextjs';

import { RangeList, type RangeListOption } from '../ui/RangeList';

import styles from './RangeList.stories.module.scss';

const meta: Meta<typeof RangeList> = {
    title: 'UI/RangeList',
    component: RangeList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: RangeListOption[] = [
    { id: '1', label: 'Наличие бассейна', value: 'pool' },
    { id: '2', label: 'Наличие wi-fi', value: 'wifi' },
    { id: '3', label: 'Наличие завтраков', value: 'breakfast' },
];

const starItems: RangeListOption[] = [
    { id: '1', label: '<2', value: 'lt2' },
    { id: '2', label: '3', value: '3' },
    { id: '3', label: '4', value: '4' },
    { id: '4', label: '5', value: '5' },
];

export const WithStarIcon: Story = {
    args: {
        options: starItems,
        showStarIcon: true,
        selectionMode: 'single',
    },
};

export const CenterAligned: Story = {
    args: {
        options: sampleItems,
        align: 'center',
        showStarIcon: true,
    },
};

export const RightAligned: Story = {
    args: {
        options: sampleItems,
        align: 'right',
        showStarIcon: true,
    },
};

export const Interactive: Story = {
    render: () => {
        const [selectedItems, setSelectedItems] = useState<RangeListOption[]>([]);
        const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');
        const [selectionMode, setSelectionMode] = useState<'single' | 'multiple'>('single');
        const [itemsType, setItemsType] = useState<'amenities' | 'stars'>('amenities');
        const [showStarIcon, setShowStarIcon] = useState(false);
        const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');

        const currentItems = itemsType === 'amenities' ? sampleItems : starItems;

        return (
            <div className={styles.container}>
                <div className={styles.controls}>
                    <div className={styles.controlGroup}>
                        <span>Ориентация:</span>
                        <select
                            value={orientation}
                            onChange={(e) =>
                                setOrientation(e.target.value as 'vertical' | 'horizontal')
                            }
                        >
                            <option value="vertical">Вертикальная</option>
                            <option value="horizontal">Горизонтальная</option>
                        </select>
                    </div>

                    <div className={styles.controlGroup}>
                        <span>Режим выбора:</span>
                        <select
                            value={selectionMode}
                            onChange={(e) =>
                                setSelectionMode(e.target.value as 'single' | 'multiple')
                            }
                        >
                            <option value="single">Один элемент</option>
                            <option value="multiple">Множественный</option>
                        </select>
                    </div>

                    <div className={styles.controlGroup}>
                        <span>Тип элементов:</span>
                        <select
                            value={itemsType}
                            onChange={(e) => setItemsType(e.target.value as 'amenities' | 'stars')}
                        >
                            <option value="amenities">Удобства</option>
                            <option value="stars">Звезды</option>
                        </select>
                    </div>

                    <div className={styles.controlGroup}>
                        <label>
                            <input
                                type="checkbox"
                                checked={showStarIcon}
                                onChange={(e) => setShowStarIcon(e.target.checked)}
                            />
                            Показать иконку звезды
                        </label>
                    </div>

                    <div className={styles.controlGroup}>
                        <span>Выравнивание:</span>
                        <select
                            value={align}
                            onChange={(e) =>
                                setAlign(e.target.value as 'left' | 'center' | 'right')
                            }
                        >
                            <option value="left">По левому краю</option>
                            <option value="center">По центру</option>
                            <option value="right">По правому краю</option>
                        </select>
                    </div>
                </div>

                <div className={styles.preview}>
                    <RangeList
                        options={currentItems}
                        orientation={orientation}
                        selectionMode={selectionMode}
                        selectedItems={selectedItems}
                        onChange={setSelectedItems}
                        showStarIcon={showStarIcon}
                        align={align}
                    />
                </div>

                <div className={styles.selected}>
                    <strong>Выбранные элементы:</strong>
                    <pre>{JSON.stringify(selectedItems, null, 2)}</pre>
                </div>
            </div>
        );
    },
};
