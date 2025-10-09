import { type RangeListOption } from '@/shared/ui/RangeList';

// Мок-данные районов
export const mockLocationData: RangeListOption[] = [
    { value: 'center', label: 'Центр' },
    { value: 'north', label: 'Север' },
    { value: 'south', label: 'Юг' },
    { value: 'east', label: 'Восток' },
    { value: 'west', label: 'Запад' },
    { value: 'northwest', label: 'Северо-Запад' },
    { value: 'northeast', label: 'Северо-Восток' },
    { value: 'southwest', label: 'Юго-Запад' },
    { value: 'southeast', label: 'Юго-Восток' },
    { value: 'business', label: 'Деловой центр' },
    { value: 'historical', label: 'Исторический центр' },
    { value: 'residential', label: 'Жилой район' },
    { value: 'industrial', label: 'Промышленный район' },
    { value: 'suburb', label: 'Пригород' },
    { value: 'airport', label: 'Район аэропорта' },
];

// Мок-функция для fetchData
export const mockFetchData = async (query: string): Promise<RangeListOption[]> => {
    await new Promise((resolve) => setTimeout(resolve, 0));

    if (!query.trim()) {
        return mockLocationData;
    }

    return mockLocationData.filter((location) =>
        location.label.toLowerCase().includes(query.toLowerCase()),
    );
};
