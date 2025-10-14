import { type PartnerOffersProps } from '@/features/PartnerOffers';

// Альтернативные URL изображений отелей
const hotelImages = [
    'https://avatars.mds.yandex.net/i?id=0578ef21f023e6915addf168fa9fb8ee_l-5440427-images-thumbs&n=13',
    'https://avatars.mds.yandex.net/i?id=0578ef21f023e6915addf168fa9fb8ee_l-5440427-images-thumbs&n=13',
    'https://avatars.mds.yandex.net/i?id=0578ef21f023e6915addf168fa9fb8ee_l-5440427-images-thumbs&n=13',
];

export const mockPartnerOffers: PartnerOffersProps[] = [
    {
        title: 'Стандартный номер от part1.com',
        amenities: ['Включен завтрак'],
        price: 2341,
        starRating: 3,
        image: hotelImages[0],
        link: '#',
    },
    {
        title: 'Стандартный номер от vk.com',
        amenities: ['Включен завтрак'],
        price: 2741,
        starRating: 3,
        image: hotelImages[1],
        link: '#',
    },
    {
        title: 'Стандартный номер от ok.com',
        amenities: ['Включен завтрак'],
        price: 2141,
        starRating: 3,
        image: hotelImages[2],
        link: '#',
    },
];
