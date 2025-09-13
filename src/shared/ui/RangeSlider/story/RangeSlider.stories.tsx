import type { Meta, StoryObj } from '@storybook/nextjs';
import { useArgs } from 'storybook/preview-api';

import { RangeSlider } from '../ui/RangeSlider';
import defaultOptions from '../config';
import { WidthContainer } from '../../../../../.storybook/decorators/WidthContainer/WidthContainer';

const meta = {
    title: 'UI/RangeSlider',
    component: RangeSlider,
    parameters: {
        layout: 'fullscreen',
        controls: {
            sort: 'requiredFirst',
        },
    },
    decorators: [WidthContainer],
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
    args: {
        fullWidth: false,
        min: 0,
        max: 100,
        step: 1,
        value: [0, 100],
        variant: 'circleThumbs',
        options: {
            thumbs: defaultOptions.thumbs,
        },
    },

    render: (args) => {
        const [_, updateArgs] = useArgs();

        const onChange = (newVal: typeof args.value) => {
            updateArgs({
                ...args,
                value: newVal,
            });
        };

        return <RangeSlider {...args} onChange={onChange} />;
    },
};
