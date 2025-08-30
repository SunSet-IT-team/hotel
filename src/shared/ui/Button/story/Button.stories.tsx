import type { Meta, StoryObj } from "@storybook/nextjs";
import styles from "./Button.stories.module.scss";

import { Button } from "../ui/Button";

const meta = {
  title: "UI/Buttons",
  component: Button,
  parameters: {
    layout: "fullscreen",
    controls: { sort: "requiredFirst" },
  },
  argTypes: {
    children: {
      control: {
        type: "text",
      },
      description: "Содержимое кнопки",
    },
  },
  decorators: [
    (Story) => (
      <div className={styles.storyDecorator}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

const Template: Story = {
  args: {
    children: "Текст кнопки",
    fullWidth: false,
    size: "medium",
  },
};

export const Cyan: Story = {
  args: {
    ...Template.args,
    variant: "cyan",
  },
};

export const White: Story = {
  args: {
    ...Template.args,
    variant: "white",
  },
};

export const Glass: Story = {
  args: {
    ...Template.args,
    variant: "glass",
  },

  globals: {
    backgrounds: { value: "cyan" },
  },
};
