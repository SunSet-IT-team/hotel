import { type Language } from '@/shared/ui/Calendar/model/types';

export interface FaqItemTranslation {
    id: string;
    question: string;
    answer: string | string[];
}

export interface Translations {
    // Header
    header: {
        langMenu: string;
    };

    // Hotel Page
    hotel: {
        amenities: string;
        amenitiesAll: string;
        amenitiesMore: string;
        description: string;
        importantInfo: string;
        rules: string;
        booking: string;
    };

    // Hotels Page
    hotels: {
        closeExtendedSearch: string;
    };

    // Search Form
    search: {
        title: string;
        search: string;
        searching: string;
        expandSearch: string;
        placeholder: string;
        summaryAdults: string;
        summaryChildren: string;
    };

    // Date Range
    dateRange: {
        checkIn: string;
        checkOut: string;
    };

    // Guests Field
    guests: {
        label: string;
        adults: string;
        adultsDescription: string;
        children: string;
        childrenDescription: string;
        adultsShort: string;
        childrenShort: string;
        infoText: string;
    };

    // Filters
    filters: {
        price: string;
        pricePerNightWithoutTaxes: string;
        pricePerNightWithTaxes: string;
        totalWithTaxes: string;
        starRating: string;
        reviewRating: string;
        amenitiesAndServices: string;
        location: string;
        locationPlaceholder: string;
        searchResults: string;
        noResults: string;
        pool: string;
        wifi: string;
        breakfast: string;
    };

    // Booking Buttons
    booking: {
        cars: string;
        flights: string;
        tours: string;
        esim: string;
    };

    // Footer
    footer: {
        title: string;
        cookiePolicy: string;
        privacyPolicy: string;
        contacts: string;
    };

    // FAQ
    faq: {
        title: string;
        items: FaqItemTranslation[];
    };

    // Common
    common: {
        more: string;
        apply: string;
    };

    // Hotel Card
    hotelCard: {
        prices: string;
        reviews: string;
        review: string;
        reviewCount: string;
        reviewCountPlural: string;
        reviewExcellent: string;
        reviewGood: string;
        reviewBad: string;
        viewOnMap: string;
        onMap: string;
    };

    // Partner Offers
    partnerOffers: {
        price: string;
        booking: string;
    };
}

