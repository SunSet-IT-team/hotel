"use client";

/**
 * Универсальный компонент выпадающего списка для выбора опций
 * Используется в фильтре для цены
 * Внутри используется Typography для отображения текста
 * @see Typography
 *  * Пропсы:
 * - options: SelectOption[] — список опций вида { value: string; label: string }.
 *            `value` должен быть уникальным и стабильным ключом.
 * - onChange?: (value: string) => void — колбэк, вызывается только при явном выборе пользователем.
 * - className?: string — дополнительный CSS-класс для корневого элемента.
 * на всякий добавил изменение размера , по дефоолту будут применяться размеры из макета
 *
 * - width?: number | string — ширина. Число трактуется как px (например, 240 → "240px"),
 *
 * - height?: number | string — высота кнопки по тем же правилам, что и width.
 */

import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { Typography } from "../Typography";
import styles from "./Select.module.scss";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  onChange?: (value: string) => void;
  className?: string;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}

export function Select({
  options,
  onChange,
  className,
  width,
  height,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const selectRef = useRef<HTMLDivElement>(null);

  const [isMobilde, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (options.length > 0 && !selectedValue) {
      setSelectedValue(options[0].value);
    }
  }, [options, selectedValue]);

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (optionValue: string) => {
    setSelectedValue(optionValue);

    if (onChange) {
      onChange(optionValue);
    }

    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (selectedOption) {
      return selectedOption.label;
    }

    return options[0]?.label || "";
  };

  if (options.length === 0) {
    return (
      <div
        ref={selectRef}
        className={`${styles.root} ${className || ""}`}
        style={{ width, height }}
      >
        <button type="button" className={styles.button} disabled={true}>
          <Typography variant="h3" color="dark" className={styles.label}>
            Нет доступных опций
          </Typography>
        </button>
      </div>
    );
  }

  return (
    <div
      ref={selectRef}
      className={`${styles.root} ${isOpen ? styles.open : ""} ${className || ""}`}
      style={{ width, height }}
    >
      <button
        type="button"
        className={styles.button}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Typography
          variant={isMobilde ? "h2" : "h3"}
          color="dark"
          truncate={true}
          className={styles.label}
        >
          {getDisplayText()}
        </Typography>
        <Image
          src="/icons/select-arrow-icon.svg"
          alt="Выбрать"
          width={12}
          height={8}
          className={styles.arrow}
        />
      </button>

      {isOpen && (
        <ul className={styles.list} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${
                selectedValue === option.value ? styles.optionSelected : ""
              }`}
              onClick={() => handleOptionSelect(option.value)}
              role="option"
              aria-selected={selectedValue === option.value}
            >
              <Typography
                variant={isMobilde ? "h2" : "h3"}
                color={selectedValue === option.value ? "dark" : "blue"}
              >
                {option.label}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
