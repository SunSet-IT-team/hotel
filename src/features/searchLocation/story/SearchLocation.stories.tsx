import type { Meta, StoryObj } from '@storybook/nextjs';

import { FetchData, Option as BaseOption } from '../model/types';
import { SearchLocation } from '../ui/SearchLocation';

type Option = {
    description: string;
} & BaseOption;

const mockData: Option[] = [
    {
        city: 'Венесуэлла',
        name: 'Город',
        id: 0,
        description: 'Крутой город!',
    },
    {
        city: 'Венесуэлла',
        name: 'Город',
        id: 1,
        description: 'Крутой город!',
    },
    {
        city: 'Венесуэлла',
        name: 'Город',
        id: 2,
        description: 'Крутой город!',
    },
];

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
