import { ISODate } from '@/shared/types/global.types';

export type DateRange<DateType extends Date | ISODate = Date> = {
    startDate: DateType | null;
    endDate: DateType | null;
};
export type Language = 'ru' | 'en';
