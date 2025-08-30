import type { Meta, StoryObj } from "@storybook/nextjs";
import styles from "./Input.stories.module.scss";

import { Input } from "../ui/Input";

const meta = {
  title: "UI/Inputs",
  component: Input,
  parameters: {
    layout: "fullscreen",
    controls: { sort: "requiredFirst" },
  },
  argTypes: {
    placeholder: {
      control: {
        type: "text",
      },
      description: "Содержимое инпута",
    },
  },
  decorators: [
    (Story) => (
      <div className={styles.storyDecorator}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Введите текст",
    fullWidth: false,
  },
};
