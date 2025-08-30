import type { Meta, StoryObj } from "@storybook/nextjs";
import { Select, SelectOption } from "../Select";
import styles from "./Select.stories.module.scss";

const meta = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
      description: "Массив опций для выбора",
    },
    onChange: {
      action: "changed",
      description: "Callback при изменении выбора",
    },
    className: {
      control: "text",
      description: "Дополнительные CSS классы для кастомизации",
    },
    width: {
      control: "text",
      description: "Кастомная ширина компонента (px, %, rem)",
    },
    height: {
      control: "text",
      description: "Кастомная высота компонента (px, %, rem)",
    },
  },
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof meta>;

const defaultOptions: SelectOption[] = [
  { value: "option1", label: "Цена за номер/ночь (без налогов и сборов)" },
  { value: "option2", label: "Цена за номер/ночь (вкл. налоги и сборы)" },
  { value: "option3", label: "Итого (в т.ч. налоги и сборы)" },
];

export const DefaultSizes: Story = {
  render: () => (
    <div className={styles.container}>
      <div className={styles.selectWrapper}>
        <h4 className={styles.selectTitle}>Десктоп размер (429×54px):</h4>
        <p className={styles.selectDescription}>
          Автоматически применяется на экранах больше 768px
        </p>
        <Select options={defaultOptions} />
      </div>

      <div className={styles.selectWrapper}>
        <h4 className={styles.selectTitle}>Мобильный размер (335×42.2px):</h4>
        <p className={styles.selectDescription}>
          Автоматически применяется на экранах меньше 768px
        </p>
        <div style={{ maxWidth: "335px" }}>
          <Select options={defaultOptions} />
        </div>
      </div>
    </div>
  ),
  args: {
    options: defaultOptions,
  },
};

export const Interactive: Story = {
  render: (args) => (
    <div className={styles.container}>
      <div className={styles.selectWrapper}>
        <h4 className={styles.selectTitle}>
          Select компонент с изменяемыми пропсами:
        </h4>
        <Select {...args} />
      </div>
    </div>
  ),
  args: {
    options: defaultOptions,
  },
};

export default meta;
