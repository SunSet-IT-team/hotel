import { type PartnerOffersProps } from '@/features/PartnerOffers';

export interface PartnerOffersWidgetProps {
    /** Массив предложений партнеров */
    offers: PartnerOffersProps[];
    /** Дополнительные CSS классы */
    className?: string;
}
