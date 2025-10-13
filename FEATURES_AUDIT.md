# Аудит Features - Hotel Project

## 📊 Общая статистика

**Всего features:** 16

### Категории features:

- 🎨 **UI Components** (7): Amenities, DateRange, GuestsField, ImageSlider, PricesSlider, ReviewsSlider, PartnerOffers
- 🔍 **Filters** (4): AmenitiesFilter, LocationFilter, PriceFilter, ReviewRatingFilter, StarRatingFilter
- 📍 **Search** (1): SearchLocation
- 🏨 **Hotel Info** (2): HotelInfo, HotelDescription
- 🎫 **Booking** (1): BookingButton

---

## 🎯 Детальный анализ каждой feature

### ✅ 1. Amenities - Отлично (9/10)

**Путь:** `src/features/Amenities/`

**Структура:**

```
Amenities/
├── index.ts          ✅
├── model/
│   └── types.ts      ✅
└── ui/
    ├── Amenities.tsx
    └── Amenities.module.scss
```

**Public API:**

```typescript
export type { AmenitiesProps, AmenityItem } from './model/types';
export { Amenities } from './ui/Amenities';
```

**Анализ:**

- ✅ Правильная структура FSD
- ✅ Public API корректен
- ✅ Типы хорошо документированы
- ✅ Логика показа "Все удобства" хорошо реализована
- ⚠️ Magic number: `slice(0, 5)` и `hasMoreAmenities = amenities.length > 6`

**Рекомендации:**

```typescript
// src/features/Amenities/model/constants.ts
export const AMENITIES_PREVIEW_COUNT = 5;
export const AMENITIES_SHOW_MORE_THRESHOLD = 6;

// В компоненте:
const previewAmenities = amenities.slice(0, AMENITIES_PREVIEW_COUNT);
const hasMoreAmenities = amenities.length > AMENITIES_SHOW_MORE_THRESHOLD;
```

**Оценка:** 9/10 ⭐⭐⭐⭐⭐

---

### ✅ 2. BookingButton - Хорошо (8/10)

**Путь:** `src/features/BookingButton/`

**Public API:**

```typescript
export type { BookingButtonProps } from './model/types';
export { BookingButton } from './ui/BookingButton';
```

**Анализ:**

- ✅ Правильная структура
- ✅ Public API корректен
- ✅ Типы документированы
- ⚠️ console.log в production коде
- ⚠️ Нет интеграции с API бронирования

**Проблемный код:**

```typescript
// src/features/BookingButton/ui/BookingButton.tsx
if (onBooking) {
    onBooking(hotelId);
} else {
    // Дефолтное поведение - переход на страницу бронирования
    console.log('Бронирование отеля:', hotelId); // ❌
    // TODO: Реализовать логику бронирования или редирект
}
```

**Рекомендации:**

```typescript
// ✅ Улучшенная версия
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config';

export const BookingButton: FC<BookingButtonProps> = ({ hotelId, onBooking }) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (onBooking) {
            onBooking(hotelId);
        } else {
            // Редирект на страницу бронирования
            router.push(ROUTES.BOOKING(hotelId));
        }
    };

    return (
        <Button variant="cyan" size="big" onClick={handleClick}>
            Забронировать
        </Button>
    );
};
```

**Оценка:** 8/10 ⭐⭐⭐⭐

---

### ✅ 3. DateRange - Отлично (9/10)

**Путь:** `src/features/DateRange/`

**Public API:**

```typescript
export { DateRange } from './ui/DateRange';
```

**Анализ:**

- ✅ Хорошая логика работы с датами
- ✅ Правильное использование Calendar из shared
- ✅ Поддержка ISO дат
- ⚠️ Нет экспорта типов в Public API
- ⚠️ Props определены inline, а не в model/types.ts

**Проблема:**

```typescript
// ❌ Типы inline в компоненте
interface Props {
    value: DateRangeType<ISODate>;
    onChange: (value: DateRangeType<ISODate>) => void;
    className?: string;
}
```

**Рекомендации:**

```typescript
// ✅ Создать model/types.ts
export interface DateRangeProps {
    /** Значение диапазона дат в ISO формате */
    value: DateRangeType<ISODate>;
    /** Callback при изменении диапазона */
    onChange: (value: DateRangeType<ISODate>) => void;
    /** Дополнительные CSS классы */
    className?: string;
}

// ✅ Обновить index.ts
export type { DateRangeProps } from './model/types';
export { DateRange } from './ui/DateRange';
```

**Оценка:** 9/10 ⭐⭐⭐⭐⭐

---

### ⚠️ 4. GuestsField - Требует доработки (7/10)

