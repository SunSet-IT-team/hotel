import type { Meta, StoryObj } from '@storybook/nextjs';

import { Box } from '../Box';

const meta: Meta<typeof Box> = {
    title: 'UI/Box',
    component: Box,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Один интерактивный сторис. Меняйте `as`, `padding`/точечные паддинги и `flexDirection` в Controls.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            description: 'Содержимое компонента',
        },
        as: {
            control: 'select',
            options: ['div', 'section', 'article', 'main', 'aside'],
            description: 'HTML-элемент для рендера',
        },
        padding: {
            control: { type: 'number', min: 0, max: 100, step: 1 },
            description: 'Единый внутренний отступ (px). Перебивается точечными.',
        },
        paddingTop: {
            control: { type: 'number', min: 0, max: 100, step: 1 },
            description: 'Отступ сверху (px), перебивает `padding`',
        },
        paddingRight: {
            control: { type: 'number', min: 0, max: 100, step: 1 },
            description: 'Отступ справа (px), перебивает `padding`',
        },
        paddingBottom: {
            control: { type: 'number', min: 0, max: 100, step: 1 },
            description: 'Отступ снизу (px), перебивает `padding`',
        },
        paddingLeft: {
            control: { type: 'number', min: 0, max: 100, step: 1 },
            description: 'Отступ слева (px), перебивает `padding`',
        },
        flexDirection: {
            control: 'select',
            options: ['row', 'row-reverse', 'column', 'column-reverse'],
            description: 'Включает `display:flex` и задаёт направление',
        },
        className: { table: { disable: true } }, // этот проп есть в BoxProps — можно скрыть
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    name: 'Interactive',
    args: {
        children:
            'Изменяй as, padding / paddingTop|Right|Bottom|Left и flexDirection в Controls. ' +
            'По умолчанию: top/bottom=16, left/right=8.',
        as: 'div',
        padding: undefined,
        paddingTop: undefined,
        paddingRight: undefined,
        paddingBottom: undefined,
        paddingLeft: undefined,
        flexDirection: undefined,
    },
};
