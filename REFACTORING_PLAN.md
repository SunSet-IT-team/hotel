# План рефакторинга проекта Hotel

## 🎯 Краткая сводка проблем

### Критические (исправить немедленно)

- ❌ Widget импортирует типы из Feature
- ❌ Дублирование типов между слоями
- ❌ Store в неправильном месте
- ❌ Пустые директории в entities

### Важные (следующая итерация)

- ⚠️ Отсутствие API слоя
- ⚠️ Mock данные в production коде
- ⚠️ Неиспользуемая директория config
- ⚠️ Отсутствие обработки ошибок

### Желательные (долгосрочно)

- 💡 Создать дизайн-токены
- 💡 Настроить тесты
- 💡 Улучшить a11y
- 💡 Добавить оптимизацию производительности

---

## 📝 Детальный план действий

### Шаг 1: Исправление типов (GuestsFieldValue)

**Проблема:**

```typescript
// src/widgets/SearchForm/model/slice.ts
import { type GuestsFieldValue } from '@/features/GuestsField';
```

**Решение:**

1. Создать тип в entities/booking:

```typescript
// src/entities/booking/model/types.ts
export interface Booking {
    id: string;
    location: string;
    dates: [Date, Date];
    guests: GuestsCount; // ← переименовать
    price: number;
    status: 'pending' | 'confirmed' | 'cancelled';
}

export interface GuestsCount {
    adults: number;
    children: number;
}
```

2. Экспортировать из public API:

```typescript
// src/entities/booking/index.ts
export type { Booking, GuestsCount } from './model/types';
```

3. Обновить GuestsField:

```typescript
// src/features/GuestsField/model/types.ts
import type { GuestsCount } from '@/entities/booking';

export type GuestsFieldValue = GuestsCount; // реэкспорт
export interface GuestsFieldProps {
    value?: GuestsFieldValue;
    onChange?: (value: GuestsFieldValue) => void;
}
```

4. Обновить SearchForm:

```typescript
// src/widgets/SearchForm/model/slice.ts
import type { GuestsCount } from '@/entities/booking';

export interface SearchFormSlice {
    values: {
        query?: string;
        destination?: Destination | null;
        dateRange?: DateRange;
        peoplesCount?: GuestsCount; // ← использовать из entities
    };
    isSubmitting: boolean;
}
```

---

### Шаг 2: Удаление дублирования типов

**Действия:**

1. Удалить из entities/hotel/model/types.ts:

```typescript
// ❌ УДАЛИТЬ ЭТО:
export interface HotelCardProps {
    hotel: Hotel;
    className?: string;
    onClick?: (hotelId: string) => void;
}
```

2. Обновить entities/hotel/index.ts:

```typescript
// src/entities/hotel/index.ts
export { mockHotels } from './model/mockData';
export type { Hotel, HotelPrice, HotelReview } from './model/types';
// ❌ УДАЛИТЬ: export type { HotelCardProps } from './model/types';
```

3. Убедиться, что widgets/HotelCard/model/types.ts использует Hotel из entities:

```typescript
// src/widgets/HotelCard/model/types.ts
import { type Hotel } from '@/entities/hotel';

export interface HotelCardProps {
    hotel: Hotel;
    className?: string;
    onClick?: (hotelId: string) => void;
}
```

---

### Шаг 3: Переместить store в правильное место

**Действия:**

1. Создать структуру:

```bash
mkdir -p src/app/providers/StoreProvider
```

2. Переместить и обновить:

```typescript
// src/app/providers/StoreProvider/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { searchFormReducer } from '@/widgets/SearchForm';

export const makeStore = () => {
    return configureStore({
        reducer: {
            searchForm: searchFormReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

3. Создать Provider:

```typescript
// src/app/providers/StoreProvider/StoreProvider.tsx
'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from './store';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
};
```

4. Создать публичный API:

```typescript
// src/app/providers/StoreProvider/index.ts
export { StoreProvider } from './StoreProvider';
export type { RootState, AppDispatch } from './store';
```

5. Обновить providers.tsx:

```typescript
// src/app/providers.tsx
'use client';