**Путь:** `src/features/GuestsField/`

**Public API:**

```typescript
export type { GuestsFieldValue } from './model/types';
export { GuestsField } from '@/features/GuestsField/ui/GuestsField'; // ⚠️ абсолютный путь
```

**Проблемы:**

1. **Абсолютный путь в index.ts:**

```typescript
// ❌ Неправильно
export { GuestsField } from '@/features/GuestsField/ui/GuestsField';

// ✅ Правильно
export { GuestsField } from './ui/GuestsField';
```

2. **Props inline вместо model/types.ts:**

```typescript
// ❌ В компоненте
interface Props {
    className?: string;
    value: GuestsFieldValue;
    onChange: (value: GuestsFieldValue) => void;
}
```

3. **Огромный текст-заглушка (строки 114-127):**

```typescript
// ❌ Повторяющийся текст
<Typography>
    Ваш возраст на момент поездки должен соответствовать категории
    забронированного билета. У авиакомпаний есть ограничения для пассажиров
    младше 18 лет, путешествующих без сопровождения. У авиакомпаний есть
    ограничения для пассажиров младше 18 лет, путешествующих без
    сопровождения. Ваш возраст на момент поездки... // и т.д.
</Typography>
```

4. **Жёстко заданные лимиты:**

```typescript
// ❌ Magic numbers
<Counter value={value.adults} min={1} max={10} />
<Counter value={value.children} min={0} max={10} />
```

**Рекомендации:**

```typescript
// ✅ src/features/GuestsField/model/types.ts
import type { GuestsCount } from '@/entities/booking';

export type GuestsFieldValue = GuestsCount;

export interface GuestsFieldProps {
    /** Дополнительные CSS классы */
    className?: string;
    /** Значение (количество взрослых и детей) */
    value: GuestsFieldValue;
    /** Callback при изменении */
    onChange: (value: GuestsFieldValue) => void;
}

// ✅ src/features/GuestsField/model/constants.ts
import { CONSTANTS } from '@/config';

export const GUESTS_LIMITS = {
    ADULTS_MIN: 1,
    ADULTS_MAX: CONSTANTS.MAX_ADULTS,
    CHILDREN_MIN: 0,
    CHILDREN_MAX: CONSTANTS.MAX_CHILDREN,
} as const;

export const GUESTS_INFO_TEXT =
    'Ваш возраст на момент поездки должен соответствовать категории ' +
    'забронированного билета. У авиакомпаний есть ограничения для ' +
    'пассажиров младше 18 лет, путешествующих без сопровождения.';

// ✅ В компоненте
import { GUESTS_LIMITS, GUESTS_INFO_TEXT } from '../model/constants';

<Counter
    value={value.adults}
    min={GUESTS_LIMITS.ADULTS_MIN}
    max={GUESTS_LIMITS.ADULTS_MAX}
/>
```

**Оценка:** 7/10 ⭐⭐⭐⭐

---

### ✅ 5. ImageSlider - Хорошо (8/10)

**Путь:** `src/features/ImageSlider/`

**Public API:**

```typescript
export { ImageSlider } from './ui/ImageSlider';
```

**Проблемы:**

- ⚠️ Нет экспорта типов
- ⚠️ Props inline
- ⚠️ Пустой alt для изображений (проблема a11y)

**Рекомендации:**

```typescript
// ✅ model/types.ts
export interface ImageSliderProps {
    /** Массив URL изображений */
    slides: string[];
    /** Дополнительные CSS классы */
    className?: string;
    /** Alt текст для изображений */
    alt?: string;
}

// ✅ В компоненте - добавить alt
<Image
    src={slide}
    alt={alt || `Фото отеля ${i + 1}`} // ✅ Accessibility
    priority={i === 0}
    fill
/>
```

**Оценка:** 8/10 ⭐⭐⭐⭐

---

### ⚠️ 6. HotelInfo - Хорошо, но сложная (7/10)

**Путь:** `src/features/HotelInfo/`

**Структура:**

```
HotelInfo/
├── index.ts
├── model/
│   └── types.ts
└── ui/
    ├── HotelInfo.tsx
    ├── HotelAmenities/      # Подкомпоненты
    ├── HotelHeader/
    ├── HotelLocation/
    └── HotelReviews/
```

**Анализ:**

- ✅ Хорошая декомпозиция на подкомпоненты
- ✅ Типы документированы
- ⚠️ Слишком много ответственности (название + звёзды + адрес + отзывы + удобства)
- ⚠️ Может быть это widget, а не feature?

**Вопрос архитектуры:**

