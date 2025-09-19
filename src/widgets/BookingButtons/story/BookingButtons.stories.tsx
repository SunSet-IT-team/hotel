import type { Meta, StoryObj } from '@storybook/nextjs';

import { BookingButtons } from '../ui/BookingButtons';

import s from './BookingButtons.stories.module.scss';

const meta: Meta<typeof BookingButtons> = {
    title: 'Widgets/BookingButtons',
    component: BookingButtons,
    parameters: {
        layout: 'fullscreen', // чтобы фон секции был виден по всей ширине
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div className={s.storyWrapper}>
            <BookingButtons />
        </div>
    ),
};
