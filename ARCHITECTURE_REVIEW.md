# Аудит архитектуры проекта Hotel

## 📊 Общая оценка

Ваш проект **хорошо структурирован** и в целом следует принципам FSD (Feature-Sliced Design). Однако есть области для улучшения архитектуры и соответствия best practices.

---

## 🎯 Критические проблемы FSD

### 1. **Нарушение изоляции слоёв: Widget → Feature**

**Проблема:**

```typescript
// src/widgets/SearchForm/model/slice.ts
import { type GuestsFieldValue } from '@/features/GuestsField';
```

**Почему это плохо:**

- Виджет импортирует тип из feature, создавая зависимость
- По FSD: Widget может использовать Features, но типы должны быть либо в entities, либо в shared

**Решение:**

```typescript
// Переместить GuestsFieldValue в entities или shared/types
// src/entities/booking/model/types.ts
export interface GuestsFieldValue {
    adults: number;
    children: number;
}
```

---

### 2. **Дублирование типов между слоями**

**Проблема:**

```typescript
// src/entities/hotel/model/types.ts
export interface HotelCardProps { ... }  // ❌ Это пропсы компонента, не бизнес-сущность

// src/widgets/HotelCard/model/types.ts
export interface HotelCardProps { ... }  // ✅ Правильное место
```

**Почему это плохо:**

- В entities должны быть только бизнес-сущности (Hotel, Booking, User)
- Пропсы компонентов относятся к UI слою (widget/feature)

**Решение:**
Удалить `HotelCardProps` из `entities/hotel/model/types.ts`, оставить только в `widgets/HotelCard/model/types.ts`

---

### 3. **Отсутствие API слоя**

**Проблема:**

- Нет выделенного слоя для работы с API
- Mock данные находятся в entities (`entities/hotel/model/mockData.ts`)
- Отсутствует централизованное управление запросами

**Решение:**
Создать структуру API:

```
src/
  shared/
    api/
      base/
        apiClient.ts      # Базовый fetch/axios клиент
        types.ts          # Базовые типы для API
      hotel/
        hotelApi.ts       # API методы для отелей
        types.ts          # Типы запросов/ответов
      booking/
        bookingApi.ts     # API методы для бронирований
```

Пример реализации:

```typescript
// src/shared/api/base/apiClient.ts
export const apiClient = {
    get: async <T>(url: string) => {
        /* ... */
    },
    post: async <T>(url: string, data: unknown) => {
        /* ... */
    },
};

// src/shared/api/hotel/hotelApi.ts
import { apiClient } from '../base/apiClient';
import type { Hotel } from '@/entities/hotel';

export const hotelApi = {
    getHotels: async (params: SearchParams): Promise<Hotel[]> => {
        return apiClient.get('/api/hotels', params);
    },
    getHotelById: async (id: string): Promise<Hotel> => {
        return apiClient.get(`/api/hotels/${id}`);
    },
};
```

---

### 4. **Store находится в app слое**

**Проблема:**

```typescript
// src/app/store.ts - ❌ неправильное расположение
```

**Почему это плохо:**

- В FSD store должен быть в `app/providers` или `shared/store`
- Конфигурация Redux - это кросс-слойная логика

**Решение:**

```
src/
  app/
    providers/
      StoreProvider/
        index.ts
        store.ts
        StoreProvider.tsx
```

---

### 5. **Пустой слой entities/hotel/ui**

**Проблема:**

```
entities/hotel/ui/  # пустая директория
```

**Почему это плохо:**

- Entities не должны содержать UI компоненты
- UI компоненты для отелей должны быть в features или widgets

**Решение:**
Удалить директорию `entities/hotel/ui/`

---

## 🔧 Архитектурные улучшения

### 6. **Неиспользуемый слой config**

**Проблема:**

```
src/config/  # пустая директория
```

**Решение:**
Создать централизованную конфигурацию:

```typescript
// src/config/env.ts
export const ENV = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    IS_DEV: process.env.NODE_ENV === 'development',
    IS_PROD: process.env.NODE_ENV === 'production',
};

// src/config/routes.ts
export const ROUTES = {
    HOME: '/',
    SEARCH: '/search/hotels',
    HOTEL: (id: string) => `/hotel/${id}`,
    BOOKING: (id: string) => `/booking/${id}`,
} as const;

// src/config/index.ts
export { ENV } from './env';
export { ROUTES } from './routes';
```

---

### 7. **Отсутствие единого Public API для features**

**Проблема:**