```typescript
// 🤔 Это feature или widget?

// Вариант 1: HotelInfo - это feature (текущий подход)
// ✅ Если это только отображение информации об отеле
// ❌ Но тогда почему есть подкомпоненты HotelAmenities, HotelReviews?

// Вариант 2: HotelInfo - это widget (альтернатива)
// ✅ Композиция нескольких features
// ✅ Самодостаточный блок
```

**Рекомендация:**

Я считаю, что **HotelInfo должен остаться feature**, но:

1. Подкомпоненты HotelHeader, HotelLocation и т.д. - это внутренняя декомпозиция (правильно)
2. НО! Можно выделить отдельные features:
    - `HotelRating` - звёзды и рейтинг
    - `HotelAmenities` - удобства (уже есть feature Amenities!)

```typescript
// ✅ Упрощённый HotelInfo (композиция)
export const HotelInfo: FC<HotelInfoProps> = ({
    hotelName,
    starRating,
    address,
    rating,
    reviewCount,
    amenities,
}) => {
    return (
        <div>
            <HotelHeader name={hotelName} starRating={starRating} />
            {rating && <HotelRating rating={rating} reviewCount={reviewCount} />}
            <HotelLocation address={address} />
            {amenities && <Amenities amenities={amenities} />} {/* ← использовать существующую feature */}
        </div>
    );
};
```

**Оценка:** 7/10 ⭐⭐⭐⭐ (хорошая реализация, но можно улучшить архитектуру)

---

### ⚠️ 7. PriceFilter - Требует доработки (6/10)

**Путь:** `src/features/PriceFilter/`

**Public API:**

```typescript
export type {
    PriceFilterProps,
    PriceProp,
    RangeItem,
    SelectItem,
} from '@/features/PriceFilter/model/types';
export { PriceFilter } from '@/features/PriceFilter/ui/PriceFilter';
```

**Проблемы:**

1. **Абсолютные пути в index.ts:**

```typescript
// ❌ Неправильно
from '@/features/PriceFilter/model/types'

// ✅ Правильно
from './model/types'
```

2. **Типы слишком общие:**

```typescript
// ⚠️ SelectItem, RangeItem - очень общие названия
// Лучше: PriceSelectItem, PriceRangeItem
```

3. **Нет валидации диапазона:**

```typescript
// Что если min > max?
// Что если value выходит за пределы [min, max]?
```

**Рекомендации:**

```typescript
// ✅ model/types.ts с более специфичными названиями
export interface PriceRange {
    min: number;
    max: number;
    step?: number;
    value?: [number, number];
}

export interface PriceSelectOption {
    value: string;
    label: string;
}

export interface PriceRangePreset {
    value: string;
    label: string;
    minPrice?: number;
    maxPrice?: number;
}

// ✅ model/validation.ts
export const validatePriceRange = (range: PriceRange): boolean => {
    if (range.min >= range.max) {
        console.error('Min price must be less than max price');
        return false;
    }

    if (range.value) {
        const [min, max] = range.value;
        if (min < range.min || max > range.max) {
            console.error('Value is out of bounds');
            return false;
        }
    }

    return true;
};
```

**Оценка:** 6/10 ⭐⭐⭐

---

### ⚠️ 8. PricesSlider - Требует доработки (6/10)

**Путь:** `src/features/PricesSlider/`

**Проблемы:**

1. **Типы inline вместо model/types.ts:**

```typescript
// ❌ Типы в компоненте
interface PriceObj {
    price: number;
    website: string;
}
```

2. **Дублирование с entities/hotel:**

```typescript
// В entities/hotel/model/types.ts уже есть:
export interface HotelPrice {
    price: number;
    website: string;
}

// ❌ PricesSlider создаёт свой тип PriceObj
```

3. **Нет форматирования цены:**

```typescript
// ❌ Просто число
<Typography>{price}</Typography>

// ✅ Должно быть
<Typography>{formatPrice(price)} ₽</Typography>
```

**Рекомендации:**

```typescript
// ✅ model/types.ts
import type { HotelPrice } from '@/entities/hotel';

export interface PricesSliderProps {
    /** Массив цен от партнёров */
    prices: HotelPrice[];
    /** Валюта для отображения */
    currency?: string;
    /** Дополнительные CSS классы */
    className?: string;
}

// ✅ В компоненте
import { formatPrice } from '@/shared/lib/formatting';

<Typography className={styles.slide__price} color="dark">
    {formatPrice(price)} ₽
</Typography>
```

**Оценка:** 6/10 ⭐⭐⭐

---

### ⚠️ 9. ReviewsSlider - Требует доработки (5/10)

**Путь:** `src/features/ReviewsSlider/`

**Проблемы:**

1. **Примитивный тип Review:**

