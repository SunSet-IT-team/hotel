import type { Meta, StoryObj } from '@storybook/nextjs';

import { type FetchData, type Option } from '../model/types';
import { SearchLocation } from '../ui/SearchLocation';

import { mockData } from './mockData';

const fetchData: FetchData<Option> = () =>
    new Promise((resolve) => setTimeout(() => resolve(mockData), 1000));

const meta = {
    title: 'UI/SearchLocation',
    component: SearchLocation,
    parameters: {
        layout: 'padded',
        controls: {
            sort: 'requiredFirst',
        },
    },
} satisfies Meta<typeof SearchLocation>;

export default meta;
type Story = StoryObj<typeof SearchLocation>;

export const Interactive: Story = {
    args: {},

    render: () => {
        return <SearchLocation fetchData={fetchData} />;
    },
};
