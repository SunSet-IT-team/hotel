import type { Meta, StoryObj } from '@storybook/nextjs';

import { Select, type SelectOption } from '..';

import styles from './Select.stories.module.scss';

const meta = {
    title: 'UI/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        options: {
            control: 'object',
            description: 'Массив опций для выбора',
        },
        onChange: {
            action: 'changed',
            description: 'Callback при изменении выбора',
        },
        className: {
            control: 'text',
            description: 'Дополнительные CSS классы для кастомизации',
        },
    },
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof meta>;

const defaultOptions: SelectOption[] = [
    { value: 'option1', label: 'Цена за номер/ночь (без налогов и сборов)' },
    { value: 'option2', label: 'Цена за номер/ночь (вкл. налоги и сборы)' },
    { value: 'option3', label: 'Итого (в т.ч. налоги и сборы)' },
];

export const Default: Story = {
    render: () => (
        <div className={styles.container}>
            <Select options={defaultOptions} />
        </div>
    ),
    args: {
        options: defaultOptions,
    },
};

export default meta;
