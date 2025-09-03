"use client";

import { ButtonHTMLAttributes, CSSProperties, FC, ReactNode } from "react";

import styles from "./Button.module.scss";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Вариация кнопки
   */
  variant?: "cyan" | "white" | "glass";

  /**
   * Размер кнопки (влияет на внутренние отступы и размер шрифта)
   */
  size?: "small" | "medium" | "big";

  /**
   * Растягивать ли компонент на всю ширину родителя
   */
  fullWidth?: boolean;

  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

/**
 * Компонент кнопки UI-кита
 */
export const Button: FC<Props> = ({
  variant = "cyan",
  size = "medium",
  fullWidth = false,
  children,
  iconLeft,
  iconRight,
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        styles.root,
        styles[variant],
        styles[size],
        {
          [styles.fullWidth]: fullWidth,
        },
        className
      )}
      {...rest}
    >
      {iconLeft && iconLeft}
      {children}
      {iconRight && iconRight}
    </button>
  );
};
