"use client";

import { Button } from "@/shared/ui/Button"
import { Typography } from "@/shared/ui/Typography"; // ← типографика
import { useEffect, useState } from "react"
import styles from "./BookingButtons.module.scss"

type Item = { label: string; href: string };

const items: Item[] = [
  { label: "Бронирование автомобилей", href: "https://example.com/cars" },
  { label: "Бронирование авиарейсов", href: "https://example.com/flights" },
  { label: "Бронирование туров", href: "https://example.com/tours" },
  { label: "Бронирование e-sim", href: "https://example.com/esim" },
];

export const BookingButtons = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const variant = isMobile ? "white" : "cyan";
  const textColor = isMobile ? "dark" : "white";

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkReset}
              aria-label={it.label}
            >
              <Button variant={variant} size="medium" className={styles.button}>
                <Typography
                  as="h2"
                  variant="h2"
                  color={textColor}
                  align="center"
                  className={styles.btnText}
                >
                  {it.label}
                </Typography>
              </Button>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