```typescript
// Некоторые features экспортируют через index.ts правильно:
export { HotelInfo } from './ui/HotelInfo';
export type { HotelInfoProps } from './model/types';

// Но в других местах есть абсолютные пути:
export type { PriceFilterProps } from '@/features/PriceFilter/model/types'; // ❌
```

**Решение:**
Всегда использовать относительные пути в index.ts:

```typescript
// src/features/PriceFilter/index.ts
export type { PriceFilterProps, PriceProp, RangeItem, SelectItem } from './model/types'; // ✅ относительный путь
export { PriceFilter } from './ui/PriceFilter';
```

---

### 8. **Widget использует Feature напрямую в импортах**

**Проблема:**

```typescript
// src/widgets/HotelCard/ui/HotelCard.tsx
import { BookingButton } from '@/features/BookingButton';
import { HotelInfo } from '@/features/HotelInfo';
import { ImageSlider } from '@/features/ImageSlider';
// ... и т.д.
```

**Статус:** ✅ Это правильно по FSD! Widget может использовать Features.

Но можно улучшить:

```typescript
// Создать композитный компонент
// src/features/HotelInfo/ui/HotelInfoComposite.tsx
export const HotelInfoComposite = ({ hotel }: { hotel: Hotel }) => {
    return (
        <>
            <HotelHeader ... />
            <HotelReviews ... />
            <HotelLocation ... />
            <HotelAmenities ... />
        </>
    );
};
```

---

### 9. **Сложная бизнес-логика в features** ✅

**Современный FSD 2.0:**
Слой `processes` был **удалён** как устаревший. Вместо этого:

- Сложная бизнес-логика → в **features**
- Композиция features → в **widgets** или **app**
- Пошаговые процессы → через state management в features

**Пример правильной реализации:**

```typescript
// src/features/BookingWizard/model/bookingStore.ts
import { create } from 'zustand';

interface BookingState {
    step: 'search' | 'select' | 'details' | 'payment' | 'confirmation';
    hotelId?: string;
    dates?: [Date, Date];
    nextStep: () => void;
    prevStep: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    step: 'search',
    nextStep: () => set((state) => ({ ... })),
    prevStep: () => set((state) => ({ ... })),
}));

// src/widgets/BookingWizard/ui/BookingWizard.tsx
export const BookingWizard = () => {
    const { step } = useBookingStore();

    return (
        <>
            {step === 'search' && <SearchHotelsFeature />}
            {step === 'select' && <SelectRoomFeature />}
            {step === 'details' && <GuestDetailsFeature />}
            {step === 'payment' && <PaymentFeature />}
        </>
    );
};
```

**Почему нет processes:**

- ❌ Создавал путаницу между features и processes
- ❌ Нарушал принцип единственной ответственности
- ✅ Features достаточно для любой бизнес-логики
- ✅ Widgets для композиции features

---

## 📝 Качество кода

### 10. **Неконсистентное использование TypeScript**

**Проблемы:**

```typescript
// ❌ Использование any (если есть)
const data: any = fetchData();

// ❌ Необязательные параметры без значений по умолчанию
interface Props {
    value?: string; // неясно, что будет если undefined
}
```

**Решения:**

```typescript
// ✅ Строгая типизация
const data: HotelData = await fetchData();

// ✅ Явные значения по умолчанию
interface Props {
    value?: string;
}

const Component = ({ value = '' }: Props) => { ... }
```

---

### 11. **Mock данные в production коде**

**Проблема:**

```typescript
// src/app/search/hotels/page.tsx
import { mockHotels } from '@/entities/hotel';
```

**Решение:**
Создать dev/mock слой:

```
src/
  shared/
    mocks/
      browser.ts        # MSW browser setup
      handlers/
        hotelHandlers.ts
        bookingHandlers.ts
```

```typescript
// src/app/search/hotels/page.tsx
const hotels = await hotelApi.getHotels(params); // Реальный API
// В dev-режиме будет перехвачен MSW и вернёт mock данные
```

---

### 12. **Отсутствие обработки ошибок**

**Проблема:**

```typescript
// src/widgets/SearchForm/hooks/useSearchForm.ts
try {
    dispatch(setSubmitting(true));
    const url = buildSearchUrl(...);
    router.push(url);
} catch (err) {
    console.error('Search submit error:', err);  // ❌ только console.error
} finally {
    dispatch(setSubmitting(false));
}
```

**Решение:**
Создать централизованную обработку ошибок:

