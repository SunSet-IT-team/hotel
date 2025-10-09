import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Стили позиционирования для попапа
 */
interface PositionStyle {
    /** Расстояние от верхнего края документа */
    top: number;

    /** Расстояние от левого края документа или 'auto' */
    left: number | 'auto';

    /** Расстояние от правого края документа или 'auto' */
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
 * Константы отступов
 */
const VIEWPORT_EDGE_PADDING_LARGE = 16; // Большой отступ от края viewport
const VIEWPORT_EDGE_PADDING_SMALL = 8; // Малый отступ от края viewport

/**
 * Получение текущей позиции скролла документа
 * Проверяет все возможные источники скролла для кросс-браузерности
 */
const getDocumentScroll = (): { scrollY: number; scrollX: number } => {
    return {
        scrollY:
            window.scrollY ||
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0,
        scrollX:
            window.scrollX ||
            window.pageXOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft ||
            0,
    };
};

/**
 * Хук для расчета и управления позицией попапа относительно триггера
 *
 * @description
 * Автоматически рассчитывает оптимальную позицию попапа с учетом:
 * - Размеров viewport для предотвращения выхода за границы
 * - Адаптивного позиционирования при resize
 * - Умной подстройки при выходе за края экрана
 * - Закрытия при клике вне попапа
 *
 * @features
 * - Адаптивное позиционирование - подстраивается под размер экрана
 * - Синхронное вычисление позиции через useLayoutEffect (без мерцания)
 * - Оптимизация через RAF для обработчиков resize
 * - Автоматическая подстройка при выходе за viewport
 * - Кросс-браузерная поддержка различных источников скролла
 * - Click-outside handling с мемоизацией обработчиков
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

    // Ссылка для очистки RAF
    const rafRef = useRef<number | null>(null);

    /**
     * Вычисление горизонтальной позиции попапа с учетом границ
     */
    const calculateHorizontalPosition = useCallback(
        (
            triggerRect: DOMRect,
            popupRect: DOMRect,
            viewportWidth: number,
            scrollX: number,
        ): { left: number | 'auto'; transform: string } => {
            let left: number | 'auto' = 0;
            let transform = '';

            const triggerCenterX = triggerRect.left + triggerRect.width / 2;
            const popupHalfWidth = popupRect.width / 2;

            switch (position) {
                case 'center':
                    // Центрируем попап относительно триггера
                    left = triggerCenterX + scrollX - popupHalfWidth;
                    break;

                case 'left':
                case 'start':
                    // Выравниваем по левому краю триггера
                    left = triggerRect.left + scrollX;
                    break;

                case 'right':
                case 'end':
                    // Выравниваем по правому краю триггера
                    left = triggerRect.right + scrollX - popupRect.width;
                    break;

                case 'auto':
                default:
                    // Автоматическое определение позиции с центрированием
                    left = triggerCenterX + scrollX;
                    transform = 'translateX(-50%)';

                    // Проверка выхода за правую границу viewport
                    if (triggerCenterX + popupHalfWidth > viewportWidth) {
                        left =
                            viewportWidth + scrollX - popupRect.width - VIEWPORT_EDGE_PADDING_LARGE;
                        transform = '';
                    }
                    // Проверка выхода за левую границу viewport
                    else if (triggerCenterX - popupHalfWidth < 0) {
                        left = scrollX + VIEWPORT_EDGE_PADDING_LARGE;
                        transform = '';
                    }
                    break;
            }

            // Дополнительная защита от выхода за границы viewport для всех режимов
            if (typeof left === 'number') {
                const leftInViewport = left - scrollX;

                if (leftInViewport + popupRect.width > viewportWidth) {
                    left = viewportWidth + scrollX - popupRect.width - VIEWPORT_EDGE_PADDING_SMALL;
                } else if (leftInViewport < 0) {
                    left = scrollX + VIEWPORT_EDGE_PADDING_SMALL;
                }
            }

            return { left, transform };
        },
        [position],
    );

