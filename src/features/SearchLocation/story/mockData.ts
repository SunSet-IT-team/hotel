import { type Option as BaseOption } from '../model/types';

type Option = {
    description: string;
} & BaseOption;

export const mockData: Option[] = [
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