```typescript
// src/shared/lib/errors/errorHandler.ts
export const handleError = (error: unknown, context?: string) => {
    if (error instanceof ApiError) {
        // Показать toast с ошибкой
        toast.error(error.message);
    } else {
        // Отправить в Sentry/LogRocket
        logger.error(error, { context });
    }
};

// Использование:
} catch (err) {
    handleError(err, 'SearchForm.submit');
    // Показать пользователю понятное сообщение
}
```

---

### 13. **Неоптимальная структура SCSS модулей**

**Наблюдение:**
Много дублирования стилей между компонентами

**Решение:**
Создать дизайн-токены:

```scss
// src/shared/assets/styles/tokens.scss
$colors: (
    'primary': #007bff,
    'secondary': #6c757d,
    'success': #28a745,
);

$spacing: (
    'xs': 4px,
    'sm': 8px,
    'md': 16px,
    'lg': 24px,
    'xl': 32px,
);

// Использование:
@use '@/shared/assets/styles/tokens' as *;

.button {
    padding: map-get($spacing, 'md');
    background: map-get($colors, 'primary');
}
```

---

### 14. **Отсутствие кастомных хуков в shared**

**Текущее состояние:**

```
src/shared/hooks/
  - useMediaQuery.ts
  - useDebouncedCallback.ts
  - useOutsideClick.ts
```

**Рекомендуется добавить:**

```typescript
// src/shared/hooks/useAsync.ts
export const useAsync = <T>(asyncFn: () => Promise<T>) => {
    const [state, setState] = useState<{
        data?: T;
        error?: Error;
        loading: boolean;
    }>({ loading: false });

    // ... реализация
};

// src/shared/hooks/useLocalStorage.ts
export const useLocalStorage = <T>(key: string, initial: T) => {
    // ... реализация
};
```

---

## 🏗️ Структурные улучшения

### 15. **Создать Feature Flags систему**

```typescript
// src/shared/lib/featureFlags/index.ts
export const featureFlags = {
    enableBooking: true,
    enableReviews: true,
    enablePartnerOffers: false,
};

export const useFeatureFlag = (flag: keyof typeof featureFlags) => {
    return featureFlags[flag];
};
```

---

### 16. **Добавить тестовую инфраструктуру**

**Текущее состояние:** Тесты отсутствуют

**Рекомендуется:**

```
src/
  shared/
    testing/
      test-utils.tsx      # RTL wrappers
      mocks/
      fixtures/
```

```json
// package.json
{
    "scripts": {
        "test": "jest",
        "test:watch": "jest --watch",
        "test:coverage": "jest --coverage"
    },
    "devDependencies": {
        "@testing-library/react": "^14.0.0",
        "@testing-library/jest-dom": "^6.0.0",
        "jest": "^29.0.0"
    }
}
```

---

### 17. **Улучшить TypeScript конфигурацию**

**Текущие проблемы:**

- Нет strict режима для некоторых опций
- Можно усилить type safety

```json
// tsconfig.json
{
    "compilerOptions": {
        "strict": true,
        "noUncheckedIndexedAccess": true, // + безопасность
        "noImplicitOverride": true, // + проверка override
        "exactOptionalPropertyTypes": true, // + строгость optional
        "noFallthroughCasesInSwitch": true, // + проверка switch
        "forceConsistentCasingInFileNames": true
    }
}
```

---

### 18. **Создать алиасы для всех слоёв**

**Текущее состояние:**

```json
"paths": {
    "@/*": ["./src/*"]
}
```

**Рекомендуется:**

```json
"paths": {
    "@/*": ["./src/*"],
    "@app/*": ["./src/app/*"],
    "@widgets/*": ["./src/widgets/*"],
    "@features/*": ["./src/features/*"],
    "@entities/*": ["./src/entities/*"],
    "@shared/*": ["./src/shared/*"],
    "@config/*": ["./src/config/*"]
}
```

**Примечание:** Слой `@pages/*` не нужен, т.к. используется Next.js App Router (pages в `src/app/`)

**Преимущества:**

- Явная принадлежность к слою
- Легче отслеживать нарушения FSD
- Лучше автокомплит

---

## 🎨 UI/UX улучшения

### 19. **Создать UI Kit документацию**

**Рекомендуется:**
Использовать существующий Storybook для:

- Документирования всех UI компонентов из shared/ui
- Примеров использования
- Интерактивного тестирования

```typescript
// Пример улучшенной story
// src/shared/ui/Button/Button.stories.tsx
export default {
    title: 'Shared/UI/Button',
    component: Button,
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'cyan', 'secondary'],
        },
    },
} as Meta;
```

---

### 20. **Accessibility (a11y)**

**Рекомендации:**

- Добавить ARIA атрибуты
- Keyboard navigation
- Focus management

