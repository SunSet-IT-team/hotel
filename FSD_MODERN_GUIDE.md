# Современный FSD 2.0 - Руководство для проекта

## 🎯 Актуальная архитектура FSD

Ваш проект использует **Feature-Sliced Design v2.0** - современную версию методологии.

### Слои в FSD 2.0

```
src/
├── app/              # Инициализация приложения, providers, роутинг
├── widgets/          # Композитные UI-блоки (Header, Footer, ProductCard)
├── features/         # Бизнес-функциональность (Auth, Booking, Filters)
├── entities/         # Бизнес-сущности (User, Hotel, Booking)
└── shared/           # Переиспользуемый код (UI Kit, API, utils)
```

### ❌ Что УДАЛЕНО в FSD 2.0

1. **Слой `processes`** - был признан избыточным
    - Причина: создавал путаницу с features
    - Решение: вся бизнес-логика в features

2. **Слой `pages`** (частично)
    - Next.js App Router заменяет необходимость в отдельном слое pages
    - Страницы живут в `src/app/**/page.tsx`

---

## 📐 Правила размещения кода

### 1. **app/** - Инициализация

✅ **Что размещать:**

- Providers (Redux, Theme, Auth)
- Глобальные layouts
- Middleware
- Routing (в случае Next.js - встроенный)

❌ **Что НЕ размещать:**

- Бизнес-логику
- UI компоненты
- Утилиты

```typescript
// ✅ Правильно
src/app/
  ├── layout.tsx              # Корневой layout
  ├── providers.tsx           # Провайдеры
  └── providers/
      └── StoreProvider/      # Redux setup
          ├── store.ts
          └── StoreProvider.tsx
```

---

### 2. **widgets/** - Композитные блоки

✅ **Что размещать:**

- Самодостаточные UI-блоки
- Композиция features
- Сложные компоненты с бизнес-логикой

❌ **Что НЕ размещать:**

- Простые UI компоненты (→ shared/ui)
- Бизнес-логику без UI (→ features)
- Утилиты (→ shared)

```typescript
// ✅ Правильно - композиция features в widget
// src/widgets/HotelCard/ui/HotelCard.tsx
import { ImageSlider } from '@/features/ImageSlider';
import { HotelInfo } from '@/features/HotelInfo';
import { BookingButton } from '@/features/BookingButton';

export const HotelCard = ({ hotel }) => (
    <article>
        <ImageSlider images={hotel.images} />
        <HotelInfo hotel={hotel} />
        <BookingButton hotelId={hotel.id} />
    </article>
);
```

---

### 3. **features/** - Бизнес-функциональность

✅ **Что размещать:**

- Пользовательские сценарии (auth, booking, search)
- Бизнес-логика с UI
- Сложные многошаговые процессы

❌ **Что НЕ размещать:**

- Бизнес-сущности без логики (→ entities)
- Простые UI компоненты (→ shared/ui)
- API клиенты (→ shared/api)

**Пример: Многошаговый процесс в feature**

```typescript
// ✅ ПРАВИЛЬНО - процесс бронирования в feature
// src/features/BookingWizard/model/bookingStore.ts
import { create } from 'zustand';

type Step = 'search' | 'select' | 'details' | 'payment' | 'confirm';

interface BookingStore {
    step: Step;
    hotelId?: string;
    roomId?: string;
    guestDetails?: GuestDetails;

    setStep: (step: Step) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
}

export const useBookingWizard = create<BookingStore>((set, get) => ({
    step: 'search',

    nextStep: () => {
        const { step } = get();
        const steps: Step[] = ['search', 'select', 'details', 'payment', 'confirm'];
        const currentIndex = steps.indexOf(step);
        if (currentIndex < steps.length - 1) {
            set({ step: steps[currentIndex + 1] });
        }
    },

    prevStep: () => {
        const { step } = get();
        const steps: Step[] = ['search', 'select', 'details', 'payment', 'confirm'];
        const currentIndex = steps.indexOf(step);
        if (currentIndex > 0) {
            set({ step: steps[currentIndex - 1] });
        }
    },

    setStep: (step) => set({ step }),
    reset: () => set({ step: 'search', hotelId: undefined, roomId: undefined }),
}));

// src/features/BookingWizard/ui/BookingWizard.tsx
export const BookingWizard = () => {
    const { step, nextStep, prevStep } = useBookingWizard();

    return (
        <div>
            {step === 'search' && <SearchStep onNext={nextStep} />}
            {step === 'select' && <SelectRoomStep onNext={nextStep} onBack={prevStep} />}
            {step === 'details' && <GuestDetailsStep onNext={nextStep} onBack={prevStep} />}
            {step === 'payment' && <PaymentStep onNext={nextStep} onBack={prevStep} />}
            {step === 'confirm' && <ConfirmationStep />}
        </div>
    );
};
```

