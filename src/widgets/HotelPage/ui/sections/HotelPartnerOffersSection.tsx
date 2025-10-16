import { type FC, memo } from 'react';

import { PartnerOffers } from '@/features/PartnerOffers';

import { type HotelPartnerOffersSectionProps } from './types';

import styles from '../HotelPage.module.scss';

/**
 * Секция предложений партнёров
 */
export const HotelPartnerOffersSection: FC<HotelPartnerOffersSectionProps> = memo(({ offers }) => {
    if (offers.length === 0) return null;

    return (
        <section className={styles.partnerOffersSection}>
            <div className={styles.offersGrid}>
                {offers.map((offer) => (
                    <PartnerOffers
                        key={offer.link}
                        title={offer.title}
                        amenities={offer.amenities}
                        price={offer.price}
                        starRating={offer.starRating}
                        image={offer.image}
                        link={offer.link}
                    />
                ))}
            </div>
        </section>
    );
});

HotelPartnerOffersSection.displayName = 'HotelPartnerOffersSection';
