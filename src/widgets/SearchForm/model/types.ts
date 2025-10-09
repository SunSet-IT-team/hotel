import { type Option as SearchLocationOption } from '@/features/SearchLocation';
import { type ISODate } from '@/shared/types/global.types';

// Разрешаем только город или страну
export type Destination = Record<string, unknown> & SearchLocationOption;

// Храним в стейте дату только в ISO серелизуемом формате
export interface DateRange {
    startDate: RangeDate;
    endDate: RangeDate;
}

type RangeDate = ISODate | null;

// Данные формы поиска (согласованы со стейтом и UI-компонентами)
export interface FormData {
    query: string;
    destination: Destination | null;
    dateRange: DateRange;
    peoplesCount: {
        adults: number;
        children: number;
    };
}
