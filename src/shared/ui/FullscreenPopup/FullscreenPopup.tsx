'use client';

import React, { type FC, type ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './FullscreenPopup.module.scss';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    /** Клик по фону закрывает окно (по умолчанию true) */
    closeOnBackdrop?: boolean;
    /** Закрывать ли по ESC (по умолчанию true) */
    closeOnEsc?: boolean;
    /** aria-labelledby, если есть заголовок */
    labelledBy?: string;
    /** ID для aria-describedby */
    describedBy?: string;
    /** Доп. класс на корень */
    className?: string;
}

export const FullscreenPopup: FC<Props> = ({
    isOpen,
    onClose,
    children,
    closeOnBackdrop = true,
    closeOnEsc = true,
    labelledBy,
    describedBy,
    className,
}) => {
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const portalTarget = useMemo(() => {
        if (typeof document === 'undefined') return null;
        return document.body;
    }, []);

    // Блокируем скролл страницы при открытом попапе
    useEffect(() => {
        if (!isOpen) return;
        const prevOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = prevOverflow;
        };
    }, [isOpen]);

    // Закрытие по ESC
    useEffect(() => {
        if (!isOpen || !closeOnEsc) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                onClose();
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, closeOnEsc, onClose]);

    // Клик по фону
    const handleBackdropClick = useCallback(
        (e: React.MouseEvent) => {
            if (!closeOnBackdrop) return;
            if (e.target === overlayRef.current) onClose();
        },
        [closeOnBackdrop, onClose],
    );

    // Простая фокус-ловушка (по желанию)
    useEffect(() => {
        if (!isOpen) return;
        const prev = document.activeElement as HTMLElement | null;
        // попробуем сфокусировать контент
        contentRef.current?.focus();
        return () => {
            prev?.focus?.();
        };
    }, [isOpen]);

    if (!isOpen || !portalTarget) return null;

    return createPortal(
        <div
            ref={overlayRef}
            className={`${styles.overlay} ${className ?? ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
            onMouseDown={handleBackdropClick}
        >
            <div
                className={styles.content}
                ref={contentRef}
                tabIndex={-1}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <button
                    className={styles.closeBtn}
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>,
        portalTarget,
    );
};
