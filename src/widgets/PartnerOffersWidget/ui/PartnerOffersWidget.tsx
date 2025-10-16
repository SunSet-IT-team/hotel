import { type FC } from 'react';
import clsx from 'clsx';
// Импортируем модули Swiper для пагинации
import { Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react'; // <- добавлено

import { PartnerOffers } from '@/features/PartnerOffers';
import { useIsMobile } from '@/shared/hooks/useMediaQuery';
import { Slider } from '@/shared/ui/Slider';

import { type PartnerOffersWidgetProps } from '../model/types';

import styles from './PartnerOffersWidget.module.scss';

export const PartnerOffersWidget: FC<PartnerOffersWidgetProps> = ({ offers, className }) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className={clsx(styles.root, styles.mobile, className)}>
                <Slider
                    slides={offers}
                    renderSlide={(offer, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.slide}>
                                <PartnerOffers {...offer} />
                            </div>
                        </SwiperSlide>
                    )}
                    slidesPerView={1}
                    spaceBetween={16}
                    loop={false}
                    modules={[Pagination]}
                    pagination={{ clickable: true, el: '#partner-offers-pagination' }}
                >
                    {/* Точки пагинации будут отображаться автоматически */}
                </Slider>
                <div id="partner-offers-pagination" className={styles.pagination} />
            </div>
        );
    }

    return (
        <div className={clsx(styles.root, styles.desktop, className)}>
            {offers.slice(0, 2).map((offer) => (
                <div key={offer.link} className={styles.offer}>
                    <PartnerOffers {...offer} />
                </div>
            ))}
        </div>
    );
};