```typescript
// ❌ Отзыв = просто строка
type Review = string;
```

2. **Дублирование с entities/hotel:**

```typescript
// В entities/hotel/model/types.ts:
export interface HotelReview {
    authorName: string;
    rating: number;
    text: string;
    date: string;
}

// ❌ ReviewsSlider использует только строку
```

3. **Нет отображения автора, даты, рейтинга:**

```typescript
// ❌ Показывается только текст
<Typography>{review}</Typography>
```

**Рекомендации:**

```typescript
// ✅ model/types.ts
import type { HotelReview } from '@/entities/hotel';

export interface ReviewsSliderProps {
    /** Массив отзывов */
    reviews: HotelReview[];
    /** Количество отзывов на слайд */
    slidesPerView?: number;
    /** Дополнительные CSS классы */
    className?: string;
}

// ✅ В компоненте
renderSlide={(review) => (
    <SwiperSlide className={styles.slide} key={review.date}>
        <div className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
                <Typography variant="h3" color="blue">
                    {review.authorName}
                </Typography>
                <StarRating rating={review.rating} />
            </div>
            <Typography variant="body" color="dark">
                {review.text}
            </Typography>
            <Typography variant="caption" color="gray">
                {formatDate(review.date)}
            </Typography>
        </div>
    </SwiperSlide>
)}
```

**Оценка:** 5/10 ⭐⭐⭐ (работает, но очень упрощённо)

---

### ✅ 10. SearchLocation - Отлично (9/10)

**Путь:** `src/features/SearchLocation/`

**Public API:**

```typescript
export type { FetchData, Option } from '@/features/SearchLocation/model/types';
export { mockData as fetchMockData } from '@/features/SearchLocation/story/mockData';
export { SearchLocation } from '@/features/SearchLocation/ui/SearchLocation';
```

**Анализ:**

- ✅ Хорошая архитектура с generic типами
- ✅ Абстракция FetchData для API
- ✅ Правильная работа с debounce
- ⚠️ Абсолютные пути в index.ts
- ⚠️ Option слишком общее название

**Рекомендации:**

```typescript
// ✅ Переименовать Option → LocationOption
export interface LocationOption {
    id: number;
    name: string;
    city: string;
}

export type FetchData<T extends LocationOption> = (query: string) => Promise<T[]>;

// ✅ index.ts с относительными путями
export type { FetchData, LocationOption } from './model/types';
export { mockData as fetchMockData } from './story/mockData';
export { SearchLocation } from './ui/SearchLocation';
```

**Оценка:** 9/10 ⭐⭐⭐⭐⭐

---

## 📋 Общие проблемы и паттерны

### 🔴 Критические проблемы

1. **Абсолютные пути в index.ts** (4 features)
    - GuestsField
    - PriceFilter
    - SearchLocation (частично)

    ```typescript
    // ❌ Плохо
    export { Component } from '@/features/MyFeature/ui/Component';

    // ✅ Хорошо
    export { Component } from './ui/Component';
    ```

2. **Props inline вместо model/types.ts** (5 features)
    - DateRange
    - GuestsField
    - ImageSlider
    - PricesSlider
    - ReviewsSlider

3. **Дублирование типов с entities** (2 features)
    - PricesSlider дублирует HotelPrice
    - ReviewsSlider упрощает HotelReview

### 🟡 Важные улучшения

4. **Magic numbers и константы** (3 features)
    - Amenities: `slice(0, 5)`, `> 6`
    - GuestsField: `min={1}`, `max={10}`
5. **Отсутствие типов в Public API** (4 features)
    - DateRange
    - ImageSlider
    - PricesSlider
    - ReviewsSlider

6. **Accessibility проблемы** (2 features)
    - ImageSlider: пустой alt
    - ReviewsSlider: нет aria-labels

### 🟢 Хорошие практики (найдены в коде)

✅ **Amenities** - хорошая декомпозиция с popup
✅ **SearchLocation** - generic типы и абстракция API
✅ **DateRange** - правильная работа с ISO датами
✅ **HotelInfo** - декомпозиция на подкомпоненты

---

## 📊 Рейтинг Features

### Отличные (9-10/10):

1. **Amenities** - 9/10 ⭐⭐⭐⭐⭐
2. **DateRange** - 9/10 ⭐⭐⭐⭐⭐
3. **SearchLocation** - 9/10 ⭐⭐⭐⭐⭐

### Хорошие (7-8/10):

4. **BookingButton** - 8/10 ⭐⭐⭐⭐
5. **ImageSlider** - 8/10 ⭐⭐⭐⭐
6. **GuestsField** - 7/10 ⭐⭐⭐⭐
7. **HotelInfo** - 7/10 ⭐⭐⭐⭐

