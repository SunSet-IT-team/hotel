import { type Hotel } from './types';

/**
 * Моковые данные для отелей
 */
export const mockHotels: Hotel[] = [
    {
        id: '1',
        name: 'Гранд Отель Европа',
        starRating: 5,
        address: 'Невский проспект, 1/7, Санкт-Петербург',
        rating: 9.2,
        reviewCount: 1245,
        amenities: ['WiFi', 'Бассейн', 'Спа', 'Ресторан'],
        images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop',
        ],
        prices: [
            { price: 2.341, website: 'part1.com' },
            { price: 2.341, website: 'part2.ru' },
            { price: 2.341, website: 'Hotels.com' },
            { price: 2.341, website: 'Expedia' },
        ],
        description:
            'Роскошный пятизвездочный отель в самом центре Санкт-Петербурга с видом на Невский проспект',
        distanceFromCenter: 0.5,
        reviews: [
            {
                authorName: 'Анна С.',
                rating: 9,
                text: 'Великолепный отель! Прекрасное расположение, отличный сервис и красивые номера. Обязательно вернусь снова.',
                date: '2024-12-15',
            },
            {
                authorName: 'Михаил П.',
                rating: 8,
                text: 'Хороший отель с отличным завтраком. Персонал очень вежливый и отзывчивый. Рекомендую для деловых поездок.',
                date: '2024-12-10',
            },
            {
                authorName: 'Елена К.',
                rating: 10,
                text: 'Потрясающий отель! Невероятный вид из окна, роскошный интерьер и безупречный сервис. Лучший отель в Питере!',
                date: '2024-12-05',
            },
        ],
    },
    {
        id: '2',
        name: 'Отель Астория',
        starRating: 5,
        address: 'Большая Морская ул., 39, Санкт-Петербург',
        rating: 8.9,
        reviewCount: 987,
        amenities: ['WiFi', 'Фитнес-центр', 'Бар'],
        images: [
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop',
        ],
        prices: [
            { price: 11000, website: 'Booking.com' },
            { price: 11200, website: 'Ostrovok.ru' },
            { price: 10900, website: 'Hotels.com' },
        ],
        description:
            'Исторический отель с великолепным видом на Исаакиевский собор и превосходным сервисом',
        distanceFromCenter: 0.8,
        reviews: [
            {
                authorName: 'Сергей М.',
                rating: 9,
                text: 'Потрясающий исторический отель! Атмосфера старого Санкт-Петербурга, отличное расположение рядом с метро.',
                date: '2024-12-12',
            },
            {
                authorName: 'Ольга В.',
                rating: 8,
                text: 'Красивый отель с богатой историей. Номера чистые и уютные, персонал профессиональный.',
                date: '2024-12-08',
            },
        ],
    },
    {
        id: '3',
        name: 'Кортъярд Марриотт',
        starRating: 4,
        address: 'Невский проспект, 57, Санкт-Петербург',
        rating: 8.5,
        reviewCount: 756,
        amenities: ['WiFi', 'Парковка', 'Бизнес-центр'],
        images: [
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop',
        ],
        prices: [
            { price: 7500, website: 'Booking.com' },
            { price: 7700, website: 'Ostrovok.ru' },
            { price: 7600, website: 'Hotels.com' },
            { price: 7800, website: 'Expedia' },
        ],
        description:
            'Современный отель международной сети с комфортабельными номерами и отличным расположением',
        distanceFromCenter: 1.2,
        reviews: [
            {
                authorName: 'Дмитрий Л.',
                rating: 8,
                text: 'Хороший бизнес-отель. Чистые номера, удобное расположение. Завтрак разнообразный.',
                date: '2024-12-14',
            },
            {
                authorName: 'Мария Ф.',
                rating: 7,
                text: 'Неплохой отель для командировки. Удобно добираться до основных достопримечательностей.',
                date: '2024-12-09',
            },
        ],
    },
    {
        id: '4',
        name: 'Парк Инн Пулковская',
        starRating: 4,
        address: 'пл. Победы, 1, Санкт-Петербург',
        rating: 8.0,
        reviewCount: 654,
        amenities: ['WiFi', 'Ресторан', 'Конференц-залы'],
        images: [
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
        ],
        prices: [
            { price: 5500, website: 'Booking.com' },
            { price: 5600, website: 'Ostrovok.ru' },
            { price: 5700, website: 'Hotels.com' },
        ],
        description: 'Уютный отель рядом с метро и основными достопримечательностями города',
        distanceFromCenter: 3.5,
        reviews: [
            {
                authorName: 'Алексей Р.',
                rating: 7,
                text: 'Достойный отель за свои деньги. Удобное расположение рядом с метро, чистые номера.',
                date: '2024-12-11',
            },
        ],
    },
    {
        id: '5',
        name: 'Холидей Инн Московские Ворота',
        starRating: 4,
        address: 'Московский пр., 97А, Санкт-Петербург',
        rating: 7.8,
        reviewCount: 432,
        amenities: ['WiFi', 'Парковка', 'Завтрак включен'],
        images: [
            'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
        ],
        prices: [
            { price: 4500, website: 'Booking.com' },
            { price: 4600, website: 'Ostrovok.ru' },
        ],
        description: 'Комфортабельный отель с хорошим соотношением цены и качества',
        distanceFromCenter: 4.0,
        reviews: [
            {
                authorName: 'Виктор Н.',
                rating: 8,
                text: 'Отличное соотношение цены и качества. Вежливый персонал, чистота в номерах.',
                date: '2024-12-13',
            },
        ],
    },
    {
        id: '6',
        name: 'Мини-отель Невский 98',
        starRating: 3,
        address: 'Невский проспект, 98, Санкт-Петербург',
        rating: 7.5,
        reviewCount: 298,
        amenities: ['WiFi', 'Кухня'],
        images: [
            'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
        ],
        prices: [
            { price: 3200, website: 'Booking.com' },
            { price: 3300, website: 'Ostrovok.ru' },
            { price: 3400, website: 'Hotels.com' },
        ],
        description: 'Небольшой уютный отель в центре города с домашней атмосферой',
        distanceFromCenter: 1.5,
        reviews: [
            {
                authorName: 'Татьяна З.',
                rating: 8,
                text: 'Милый маленький отель с домашней атмосферой. Чисто, уютно, хорошее расположение.',
                date: '2024-12-07',
            },
            {
                authorName: 'Игорь С.',
                rating: 7,
                text: 'Для небольшой гостиницы очень неплохо. Доброжелательный персонал и чистые номера.',
                date: '2024-12-03',
            },
        ],
    },
];