---

### 4. **entities/** - Бизнес-сущности

✅ **Что размещать:**

- Типы данных (Hotel, User, Booking)
- Схемы валидации
- Модели данных
- CRUD операции для сущностей

❌ **Что НЕ размещать:**

- UI компоненты (даже для отображения сущности)
- Бизнес-логику (→ features)
- Пропсы компонентов

```typescript
// ✅ Правильно
// src/entities/hotel/model/types.ts
export interface Hotel {
    id: string;
    name: string;
    rating: number;
    // ... только данные
}

// ❌ НЕПРАВИЛЬНО - это пропсы UI, не бизнес-сущность
export interface HotelCardProps {
    // ← должно быть в widgets/HotelCard
    hotel: Hotel;
    onClick?: () => void;
}
```

---

### 5. **shared/** - Переиспользуемый код

✅ **Что размещать:**

- UI Kit (Button, Input, Modal)
- API клиенты
- Утилиты и хелперы
- Хуки (useDebounce, useMediaQuery)
- Константы

❌ **Что НЕ размещать:**

- Бизнес-логику
- Специфичные для домена компоненты

```typescript
// ✅ Правильная структура shared
src/shared/
├── ui/                    # UI Kit
│   ├── Button/
│   ├── Input/
│   └── Modal/
├── api/                   # API клиенты
│   ├── base/
│   └── hotel/
├── lib/                   # Библиотеки и утилиты
│   ├── errors/
│   ├── date/
│   └── formatting/
├── hooks/                 # Переиспользуемые хуки
│   ├── useDebounce.ts
│   └── useMediaQuery.ts
└── constants/             # Константы
    └── breakpoints.ts
```

---

## 🔗 Правила импортов

### Правило изоляции слоёв

```
app → widgets → features → entities → shared
  ↓       ↓         ↓          ↓         ↓
никого  можно    можно      можно    только
       всех ниже всех ниже всех ниже  shared
```

### Примеры правильных импортов

```typescript
// ✅ Widget импортирует features и entities
// src/widgets/HotelCard/ui/HotelCard.tsx
import type { Hotel } from '@/entities/hotel'; // ✅
import { ImageSlider } from '@/features/ImageSlider'; // ✅
import { Button } from '@/shared/ui'; // ✅

// ✅ Feature импортирует entities и shared
// src/features/BookingButton/ui/BookingButton.tsx
import type { Hotel } from '@/entities/hotel'; // ✅
import { Button } from '@/shared/ui'; // ✅

// ✅ Entity импортирует только shared
// src/entities/hotel/model/validation.ts
import { z } from 'zod'; // ✅ внешняя библиотека
import { formatDate } from '@/shared/lib/date'; // ✅
```

### Примеры НЕПРАВИЛЬНЫХ импортов

```typescript
// ❌ Feature импортирует widget
// src/features/SomeFeature/ui/Component.tsx
import { Header } from '@/widgets/Header'; // ❌ НЕЛЬЗЯ!

// ❌ Entity импортирует feature
// src/entities/hotel/model/utils.ts
import { searchHotels } from '@/features/SearchHotels'; // ❌ НЕЛЬЗЯ!

// ❌ Shared импортирует entities
// src/shared/utils/formatHotel.ts
import type { Hotel } from '@/entities/hotel'; // ❌ НЕЛЬЗЯ!
```