### Требуют доработки (5-6/10):

8. **PriceFilter** - 6/10 ⭐⭐⭐
9. **PricesSlider** - 6/10 ⭐⭐⭐
10. **ReviewsSlider** - 5/10 ⭐⭐⭐

---

## 🎯 План улучшений

### Приоритет 1: Критические исправления

```bash
# 1. Исправить абсолютные пути в Public API
- [ ] GuestsField/index.ts
- [ ] PriceFilter/index.ts
- [ ] SearchLocation/index.ts

# 2. Создать model/types.ts для всех features
- [ ] DateRange
- [ ] ImageSlider
- [ ] PricesSlider
- [ ] ReviewsSlider

# 3. Убрать дублирование типов
- [ ] PricesSlider → использовать HotelPrice из entities
- [ ] ReviewsSlider → использовать HotelReview из entities
```

### Приоритет 2: Важные улучшения

```bash
# 4. Вынести константы
- [ ] Amenities/model/constants.ts
- [ ] GuestsField/model/constants.ts

# 5. Добавить форматирование
- [ ] PricesSlider → formatPrice
- [ ] ReviewsSlider → formatDate

# 6. Улучшить accessibility
- [ ] ImageSlider → добавить alt
- [ ] ReviewsSlider → aria-labels
```

### Приоритет 3: Рефакторинг

```bash
# 7. Улучшить ReviewsSlider
- [ ] Показывать автора, дату, рейтинг
- [ ] Использовать полный тип HotelReview

# 8. Оптимизировать HotelInfo
- [ ] Переиспользовать feature Amenities
- [ ] Упростить композицию

# 9. Добавить валидацию
- [ ] PriceFilter → validatePriceRange
```

---

## 📝 Шаблон для новых features

```
my-feature/
├── index.ts                    # Public API (только относительные пути!)
├── model/
│   ├── types.ts               # Все типы и интерфейсы
│   ├── constants.ts           # Константы (если нужны)
│   └── hooks.ts               # Кастомные хуки (если нужны)
├── ui/
│   ├── MyFeature.tsx          # Главный компонент
│   ├── MyFeature.module.scss  # Стили
│   └── components/            # Внутренние подкомпоненты (опционально)
└── lib/                       # Утилиты feature (опционально)
    └── helpers.ts
```

**index.ts шаблон:**

```typescript
// ✅ Правильный Public API
export type { MyFeatureProps, MyFeatureData } from './model/types';
export { MyFeature } from './ui/MyFeature';
export { useMyFeature } from './model/hooks';
```

---

## 🎓 Чеклист для проверки feature

- [ ] Public API использует **относительные** пути
- [ ] Все типы в `model/types.ts`, **не inline**
- [ ] Константы вынесены в `model/constants.ts`
- [ ] Типы **не дублируют** entities
- [ ] Компонент имеет **JSDoc** комментарии
- [ ] Props имеют **описания** полей
- [ ] Нет **magic numbers** в коде
- [ ] Нет **console.log** в production
- [ ] Accessibility: alt, aria-labels
- [ ] Форматирование дат/цен через shared/lib

---

## 📊 Итоговая статистика

**Средняя оценка:** 7.4/10 ⭐⭐⭐⭐

**Распределение:**

- 🟢 Отлично (9-10): 3 features (19%)
- 🟡 Хорошо (7-8): 4 features (25%)
- 🟠 Требует доработки (5-6): 3 features (19%)
- ⚪ Не проверены: 6 features (37%)

**Основные проблемы:**

1. Абсолютные пути в index.ts - 4 случая
2. Props inline - 5 случаев
3. Дублирование типов - 2 случая
4. Magic numbers - 3 случая
5. Нет типов в Public API - 4 случая

**Сильные стороны:**

1. ✅ Хорошая структура FSD
2. ✅ Декомпозиция компонентов
3. ✅ Использование shared/ui
4. ✅ TypeScript везде

---

## 🚀 Рекомендации на будущее

### 1. Code Review чеклист

Перед созданием PR проверяйте:

- Относительные пути в index.ts
- Типы в model/types.ts
- Константы вынесены
- JSDoc комментарии

### 2. Автоматизация

```bash
# ESLint правило для проверки путей в index.ts
# Запретить абсолютные импорты в Public API
```

### 3. Документация

Создать CONTRIBUTING.md с правилами для features

---

**Общий вывод:** Ваши features в целом хорошо организованы и следуют FSD, но есть повторяющиеся проблемы, которые легко исправить. Основное - привести к единому стилю и убрать дублирование.
