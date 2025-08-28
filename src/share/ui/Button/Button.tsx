"use client"

import { ButtonHTMLAttributes, FC } from "react"

import styles from "./Button.module.scss"
import clsx from "clsx"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "cyan" | "white" | "glass"
  fullWidth?: boolean
}

export const Button: FC<Props> = ({
  variant = "outlined",
  fullWidth = false,
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        styles.root,
        {
          [styles.cyan]: variant === "cyan",
          [styles.white]: variant === "white",
          [styles.glass]: variant === "glass",

          [styles.fullWidth]: fullWidth,
        },
        className || ""
      )}
      {...rest}
    ></button>
  )
}
