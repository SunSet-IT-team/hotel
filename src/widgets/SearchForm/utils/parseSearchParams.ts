export interface ParsedFormFromURL {
    query?: string;
    destination?: { id: number; name: string; city?: string } | null;
    dateRange?: { startDate: string | null; endDate: string | null } | null;
    peoplesCount?: { adults: number; children: number } | null;
}

export const parseSearchParamsToFormData = (sp: URLSearchParams): ParsedFormFromURL => {
    const get = (k: string) => sp.get(k) ?? undefined;

    const query = get('query');

    const name = get('destination');
    const id = get('destinationId');
    const city = get('city');
    const destination =
        name && id ? { id: Number(id), name, city } : name ? { id: 0, name, city } : null;

    const checkIn = get('checkIn') ?? null;
    const checkOut = get('checkOut') ?? null;

    const adults = get('adults');
    const children = get('children');
    const peoplesCount =
        adults || children
            ? { adults: Number(adults ?? 1), children: Number(children ?? 0) }
            : null;

    return {
        query,
        destination,
        dateRange: checkIn || checkOut ? { startDate: checkIn, endDate: checkOut } : null,
        peoplesCount,
    };
};
