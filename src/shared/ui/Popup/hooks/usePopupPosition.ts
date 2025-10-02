import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Стили позиционирования для попапа
 */
interface PositionStyle {
    /** Расстояние от верхнего края viewport */
    top: number;

    /** Расстояние от левого края viewport или 'auto' */
    left: number | 'auto';

    /** Расстояние от правого края viewport или 'auto' */
    right: number | 'auto';

    /** CSS transform для точного позиционирования */
    transform: string;
}

/**
 * Параметры хука usePopupPosition
 */
interface UsePopupPositionProps {
    /** Флаг открытия попапа */
    isOpen: boolean;

    /** Callback закрытия попапа */
    onClose: () => void;

    /** Ссылка на элемент-триггер */
    triggerRef: React.RefObject<HTMLElement | null>;

    /** Вертикальное размещение относительно триггера */
    placement: 'bottom' | 'top';

    /** Горизонтальное выравнивание */
    position: 'center' | 'left' | 'right' | 'auto' | 'start' | 'end';

    /** Ссылка на DOM-элемент попапа */
    popupRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Отступ попапа от триггера в пикселях
 */
// const POPUP_OFFSET = 8;

/**
 * Хук для расчета и управления позицией попапа относительно триггера
 *
 * @description
 * Автоматически рассчитывает оптимальную позицию попапа с учетом:
 * - Размеров viewport для предотвращения выхода за границы
 * - Изменения размеров триггера через ResizeObserver
 * - Изменения размеров окна
 * - Закрытия при клике вне попапа
 *
 * @features
 * - Синхронное вычисление позиции через useLayoutEffect (без мерцания)
 * - Оптимизация через RAF для обработчиков resize
 * - Автоматическая подстройка при выходе за viewport
 * - Click-outside handling
 *
 * @example
 * ```tsx
 * const { positionStyle } = usePopupPosition({
 *   isOpen: true,
 *   onClose: () => setOpen(false),
 *   triggerRef,
 *   placement: 'bottom',
 *   position: 'center',
 *   popupRef
 * });
 * ```
 */
export const usePopupPosition = ({
    isOpen,
    onClose,
    triggerRef,
    placement,
    position,
    popupRef,
}: UsePopupPositionProps) => {
    // Состояние стилей позиционирования
    const [positionStyle, setPositionStyle] = useState<PositionStyle>({
        top: 0,
        left: 0,
        right: 'auto',
        transform: '',
    });

    // Ссылки для очистки асинхронных операций
    const rafRef = useRef<number | null>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    /**
     * Вычисление оптимальной позиции попапа
     * Мемоизировано для использования в эффектах
     *
     * @param triggerRect - Размеры и позиция триггера
     * @param popupRect - Размеры и позиция попапа
     * @param viewportWidth - Ширина viewport
     * @returns Объект со стилями позиционирования
     */
    const calculatePosition = useCallback(
        (triggerRect: DOMRect, popupRect: DOMRect, viewportWidth: number): PositionStyle => {
            let left: number | 'auto' = 0;
            const right: number | 'auto' = 'auto';
            let transform = '';

            // Определение горизонтальной позиции
            switch (position) {
                case 'center':
                    // Центрируем попап относительно триггера
                    left = triggerRect.left + triggerRect.width / 2 - popupRect.width / 2;
                    break;

                case 'left':
                case 'start':
                    // Выравниваем по левому краю триггера
                    left = triggerRect.left;
                    break;

                case 'right':
                case 'end':
                    // Выравниваем по правому краю триггера
                    left = triggerRect.right - popupRect.width;
                    break;

                case 'auto':
                default:
                    // Автоматическое определение позиции с центрированием
                    left = triggerRect.left + triggerRect.width / 2;
                    transform = 'translateX(-50%)';

                    // Проверка выхода за правую границу viewport
                    if (left + popupRect.width / 2 > viewportWidth) {
                        left = viewportWidth - popupRect.width - 16; // 16px отступ от края
                        transform = '';
                    }

                    // Проверка выхода за левую границу viewport
                    if (left - popupRect.width / 2 < 0) {
                        left = 16; // 16px отступ от края
                        transform = '';
                    }
                    break;
            }

            // Дополнительная защита от выхода за границы viewport
            if (position !== 'auto' && typeof left === 'number') {
                // Проверка правой границы
                if (left + popupRect.width > viewportWidth) {
                    left = viewportWidth - popupRect.width - 8;
                }
                // Проверка левой границы
                if (left < 0) {
                    left = 8;
                }
            }

            // Вычисление вертикальной позиции
            const top =
                placement === 'bottom' ? triggerRect.bottom : triggerRect.top - popupRect.height;

            return { top, left, right, transform };
        },
        [placement, position],
    );

    /**
     * Функция обновления позиции попапа
     * Вызывается при изменениях размеров или при открытии
     */
    const updatePosition = useCallback(() => {
        if (!triggerRef.current || !popupRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        const newPosition = calculatePosition(triggerRect, popupRect, viewportWidth);

        setPositionStyle((prev) => {
            // Оптимизация: обновляем только если позиция реально изменилась
            const isSamePosition =
                prev.top === newPosition.top &&
                prev.left === newPosition.left &&
                prev.right === newPosition.right &&
                prev.transform === newPosition.transform;

            return isSamePosition ? prev : newPosition;
        });
    }, [triggerRef, popupRef, calculatePosition]);

    /**
     * Синхронное обновление позиции при открытии/закрытии
     * useLayoutEffect предотвращает мерцание, т.к. выполняется до отрисовки
     */
    useLayoutEffect(() => {
        if (!isOpen) return;

        // Немедленное обновление позиции
        updatePosition();
    }, [isOpen, updatePosition]);

    /**
     * Отслеживание изменений размеров триггера и окна
     */
    useEffect(() => {
        if (!isOpen || !triggerRef.current) return;

        /**
         * Обработчик resize с оптимизацией через RAF
         */
        const handleResize = () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            rafRef.current = requestAnimationFrame(updatePosition);
        };

        // Подписка на resize окна
        window.addEventListener('resize', handleResize);

        // Подписка на изменения размеров триггера
        if ('ResizeObserver' in window) {
            resizeObserverRef.current = new ResizeObserver(handleResize);
            resizeObserverRef.current.observe(triggerRef.current);
        }

        return () => {
            window.removeEventListener('resize', handleResize);

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
                resizeObserverRef.current = null;
            }

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [isOpen, triggerRef, updatePosition]);

    /**
     * Обработка клика вне попапа для закрытия
     */
    useEffect(() => {
        if (!isOpen) return;

        /**
         * Обработчик клика для определения клика вне попапа
         * @param event - DOM событие клика мыши
         */
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // Проверяем, что клик произошел вне попапа и триггера
            const isClickedOutsidePopup = popupRef.current && !popupRef.current.contains(target);
            const isClickedOutsideTrigger =
                triggerRef.current && !triggerRef.current.contains(target);

            if (isClickedOutsidePopup && isClickedOutsideTrigger) {
                onClose();
            }
        };

        // Используем capture phase для более раннего перехвата
        document.addEventListener('mousedown', handleClickOutside, true);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, [isOpen, onClose, triggerRef, popupRef]);

    return { positionStyle };
};
