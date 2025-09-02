import clsx from 'clsx'
import type { CSSProperties, FC, ReactNode } from 'react'
import styles from './Box.module.scss'

interface BoxProps {
  /** Содержимое блока */
  children: ReactNode;
  
  /** Дополнительные CSS классы */
  className?: string;
  
  /** Отступ сверху в пикселях */
  paddingTop?: number;
  
  /** Отступ справа в пикселях */
  paddingRight?: number;
  
  /** Отступ снизу в пикселях */
  paddingBottom?: number;
  
  /** Отступ слева в пикселях */
  paddingLeft?: number;
}

export const Box: FC<BoxProps> = ({ 
  children, 
  className,
  paddingTop = 16,
  paddingRight = 8,
  paddingBottom = 16,
  paddingLeft = 8
}) => {
  const boxStyle: CSSProperties = {
    paddingTop: `${paddingTop}px`,
    paddingRight: `${paddingRight}px`,
    paddingBottom: `${paddingBottom}px`,
    paddingLeft: `${paddingLeft}px`,
  }

  const boxClasses = clsx(
    styles.box,
    className
  )

  return (
    <div className={boxClasses} style={boxStyle}>
      {children}
    </div>
  )
}
