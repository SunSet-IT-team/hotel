import { type ISODate } from '@/shared/types/global.types';

export interface DateRange<DateType extends Date | ISODate = Date> {
    startDate: DateType | null;
    endDate: DateType | null;
}
export type Language = 'ru' | 'en';