    /**
     * Вычисление вертикальной позиции с умной адаптацией
     */
    const calculateVerticalPosition = useCallback(
        (
            triggerRect: DOMRect,
            popupRect: DOMRect,
            viewportHeight: number,
            scrollY: number,
        ): number => {
            let top: number;

            if (placement === 'bottom') {
                top = triggerRect.bottom + scrollY;

                // Проверка выхода за нижнюю границу viewport
                if (triggerRect.bottom + popupRect.height > viewportHeight) {
                    // Пробуем разместить сверху
                    const topPlacement = triggerRect.top + scrollY - popupRect.height;
                    if (triggerRect.top - popupRect.height >= 0) {
                        top = topPlacement;
                    } else {
                        // Если не помещается ни снизу, ни сверху - прижимаем к верху
                        top = scrollY + VIEWPORT_EDGE_PADDING_SMALL;
                    }
                }
            } else {
                top = triggerRect.top + scrollY - popupRect.height;

                // Проверка выхода за верхнюю границу viewport
                if (triggerRect.top - popupRect.height < 0) {
                    // Пробуем разместить снизу
                    const bottomPlacement = triggerRect.bottom + scrollY;
                    if (triggerRect.bottom + popupRect.height <= viewportHeight) {
                        top = bottomPlacement;
                    } else {
                        // Если не помещается - прижимаем к верху
                        top = scrollY + VIEWPORT_EDGE_PADDING_SMALL;
                    }
                }
            }

            return top;
        },
        [placement],
    );

    /**
     * Вычисление оптимальной позиции попапа
     * Мемоизировано для использования в эффектах
     */
    const calculatePosition = useCallback(
        (
            triggerRect: DOMRect,
            popupRect: DOMRect,
            viewportWidth: number,
            viewportHeight: number,
            scrollY: number,
            scrollX: number,
        ): PositionStyle => {
            // Горизонтальная позиция с защитой от выхода за края
            const { left, transform } = calculateHorizontalPosition(
                triggerRect,
                popupRect,
                viewportWidth,
                scrollX,
            );

            // Вертикальная позиция с умной адаптацией
            const top = calculateVerticalPosition(triggerRect, popupRect, viewportHeight, scrollY);

            return { top, left, right: 'auto', transform };
        },
        [calculateHorizontalPosition, calculateVerticalPosition],
    );

    /**
     * Функция обновления позиции попапа
     * Вызывается при открытии и resize
     */
    const updatePosition = useCallback(() => {
        if (!triggerRef.current || !popupRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // ВАЖНО: Берем ТЕКУЩИЙ scroll при каждом обновлении
        const { scrollY, scrollX } = getDocumentScroll();

        const newPosition = calculatePosition(
            triggerRect,
            popupRect,
            viewportWidth,
            viewportHeight,
            scrollY,
            scrollX,
        );

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
     * Синхронное обновление позиции при открытии
     * useLayoutEffect предотвращает мерцание, т.к. выполняется до отрисовки
     */
    useLayoutEffect(() => {
        if (!isOpen) return;

        // Немедленное обновление позиции
        updatePosition();
    }, [isOpen, updatePosition]);

    /**
     * Отслеживание resize окна для адаптивного позиционирования
     * Важно для мобильных устройств и изменения размера окна
     */
    useEffect(() => {
        if (!isOpen) return;

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
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [isOpen, updatePosition]);

    /**
     * Обработчик клика вне попапа для закрытия
     * Мемоизирован для стабильности подписки
     */
    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            const target = event.target as Node;

            // Проверяем, что клик произошел вне попапа и триггера
            const isClickedOutsidePopup = popupRef.current && !popupRef.current.contains(target);
            const isClickedOutsideTrigger =
                triggerRef.current && !triggerRef.current.contains(target);

            if (isClickedOutsidePopup && isClickedOutsideTrigger) {
                onClose();
            }
        },
        [onClose, triggerRef, popupRef],
    );

    /**
     * Подписка на клики вне попапа
     */
    useEffect(() => {
        if (!isOpen) return;

        // Используем capture phase для более раннего перехвата
        document.addEventListener('mousedown', handleClickOutside, true);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, [isOpen, handleClickOutside]);

    return { positionStyle };
};