export const translations: Record<Language, Translations> = {
    ru: {
        header: {
            langMenu: 'RU/EN',
        },
        hotel: {
            amenities: 'Удобства',
            amenitiesAll: 'Все удобства',
            amenitiesMore: 'еще',
            description: 'Описание объекта размещения',
            importantInfo: 'Важная информация',
            rules: 'Правила объекта размещения',
            booking: 'Забронировать',
        },
        search: {
            title: 'Открой мир и путешествуй легко',
            search: 'Поиск',
            searching: 'Поиск...',
            expandSearch: 'Развернуть поиск',
            placeholder: 'Город и отель',
            summaryAdults: 'взросл.',
            summaryChildren: 'реб.',
        },
        dateRange: {
            checkIn: 'Дата заезда',
            checkOut: 'Дата выезда',
        },
        guests: {
            label: 'Кол-во гостей',
            adults: 'Взрослые',
            adultsDescription: '18 лет и старше',
            children: 'Дети',
            childrenDescription: 'от 0 до 17 лет',
            adultsShort: 'взрос.',
            childrenShort: 'реб.',
            infoText:
                'Ваш возраст на момент поездки должен соответствовать категории забронированного билета. У авиакомпаний есть ограничения для пассажиров младше 18 лет, путешествующих без сопровождения.',
        },
        hotels: {
            closeExtendedSearch: 'Закрыть расширенный поиск',
        },
        filters: {
            price: 'Цена',
            pricePerNightWithoutTaxes: 'Цена за номер/ночь (без налогов и сборов)',
            pricePerNightWithTaxes: 'Цена за номер/ночь (вкл. налоги и сборы)',
            totalWithTaxes: 'Итого (в т.ч. налоги и сборы)',
            starRating: 'Количество звезд',
            reviewRating: 'Рейтинг по отзывам',
            amenitiesAndServices: 'Удобства и услуги',
            location: 'Расположение',
            locationPlaceholder: 'район/локация',
            searchResults: 'Результаты поиска',
            noResults: 'Ничего не нашлось',
            pool: 'Наличие бассейна',
            wifi: 'Наличие wi-fi',
            breakfast: 'Наличие завтраков',
        },
        booking: {
            cars: 'Бронирование автомобилей',
            flights: 'Бронирование авиарейсов',
            tours: 'Бронирование туров',
            esim: 'Бронирование e-sim',
        },
        footer: {
            title: 'Присоединяйся к тысячам путешественников',
            cookiePolicy: 'Политика использования файлов cookie',
            privacyPolicy: 'Политика конфиденциальности',
            contacts: 'Наши контакты',
        },
        faq: {
            title: 'Ответы на часто задаваемые вопросы',
            items: [
                {
                    id: 'q1',
                    question: 'Как устроен наш сайт?',
                    answer: 'Заглушка: краткое описание работы сервиса. Здесь позже появится подробный ответ.',
                },
                {
                    id: 'q2',
                    question: 'Можно ли забронировать отель?',
                    answer: 'Заглушка: да, но детали и ограничения будут добавлены позже ответственным редактором.',
                },
                {
                    id: 'q3',
                    question: 'Как найти самый дешевый авиабилет?',
                    answer: [
                        'Искать авиабилеты на нашем сайте очень просто. Каждый месяц более 100 миллионов опытных путешественников заходят на наш сайт и в приложение, чтобы найти дешевые авиабилеты, отели и прокат автомобилей. Рассказываем, как получить максимальную пользу от нашего сервиса.',
                        'У нас очень просто найти самый быстрый перелет, рейс любимой авиакомпании или идеальный номер. Читайте отзывы настоящих путешественников, выбирайте агентства и отели с высоким рейтингом, бронируйте без комиссий.',
                    ],
                },
                {
                    id: 'q4',
                    question: 'Что значат звезды у отеля?',
                    answer: 'Заглушка: это условная классификация удобств. Точная расшифровка будет позже.',
                },
                {
                    id: 'q5',
                    question: 'Куда сейчас стоит поехать?',
                    answer: 'Заглушка: подборка направлений готовится редакцией. Информация обновится в ближайшее время.',
                },
                {
                    id: 'q6',
                    question: 'Как найти хороший отель?',
                    answer: 'Заглушка: обращайте внимание на рейтинг и отзывы. Подробности появятся позже.',
                },
            ],
        },
        common: {
            more: 'еще',
            apply: 'Применить',
        },
        hotelCard: {
            prices: 'Цены',
            reviews: 'Отзывы',
            review: 'Отзыв',
            reviewCount: 'отзыва',
            reviewCountPlural: 'отзывов',
            reviewExcellent: 'Отлично',
            reviewGood: 'Хорошо',
            reviewBad: 'Плохо',
            viewOnMap: 'Посмотреть на карте',
            onMap: 'На карте',
        },
        partnerOffers: {
            price: 'Цена:',
            booking: 'Забронировать',
        },
    },
    en: {
        header: {
            langMenu: 'RU/EN',
        },
        hotel: {
            amenities: 'Amenities',
            amenitiesAll: 'All Amenities',
            amenitiesMore: 'more',
            description: 'Accommodation Description',
            importantInfo: 'Important Information',
            rules: 'Accommodation Rules',
            booking: 'Book Now',
        },
        search: {
            title: 'Discover the world and travel easily',
            search: 'Search',
            searching: 'Searching...',
            expandSearch: 'Expand search',
            placeholder: 'City and hotel',
            summaryAdults: 'adults',
            summaryChildren: 'children',
        },
        dateRange: {
            checkIn: 'Check-in date',
            checkOut: 'Check-out date',
        },
        guests: {
            label: 'Number of guests',
            adults: 'Adults',
            adultsDescription: '18 years and older',
            children: 'Children',
            childrenDescription: 'from 0 to 17 years',
            adultsShort: 'adults',
            childrenShort: 'children',
            infoText:
                'Your age at the time of travel must match the category of the booked ticket. Airlines have restrictions for passengers under 18 years of age traveling alone.',
        },
        hotels: {
            closeExtendedSearch: 'Close extended search',
        },
        filters: {
            price: 'Price',
            pricePerNightWithoutTaxes: 'Price per room/night (excluding taxes and fees)',
            pricePerNightWithTaxes: 'Price per room/night (including taxes and fees)',
            totalWithTaxes: 'Total (including taxes and fees)',
            starRating: 'Star rating',
            reviewRating: 'Review rating',
            amenitiesAndServices: 'Amenities and services',
            location: 'Location',
            locationPlaceholder: 'area/location',
            searchResults: 'Search results',
            noResults: 'Nothing found',
            pool: 'Swimming pool',
            wifi: 'Wi-Fi',
            breakfast: 'Breakfast',
        },
        booking: {
            cars: 'Car Rental',
            flights: 'Flight Booking',
            tours: 'Tour Booking',
            esim: 'E-SIM Booking',
        },
        footer: {
            title: 'Join thousands of travelers',
            cookiePolicy: 'Cookie Policy',
            privacyPolicy: 'Privacy Policy',
            contacts: 'Contact Us',
        },
        faq: {
            title: 'Frequently Asked Questions',
            items: [
                {
                    id: 'q1',
                    question: 'How does our website work?',
                    answer: 'Placeholder: brief description of the service. A detailed answer will appear here later.',
                },
                {
                    id: 'q2',
                    question: 'Can I book a hotel?',
                    answer: 'Placeholder: yes, but details and limitations will be added later by the responsible editor.',
                },
                {
                    id: 'q3',
                    question: 'How to find the cheapest flight?',
                    answer: [
                        'Finding flights on our website is very easy. Every month, more than 100 million experienced travelers visit our website and app to find cheap flights, hotels, and car rentals. We tell you how to get the most out of our service.',
                        'It is very easy to find the fastest flight, a flight with your favorite airline, or the perfect room. Read reviews from real travelers, choose agencies and hotels with high ratings, book without commissions.',
                    ],
                },
                {
                    id: 'q4',
                    question: 'What do the stars mean for a hotel?',
                    answer: 'Placeholder: this is a conditional classification of amenities. A detailed explanation will follow later.',
                },
                {
                    id: 'q5',
                    question: 'Where should I go now?',
                    answer: 'Placeholder: a selection of destinations is being prepared by the editorial team. Information will be updated soon.',
                },
                {
                    id: 'q6',
                    question: 'How to find a good hotel?',
                    answer: 'Placeholder: pay attention to ratings and reviews. Details will appear later.',
                },
            ],
        },
        hotelCard: {
            prices: 'Prices',
            reviews: 'Reviews',
            review: 'Review',
            reviewCount: 'review',
            reviewCountPlural: 'reviews',
            reviewExcellent: 'Excellent',
            reviewGood: 'Good',
            reviewBad: 'Bad',
            viewOnMap: 'View on map',
            onMap: 'On map',
        },
        partnerOffers: {
            price: 'Price:',
            booking: 'Book Now',
        },
        common: {
            more: 'more',
            apply: 'Apply',
        },
    },
};
