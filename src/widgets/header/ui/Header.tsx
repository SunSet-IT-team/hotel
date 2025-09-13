"use client"

import clsx from "clsx"
import { FC } from "react"

import { LogoIcon } from "@/shared/assets/img/LogoIcon"
import { Typography } from "@/shared/ui"

import styles from "./Header.module.scss"

interface HeaderProps {
  /** Вариация заднего фона хедера с картинкой/ */
  variant?: "withSolidBg" | "transparent"

  /** CSS-классы для изменения стилей компонента */
  className?: string
}

/** Компонент шапки сайта */
export const Header: FC<HeaderProps> = ({
  className,
  variant = "transparent",
}) => {
  return (
    <header className={clsx(styles.root, styles[variant], className)}>
      <div className={clsx("container", styles.main)}>
        <LogoIcon />
        <ChangeLaguageMenu />
      </div>
    </header>
  )
}

// @TODO: В дальнейшем реализовываем фичу менюшки с выбором языков
const ChangeLaguageMenu = () => {
  return (
    <Typography color="white" className={styles.langMenu}>
      RU/EN
    </Typography>
  )
}
