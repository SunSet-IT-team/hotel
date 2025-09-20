import { ISODate } from '@/shared/types/global.types';

export const toISODate = (d: Date | string): ISODate => {
    const date = typeof d === 'string' ? new Date(d) : d;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}` as ISODate; // локальная дата без времени
};

export const isISODate = (v: unknown): v is ISODate =>
    typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);
