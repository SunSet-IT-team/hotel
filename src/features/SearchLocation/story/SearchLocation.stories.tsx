import type { Meta, StoryObj } from '@storybook/nextjs';

import { fetchMockData1 } from '@/shared/mocks/searchLocation';

import { type FetchData, type Option } from '../model/types';
import { SearchLocation } from '../ui/SearchLocation';

import { mockData } from './mockData';

const _fetchData: FetchData<Option> = () =>
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
        return (
            <SearchLocation
                value={''}
                onChange={(_v) => {}}
                onSelect={(_v) => {}}
                placeholder="Город или отель"
                fetchData={fetchMockData1}
            />
        );
    },
};
