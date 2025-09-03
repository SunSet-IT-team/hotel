"use client";

import React, { CSSProperties, FC, ReactNode, useState } from "react";
import { Button } from "../Button";
import { Typography } from "../Typography";

export type Option = {
  title: string;
};

export type RangeListProps = {
  options: Option[];
  width?: CSSProperties["width"];
  multiple?: boolean;
  iconLeft?: undefined | ReactNode;
  iconRight?: undefined | ReactNode;
  onChange?: (values: string[]) => void;
};

export const RangeList: FC<RangeListProps> = ({
  options,
  width = "100%",
  multiple = true,
  onChange,
  iconLeft,
  iconRight,
}) => {
  const [isActiveOptions, setIsActiveOptions] = useState<string[]>([]);

  const handleClick = (value: string) => {
    setIsActiveOptions((prev) => {
      let next: string[];

      if (multiple) {
        if (prev.includes(value)) {
          next = prev.filter((v) => v !== value);
        } else {
          next = [...prev, value];
        }
      } else {
        next = [value];
      }

      onChange?.(next);
      return next;
    });
  };

  return (
    <div
      style={{
        width,
        padding: "10px",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {options.map((option) => {
        const active = isActiveOptions.includes(option.title);

        return (
          <Button
            key={option.title}
            variant={active ? "cyan" : "glass"}
            size="small"
            style={{ color: "#000" }}
            fullWidth
            onClick={() => handleClick(option.title)}
            iconRight={iconRight}
            iconLeft={iconLeft}
          >
            <Typography variant="span" align="left">
              {option.title}
            </Typography>
          </Button>
        );
      })}
    </div>
  );
};