import { StoreProvider } from './providers/StoreProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <StoreProvider>{children}</StoreProvider>;
};
```

6. Удалить старый файл:

```bash
rm src/app/store.ts
```

7. Обновить импорты в shared/hooks/redux.ts:

```typescript
// src/shared/hooks/redux.ts
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/providers/StoreProvider';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
```

---

### Шаг 4: Удалить пустую директорию

```bash
# Удалить пустую директорию
rmdir src/entities/hotel/ui
```

---

### Шаг 5: Создать API слой

**Структура:**

```
src/
  shared/
    api/
      base/
        apiClient.ts
        types.ts
        constants.ts
      hotel/
        hotelApi.ts
        types.ts
      booking/
        bookingApi.ts
        types.ts
      index.ts
```

**Реализация:**

1. Базовый клиент:

```typescript
// src/shared/api/base/apiClient.ts
import { ENV } from '@/config';

interface RequestConfig extends RequestInit {
    params?: Record<string, string | number | boolean>;
}

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
        const { params, ...init } = config;

        let url = `${this.baseURL}${endpoint}`;

        if (params) {
            const searchParams = new URLSearchParams(
                Object.entries(params).map(([k, v]) => [k, String(v)]),
            );
            url += `?${searchParams.toString()}`;
        }

        const response = await fetch(url, {
            ...init,
            headers: {
                'Content-Type': 'application/json',
                ...init.headers,
            },
        });

        if (!response.ok) {
            throw new ApiError(response.status, response.statusText);
        }

        return response.json();
    }

    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET', params });
    }

    async post<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const apiClient = new ApiClient(ENV.API_URL);
```

2. Hotel API:

```typescript
// src/shared/api/hotel/hotelApi.ts
import { apiClient } from '../base/apiClient';
import type { Hotel } from '@/entities/hotel';
import type { SearchHotelsParams, SearchHotelsResponse } from './types';

export const hotelApi = {
    /**
     * Получить список отелей по параметрам поиска
     */
    searchHotels: async (params: SearchHotelsParams): Promise<Hotel[]> => {
        // В production будет реальный API
        // В development MSW перехватит запрос и вернёт mock данные
        const response = await apiClient.get<SearchHotelsResponse>('/api/hotels', params);
        return response.hotels;
    },

    /**
     * Получить детали отеля по ID
     */
    getHotelById: async (id: string): Promise<Hotel> => {
        return apiClient.get<Hotel>(`/api/hotels/${id}`);
    },

    /**
     * Получить похожие отели
     */
    getSimilarHotels: async (hotelId: string, limit = 5): Promise<Hotel[]> => {
        return apiClient.get<Hotel[]>(`/api/hotels/${hotelId}/similar`, { limit });
    },
};
```

3. Типы для API:

```typescript
// src/shared/api/hotel/types.ts
export interface SearchHotelsParams {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    minPrice?: number;
    maxPrice?: number;
    starRating?: number[];
    amenities?: string[];
}

export interface SearchHotelsResponse {
    hotels: Hotel[];
    total: number;
    page: number;
    pageSize: number;
}
```

4. Публичный API:

```typescript
// src/shared/api/index.ts
export { apiClient, ApiError } from './base/apiClient';
export { hotelApi } from './hotel/hotelApi';
export type * from './hotel/types';
```

---

### Шаг 6: Настроить config

```typescript
// src/config/env.ts
export const ENV = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    IS_DEV: process.env.NODE_ENV === 'development',
    IS_PROD: process.env.NODE_ENV === 'production',
    IS_PREVIEW: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
} as const;

// src/config/routes.ts
export const ROUTES = {
    HOME: '/',
    SEARCH: '/search/hotels',
    HOTEL: (id: string) => `/hotel/${id}`,
    BOOKING: (id: string) => `/booking/${id}`,
} as const;

