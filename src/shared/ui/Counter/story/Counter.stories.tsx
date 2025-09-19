import type { Meta, StoryObj } from '@storybook/nextjs';

import { Counter } from '..';

const meta = {
    title: 'UI/Counter',
    component: Counter,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Интерактивный счетчик с кнопками увеличения и уменьшения.',
            },
        },
    },
    argTypes: {
        value: {
            control: { type: 'number' },
            description: 'Текущее значение счетчика',
        },
        min: {
            control: { type: 'number' },
            description: 'Минимальное значение',
        },
        max: {
            control: { type: 'number' },
            description: 'Максимальное значение',
        },
        step: {
            control: { type: 'number' },
            description: 'Шаг изменения',
        },
        className: {
            control: { type: 'text' },
            description: 'Дополнительные CSS классы',
        },
        onChange: {
            action: 'changed',
            control: false,
            description: 'Колбэк при изменении значения',
        },
    },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {
    args: {
        value: 2,
        min: 0,
        max: 10,
        step: 1,
        className: '',
    },
};
