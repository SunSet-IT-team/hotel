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