// src/config/constants.ts
export const CONSTANTS = {
    MAX_ADULTS: 10,
    MAX_CHILDREN: 5,
    MIN_PRICE: 0,
    MAX_PRICE: 100000,
    SEARCH_DEBOUNCE_MS: 300,
    RESULTS_PER_PAGE: 20,
} as const;

// src/config/index.ts
export { ENV } from './env';
export { ROUTES } from './routes';
export { CONSTANTS } from './constants';
```

---

### Шаг 7: Улучшить обработку ошибок

```typescript
// src/shared/lib/errors/errorHandler.ts
import { ApiError } from '@/shared/api';

export class AppError extends Error {
    constructor(
        message: string,
        public code?: string,
        public context?: Record<string, unknown>,
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const handleError = (error: unknown, context?: string): string => {
    if (error instanceof ApiError) {
        // Обработка API ошибок
        switch (error.status) {
            case 404:
                return 'Ресурс не найден';
            case 500:
                return 'Ошибка сервера. Попробуйте позже';
            default:
                return error.message || 'Произошла ошибка';
        }
    }

    if (error instanceof AppError) {
        // Логирование в Sentry/LogRocket
        console.error(`[${error.code}] ${error.message}`, error.context);
        return error.message;
    }

    // Неизвестная ошибка
    console.error('Unexpected error:', error, { context });
    return 'Произошла неожиданная ошибка';
};

// src/shared/lib/errors/index.ts
export { AppError, handleError } from './errorHandler';
```

Использование:

```typescript
// src/widgets/SearchForm/hooks/useSearchForm.ts
import { handleError } from '@/shared/lib/errors';

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
        dispatch(setSubmitting(true));
        const url = buildSearchUrl('/search/hotels', formData);
        router.push(url);
    } catch (err) {
        const errorMessage = handleError(err, 'SearchForm.submit');
        // Показать toast или уведомление пользователю
        alert(errorMessage); // В production использовать toast
    } finally {
        dispatch(setSubmitting(false));
    }
};
```

---

### Шаг 8: Создать алиасы для слоёв

```json
// tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["./src/*"],
            "@app/*": ["./src/app/*"],
            "@widgets/*": ["./src/widgets/*"],
            "@features/*": ["./src/features/*"],
            "@entities/*": ["./src/entities/*"],
            "@shared/*": ["./src/shared/*"],
            "@config/*": ["./src/config/*"]
        }
    }
}
```

**Примечание:** В FSD 2.0 нет слоя `processes` - это устаревшая концепция из FSD 1.0

---

## 🔄 Порядок выполнения

### День 1: Исправление критических проблем

- [ ] Шаг 1: GuestsFieldValue в entities
- [ ] Шаг 2: Удалить дублирование HotelCardProps
- [ ] Шаг 4: Удалить пустую директорию

### День 2: Реструктуризация store

- [ ] Шаг 3: Переместить store в providers

### День 3-4: API слой

- [ ] Шаг 5: Создать API инфраструктуру
- [ ] Шаг 6: Настроить config

### День 5: Улучшения

- [ ] Шаг 7: Обработка ошибок
- [ ] Шаг 8: TypeScript алиасы

---

## 🧪 Проверка после рефакторинга

```bash
# Проверить типы
pnpm type:check

# Проверить линтер
pnpm lint

# Запустить dev сервер
pnpm dev

# Проверить сборку
pnpm build
```

---

## 📝 Checklist

### Критические

- [ ] Widget не импортирует типы из Feature
- [ ] Нет дублирования типов между слоями
- [ ] Store в app/providers
- [ ] Удалены пустые директории

### Важные

- [ ] Создан API слой
- [ ] Настроен config
- [ ] Добавлена обработка ошибок
- [ ] Созданы алиасы TypeScript

### Документация

- [ ] Обновлен README.md
- [ ] Созданы примеры в Storybook
- [ ] Добавлены JSDoc комментарии

---

## 💡 Полезные команды

```bash
# Найти все импорты из features в widgets
grep -r "from '@/features" src/widgets/

# Найти все console.log/error
grep -r "console\." src/ --exclude-dir=node_modules

# Найти неиспользуемые импорты
pnpm lint --fix
```
