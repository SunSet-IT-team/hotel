import type { Meta, StoryObj } from '@storybook/nextjs';

import { mockData } from './mockData';

import { FetchData, Option } from '../model/types';
import { SearchLocation } from '../ui/SearchLocation';

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
