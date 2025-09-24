'use client';

import { type FC, type ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Container } from '../../Container';
import { usePopupPosition } from '../hooks/usePopupPosition';

import styles from './Popup.module.scss';

type Position = 'center' | 'left' | 'right' | 'auto' | 'start' | 'end';

interface PopupProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    triggerRef: React.RefObject<HTMLElement | null>;
    viewMargin?: number | { start: number; end: number };
    placement?: 'bottom' | 'top';
    position?: Position;
}

export const Popup: FC<PopupProps> = ({
    children,
    isOpen,
    onClose,
    triggerRef,
    viewMargin = 8,
    placement = 'bottom',
    position = 'auto',
}) => {
    const popupRef = useRef<HTMLDivElement>(null);

    const { positionStyle } = usePopupPosition({
        isOpen,
        onClose,
        triggerRef,
        placement,
        position,
        popupRef,
    });

    if (!isOpen) return null;

    return createPortal(
        <div
            ref={popupRef}
            className={styles.root}
            style={{
                top: positionStyle.top,
                left: positionStyle.left,
                right: positionStyle.right,
                transform: positionStyle.transform,
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <Container variant="header">{children}</Container>
        </div>,
        document.body,
    );
};
