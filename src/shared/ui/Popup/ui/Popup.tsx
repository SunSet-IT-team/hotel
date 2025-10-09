'use client';

import React, {
    forwardRef,
    type ReactNode,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import { Container } from '../../Container';
import { usePopupPosition } from '../hooks/usePopupPosition';

import styles from './Popup.module.scss';

/**
 * Доступные позиции выравнивания попапа относительно триггера
 */
type Position = 'center' | 'left' | 'right' | 'auto' | 'start' | 'end';

/**
 * Доступные размещения попапа относительно триггера
 *
 * Можно разместить сверху или снизу
 */
type Placement = 'bottom' | 'top';

/**
 * Свойства компонента Popup
 */
interface Props {
    /** Содержимое попапа */
    children: ReactNode;

    /** Флаг отображения попапа */
    isOpen: boolean;

    /** Обработчик закрытия попапа */
    onClose: () => void;

    /** Ссылка на элемент-триггер, относительно которого позиционируется попап */
    triggerRef: React.RefObject<HTMLElement | null>;

    /**
     * Размещение попапа относительно триггера
     * @default 'bottom'
     */
    placement?: Placement;

    /**
     * Горизонтальное выравнивание попапа
     * @default 'auto'
     */
    position?: Position;

    /**
     * Использовать ли обертку Container для содержимого
     * @default false
     */
    isUseContainer?: boolean;

    /**
     * Растягивать ли попап на ширину триггера
     * @default false
     */
    matchTriggerWidth?: boolean;

    /** Дополнительные CSS классы */
    className?: string;

    /**
     * Контейнер для портала
     * @default document.body
     */
    portalContainer?: HTMLElement | null;

    /**
     * ID элемента для aria-labelledby (связывание с заголовком)
     */
    labelledBy?: string;

    /**
     * Отключить закрытие по Escape
     * @default false
     */
    disableEscapeKeyDown?: boolean;
}

/**
 * Универсальный компонент всплывающего окна (Popup/Dropdown)
 *
 * @description
 * Рендерится через React Portal для избежания проблем с z-index и overflow.
 * Автоматически позиционируется относительно элемента-триггера.
 *
 * @features
 * - Портальный рендеринг в document.body (или кастомный контейнер)
 * - Автоматическое позиционирование с учетом viewport
 * - Синхронизация ширины с триггером (опционально)
 * - Закрытие по Escape
 * - Отслеживание изменения размеров триггера через ResizeObserver
 * - A11y: role="dialog", aria-modal, aria-labelledby
 *
 * @example
 * ```tsx
 * const triggerRef = useRef<HTMLButtonElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <button ref={triggerRef} onClick={() => setIsOpen(true)}>
 *   Открыть
 * </button>
 * <Popup
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   triggerRef={triggerRef}
 *   placement="bottom"
 *   position="left"
 * >
 *   Содержимое попапа
 * </Popup>
 * ```
 */
export const Popup = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            isOpen,
            onClose,
            triggerRef,
            placement = 'bottom',
            position = 'auto',

            isUseContainer = false,
            matchTriggerWidth = false,
            disableEscapeKeyDown = false,

            className,
            portalContainer,
            labelledBy,
        },
        forwardedRef,
    ) => {
        // Внутренняя ссылка на DOM-элемент попапа
        const popupRef = useRef<HTMLDivElement | null>(null);

        // Ширина элемента-триггера для синхронизации
        const [triggerWidth, setTriggerWidth] = useState<number | null>(null);

        // Ссылки на асинхронные операции для очистки
        const rafRef = useRef<number | null>(null);
        const observerRef = useRef<ResizeObserver | null>(null);

        /**
         * Синхронизация внутреннего и внешнего ref
         * Позволяет родительскому компоненту получить доступ к DOM-элементу
         */
        useEffect(() => {
            if (!forwardedRef) return;

            if (typeof forwardedRef === 'function') {
                forwardedRef(popupRef.current);
            } else {
                forwardedRef.current = popupRef.current;
            }
        }, [forwardedRef]);

        /**
         * Получение стилей позиционирования из кастомного хука
         */
        const { positionStyle } = usePopupPosition({
            isOpen,
            onClose,
            triggerRef,
            placement,
            position,
            popupRef,
        });

        /**
         * Мемоизированный контейнер для портала
         * Fallback на document.body если не передан явно
         */
        const portalTarget = useMemo(() => {
            if (typeof document === 'undefined') return null;
            return portalContainer ?? document.body;
        }, [portalContainer]);

        /**
         * Обновление ширины триггера
         * Мемоизировано для использования в ResizeObserver
         */
        const updateTriggerWidth = useCallback(() => {
            if (!triggerRef?.current || !matchTriggerWidth) return;

            const rect = triggerRef.current.getBoundingClientRect();
            const newWidth = Math.round(rect.width);

            setTriggerWidth((prev) => (prev === newWidth ? prev : newWidth));
        }, [triggerRef, matchTriggerWidth]);

        /**
         * Отслеживание изменений размеров триггера
         * Используется ResizeObserver + RAF для оптимизации
         */
        useLayoutEffect(() => {
            if (!isOpen || !triggerRef?.current || !matchTriggerWidth) {
                return;
            }

            // Инициализация начальной ширины
            updateTriggerWidth();

            // Создание ResizeObserver
            if (!observerRef.current) {
                observerRef.current = new ResizeObserver(() => {
                    if (rafRef.current) {
                        cancelAnimationFrame(rafRef.current);
                    }
                    rafRef.current = requestAnimationFrame(updateTriggerWidth);
                });
            }

            const currentTrigger = triggerRef.current;
            observerRef.current.observe(currentTrigger);

            return () => {
                if (observerRef.current && currentTrigger) {
                    try {
                        observerRef.current.unobserve(currentTrigger);
                    } catch {
                        // Игнорируем ошибку
                    }
                }

                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current);
                    rafRef.current = null;
                }
            };
        }, [isOpen, triggerRef, matchTriggerWidth, updateTriggerWidth]);

        /**
         * Обработчик закрытия по клавише Escape
         * Мемоизирован для стабильности подписки
         */
        const handleEscapeKey = useCallback(
            (e: KeyboardEvent) => {
                if (e.key === 'Escape' && !disableEscapeKeyDown) {
                    e.stopPropagation();
                    onClose();
                }
            },
            [disableEscapeKeyDown, onClose],
        );

        /**
         * Подписка на события клавиатуры (Escape)
         */
        useEffect(() => {
            if (!isOpen) return;

            document.addEventListener('keydown', handleEscapeKey);
            return () => document.removeEventListener('keydown', handleEscapeKey);
        }, [isOpen, handleEscapeKey]);

        /**
         * Вычисление финальных inline-стилей
         * Объединяет позиционирование, ширину и оптимизации производительности
         */
        const inlineStyle = useMemo<React.CSSProperties>(() => {
            const style: React.CSSProperties = {};

            // Применение стилей позиционирования из хука
            if (positionStyle) {
                if (positionStyle.top !== undefined) style.top = positionStyle.top;
                if (positionStyle.left !== undefined) style.left = positionStyle.left;
                if (positionStyle.right !== undefined) style.right = positionStyle.right;
                if (positionStyle.transform !== undefined) {
                    style.transform = positionStyle.transform;
                }
            }

            // Синхронизация ширины с триггером
            if (matchTriggerWidth && triggerWidth) {
                style.width = `${triggerWidth}px`;
            }

            return style;
        }, [positionStyle, matchTriggerWidth, triggerWidth]);

        /**
         * Финальные стили с учетом готовности позиционирования
         * Скрывает попап до готовности для предотвращения мерцания
         */
        const combinedStyle = useMemo<React.CSSProperties>(() => {
            return {
                ...inlineStyle,
                visibility: 'visible',
                pointerEvents: 'auto',
                opacity: 1,
            };
        }, [inlineStyle]);

        /**
         * Обработчик клика по попапу
         * Предотвращает всплытие для защиты от случайного закрытия
         */
        const handlePopupClick = useCallback((e: React.MouseEvent) => {
            e.stopPropagation();
        }, []);

        // Early returns для оптимизации
        if (!isOpen) return null;
        if (!portalTarget) return null;

        return createPortal(
            <div
                ref={popupRef}
                className={clsx(styles.root, className)}
                style={combinedStyle}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                data-placement={placement}
                data-position={position}
                onClick={handlePopupClick}
            >
                {isUseContainer ? <Container variant="header">{children}</Container> : children}
            </div>,
            portalTarget,
        );
    },
);

Popup.displayName = 'Popup';
