import type { Meta, StoryObj } from '@storybook/nextjs';
import { WidthContainer } from '../../../../../.storybook/decorators/WidthContainer/WidthContainer';

import { Button } from '../ui/Button';

const meta = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'fullscreen',
        controls: { sort: 'requiredFirst' },
    },
    argTypes: {
        children: {
            control: {
                type: 'text',
            },
            description: 'Содержимое кнопки',
        },
    },
    decorators: [WidthContainer],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

const Template: Story = {
    args: {
        children: 'Текст кнопки',
        fullWidth: false,
        size: 'medium',
    },
};

export const Cyan: Story = {
    args: {
        ...Template.args,
        variant: 'cyan',
    },
};

export const White: Story = {
    args: {
        ...Template.args,
        variant: 'white',
    },
};

export const Glass: Story = {
    args: {
        ...Template.args,
        variant: 'glass',
    },

    globals: {
        backgrounds: { value: 'cyan' },
    },
};