---

## 📦 Public API

Каждый модуль должен экспортировать через `index.ts`:

```typescript
// ✅ Правильный Public API
// src/features/BookingButton/index.ts
export { BookingButton } from './ui/BookingButton';
export type { BookingButtonProps } from './model/types';

// ✅ Использование
import { BookingButton } from '@/features/BookingButton';

// ❌ НЕПРАВИЛЬНО - прямой импорт внутренностей
import { BookingButton } from '@/features/BookingButton/ui/BookingButton';
```

---

## 🚀 Примеры из вашего проекта

### ✅ Что уже правильно

1. **Структура слоёв**

    ```
    src/
    ├── app/
    ├── widgets/
    ├── features/
    ├── entities/
    └── shared/
    ```

    ✅ Нет устаревшего `processes`

2. **Entities - только данные**

    ```typescript
    // src/entities/hotel/model/types.ts
    export interface Hotel { ... }      // ✅ Только типы
    export interface HotelPrice { ... } // ✅ Только данные
    ```

3. **Features с бизнес-логикой**
    ```typescript
    // src/features/SearchLocation/
    // src/features/BookingButton/
    // src/features/HotelInfo/
    ```
    ✅ Функциональность, не процессы

### 🔧 Что улучшили

1. **Убрали нарушение изоляции**

    ```typescript
    // ❌ Было
    // src/widgets/SearchForm/model/slice.ts
    import { type GuestsFieldValue } from '@/features/GuestsField';

    // ✅ Стало
    import type { GuestsCount } from '@/entities/booking';
    ```

2. **Убрали дублирование типов**

    ```typescript
    // ❌ Было - HotelCardProps в entities/hotel
    // ✅ Стало - HotelCardProps только в widgets/HotelCard
    ```

3. **Добавили API слой**
    ```typescript
    // ✅ Теперь есть централизованный API
    src/shared/api/
    ├── base/apiClient.ts
    ├── hotel/hotelApi.ts
    └── index.ts
    ```

---

## 📚 Чеклист соответствия FSD 2.0

### Архитектура

- [x] Используются только актуальные слои (app, widgets, features, entities, shared)
- [x] Нет устаревшего слоя `processes`
- [x] Правильная иерархия зависимостей
- [x] Каждый модуль имеет Public API (index.ts)

### Изоляция

- [x] Widget не импортирует другие widgets
- [x] Feature не импортирует widgets
- [x] Entity не импортирует features
- [x] Shared не импортирует entities/features/widgets

### Организация

- [x] Бизнес-сущности в entities
- [x] Бизнес-логика в features
- [x] Композиция в widgets
- [x] Переиспользуемый код в shared

### Best Practices

- [x] API клиенты в shared/api
- [x] Конфигурация в config
- [x] Обработка ошибок централизована
- [x] TypeScript strict mode

---

## 🎯 Итоговая оценка

**Ваш проект: 9/10** по FSD 2.0 ⭐⭐⭐⭐⭐

### Сильные стороны:

- ✅ Актуальная архитектура FSD 2.0
- ✅ Правильное использование слоёв
- ✅ Нет устаревших концепций
- ✅ Хорошая декомпозиция

### Что можно улучшить:

- 🔧 Добавить больше unit-тестов
- 🔧 Улучшить a11y
- 🔧 Оптимизировать bundle size

---

## 📖 Полезные ссылки

- [FSD 2.0 Documentation](https://feature-sliced.design/) - официальная документация
- [Migration from v1 to v2](https://feature-sliced.design/docs/about/migration/from-v1) - миграция
- [Examples](https://github.com/feature-sliced/examples) - примеры проектов
- [Awesome FSD](https://github.com/feature-sliced/awesome) - коллекция ресурсов

**Важно:** Ваш проект уже следует FSD 2.0! 🎉