```typescript
// src/shared/ui/Button/Button.tsx
export const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            aria-label={props['aria-label'] || (typeof children === 'string' ? children : undefined)}
            role="button"
            tabIndex={props.disabled ? -1 : 0}
        >
            {children}
        </button>
    );
};
```

---

## 📊 Производительность

### 21. **Оптимизация бандла**

**Рекомендации:**

```typescript
// next.config.ts
export default {
    // ... existing config
    webpack: (config) => {
        config.optimization.splitChunks = {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: 10,
                },
                shared: {
                    test: /[\\/]src[\\/]shared[\\/]/,
                    name: 'shared',
                    priority: 5,
                },
            },
        };
        return config;
    },
};
```

---

### 22. **Lazy loading для features**

```typescript
// src/widgets/HotelCard/ui/HotelCard.tsx
import dynamic from 'next/dynamic';

const ReviewsSlider = dynamic(
    () => import('@/features/ReviewsSlider').then(mod => ({ default: mod.ReviewsSlider })),
    { loading: () => <Skeleton /> }
);
```

---

## 🔐 Безопасность

### 23. **Валидация на уровне entities**

```typescript
// src/entities/hotel/model/validation.ts
import { z } from 'zod';

export const hotelSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(200),
    starRating: z.number().int().min(1).max(5),
    rating: z.number().min(0).max(10).optional(),
    // ... rest of fields
});

export const validateHotel = (data: unknown) => {
    return hotelSchema.parse(data);
};
```

---

## 📋 План внедрения улучшений

### Приоритет 1 (Критический) - Сейчас

1. ✅ Исправить нарушения изоляции слоёв (#1)
2. ✅ Удалить дублирование типов (#2)
3. ✅ Переместить store в правильное место (#4)
4. ✅ Удалить пустую директорию entities/hotel/ui (#5)

### Приоритет 2 (Высокий) - Следующая итерация

5. 🔧 Создать API слой (#3)
6. 🔧 Настроить config (#6)
7. 🔧 Унифицировать Public API (#7)
8. 🔧 Добавить обработку ошибок (#12)

### Приоритет 3 (Средний) - Долгосрочный

9. 📝 Создать дизайн-токены (#13)
10. 📝 Улучшить TypeScript (#17)
11. 📝 Создать алиасы для слоёв (#18)

### Приоритет 4 (Низкий) - По возможности

13. 🎨 Настроить MSW для моков (#11)
14. 🎨 Добавить тесты (#16)
15. 🎨 Оптимизация бандла (#21, #22)
16. 🎨 A11y улучшения (#20)

---

## ✅ Что уже хорошо реализовано

1. ✅ **Современная FSD 2.0 структура**: app → widgets → features → entities → shared
2. ✅ **Нет устаревших слоёв**: нет processes (правильно для FSD 2.0)
3. ✅ **Public API для модулей**: большинство features экспортируют через index.ts
4. ✅ **Использование TypeScript**: проект полностью на TS
5. ✅ **Изоляция стилей**: CSS Modules для каждого компонента
6. ✅ **Нет глубокой вложенности**: компоненты хорошо декомпозированы
7. ✅ **Redux Toolkit**: современный state management
8. ✅ **Валидация с Zod**: type-safe схемы валидации
9. ✅ **Next.js 15**: современная версия фреймворка
10. ✅ **Storybook**: есть инфраструктура для UI Kit

---

## 🎓 Дополнительные ресурсы

- [Feature-Sliced Design](https://feature-sliced.design/ru/) - официальная документация FSD 2.0
- [FSD Examples](https://github.com/feature-sliced/examples) - примеры реализации
- [Public API specification](https://feature-sliced.design/docs/reference/public-api) - спецификация Public API
- [Что нового в FSD 2.0](https://feature-sliced.design/docs/about/migration/from-v1) - миграция с FSD 1.0

**Важно:** В проекте используется **FSD 2.0** (актуальная версия), где:

- ✅ Нет слоя `processes` (устарел)
- ✅ Сложная логика в `features`
- ✅ Композиция в `widgets` и `app`

---

## 📞 Заключение

Ваш проект имеет **хорошую базу** и в целом следует принципам FSD. Основные проблемы:

1. 🔴 Отсутствие API слоя
2. 🟡 Небольшие нарушения изоляции слоёв
3. 🟡 Неиспользуемые директории и конфигурации
4. 🟢 Хорошая структура и организация кода

**Рекомендую** начать с исправления критических проблем (Приоритет 1), затем постепенно внедрять улучшения из других категорий.

Общая оценка: **8/10** по соответствию FSD ⭐
