import type { RootState } from '@/app/store';
import { type ISODate } from '@/shared/types/global.types';

export const selectSearchForm = (s: RootState) => s.searchForm;
export const selectValues = (s: RootState) => s.searchForm.values;
export const selectSubmitting = (s: RootState) => s.searchForm.isSubmitting;

const ts = (d: ISODate) => new Date(d).getTime();

export const selectNights = (s: RootState) => {
    const { dateRange } = s.searchForm.values;
    if (!dateRange?.startDate || !dateRange?.endDate) return 0;

    if (dateRange.endDate < dateRange.startDate) return 0;

    return Math.max(0, Math.round((ts(dateRange.endDate) - ts(dateRange.startDate)) / 86_400_000));
};

export const selectIsValid = (s: RootState) => {
    const { destination, dateRange, peoplesCount } = s.searchForm.values;
    const nights = selectNights(s);
    const adults = peoplesCount?.adults ?? 0;

    return (
        !!destination && !!dateRange?.startDate && !!dateRange?.endDate && adults >= 1 && nights > 0
    );
};
