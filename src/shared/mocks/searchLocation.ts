export interface SearchLocationOption {
    id: number;
    name: string;
    city: string;
    [key: string]: unknown;
}

export const fetchMockData1 = (): Promise<SearchLocationOption[]> => {
    return Promise.resolve([
        { id: 1, name: 'Москва', city: 'Россия' },
        { id: 2, name: 'Санкт-Петербург', city: 'Россия' },
    ]);
};
