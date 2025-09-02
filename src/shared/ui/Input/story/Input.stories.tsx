import type { Meta, StoryObj } from "@storybook/nextjs"

import { Input } from "../ui/Input"
import { WidthContainer } from "../../../../../.storybook/decorators/WidthContainer/WidthContainer"

const meta = {
  title: "UI/Input",
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
  decorators: [WidthContainer],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: "Введите текст",
    fullWidth: false,
  },
}
