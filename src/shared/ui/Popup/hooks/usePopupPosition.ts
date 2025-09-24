import { useCallback, useEffect, useState } from 'react';

interface PositionStyle {
    top: number;
    left: number | 'auto';
    right: number | 'auto';
    transform: string;
}

interface UsePopupPositionProps {
    isOpen: boolean;
    onClose: () => void;
    triggerRef: React.RefObject<HTMLElement | null>;
    placement: 'bottom' | 'top';
    position: 'center' | 'left' | 'right' | 'auto' | 'start' | 'end';
    popupRef: React.RefObject<HTMLDivElement | null>;
}

export const usePopupPosition = ({
    isOpen,
    onClose,
    triggerRef,
    placement,
    position,
    popupRef,
}: UsePopupPositionProps) => {
    const [positionStyle, setPositionStyle] = useState<PositionStyle>({
        top: 0,
        left: 0 as number | 'auto',
        right: 'auto' as number | 'auto',
        transform: '',
    });

    // Вспомогательная функция для вычисления позиции
    const calculatePosition = useCallback(
        (triggerRect: DOMRect, popupRect: DOMRect, viewportWidth: number) => {
            let left: number | 'auto' = 0;
            const right: number | 'auto' = 'auto';
            let transform = '';

            switch (position) {
                case 'center':
                    left = triggerRect.left + triggerRect.width / 2 - popupRect.width / 2;
                    break;

                case 'left':
                    left = triggerRect.left;
                    break;

                case 'right':
                    left = triggerRect.right - popupRect.width;
                    break;

                case 'start':
                    left = triggerRect.left;
                    break;

                case 'end':
                    left = triggerRect.right - popupRect.width;
                    break;

                case 'auto':
                default:
                    left = triggerRect.left + triggerRect.width / 2 - popupRect.width / 2;

                    if (left + popupRect.width > viewportWidth) {
                        left = 'auto';
                        transform = '';
                    } else {
                        transform = 'translateX(-50%)';
                    }
                    break;
            }

            // Ограничиваем в пределах экрана (если не auto)
            if (position !== 'auto') {
                if (left !== 'auto' && left + popupRect.width > viewportWidth) {
                    left = viewportWidth - popupRect.width;
                }
            }

            const top =
                placement === 'bottom'
                    ? triggerRect.bottom + 8
                    : triggerRect.top - popupRect.height - 8;

            return { top, left, right, transform };
        },
        [placement, position],
    );

    // Обновляем позицию при открытии и изменении размеров
    useEffect(() => {
        if (!isOpen) return;

        const updatePosition = () => {
            if (!triggerRef.current || !popupRef.current) return;

            const triggerRect = triggerRef.current.getBoundingClientRect();
            const popupRect = popupRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            const newPosition = calculatePosition(triggerRect, popupRect, viewportWidth);

            setPositionStyle(newPosition);
        };

        const timer = setTimeout(updatePosition, 0);

        const handleResize = () => updatePosition();
        window.addEventListener('resize', handleResize);

        if (triggerRef.current && 'ResizeObserver' in window) {
            const observer = new ResizeObserver(updatePosition);
            observer.observe(triggerRef.current);
            return () => observer.disconnect();
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen, triggerRef, popupRef, calculatePosition]);

    // Закрытие при клике вне попапа
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, triggerRef, popupRef]);

    return { positionStyle };
};
