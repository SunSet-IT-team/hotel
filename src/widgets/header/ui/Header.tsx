"use client"

import clsx from "clsx"
import { FC, ReactNode } from "react"
import Image from "next/image"

import { LogoIcon } from "@/shared/assets/img/LogoIcon"
import { Typography } from "@/shared/ui"

import headerBg from "@/shared/assets/img/header-bg.png"

import styles from "./Header.module.scss"

interface HeaderProps {
  /** Вариация заднего фона хедера с картинкой/ */
  variant?: "withSolidBg" | "withBgImage"

  /** CSS-классы для изменения стилей компонента */
  className?: string

  /** Контент в хедере, располагающийся чуть ниже основоного */
  children?: ReactNode
}

/** Компонент шапки сайта */
export const Header: FC<HeaderProps> = ({
  className,
  variant = "withSolidBg",
  children,
}) => {
  return (
    <header className={clsx(styles.root, className, styles[variant])}>
      {variant === "withBgImage" && (
        <div className={styles.background}>
          <Image src={headerBg} alt="trevel background" />
        </div>
      )}
      <div className={clsx("container", styles.main)}>
        <LogoIcon />
        <ChangeLaguageMenu />
      </div>
      <div className={clsx("container", styles.content)}>{children}</div>
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
