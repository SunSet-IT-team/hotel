import type { Meta, StoryObj } from "@storybook/nextjs"
import variables from "@/app/styles/_variables.module.scss"

import { Button } from "./Button"

const meta = {
  title: "Buttons",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Содержимое кнопки",
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

const decoratorContainer = [
  (Story: any) => (
    <div
      style={{
        width: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Story />
    </div>
  ),
]

export const Cyan: Story = {
  args: {
    variant: "cyan",
    children: "Текст кнопки",
  },
  decorators: decoratorContainer,
}

export const White: Story = {
  args: {
    variant: "white",
    children: "Текст кнопки",
  },
  decorators: decoratorContainer,
}

export const Glass: Story = {
  args: {
    variant: "glass",
    children: "Текст кнопки",
  },
  decorators: decoratorContainer,

  globals: {
    backgrounds: { value: "colorPrimaryBlue" },
  },

  parameters: {
    backgrounds: {
      options: {
        colorPrimaryBlue: { name: "cyan", value: variables.colorPrimaryBlue },
      },
    },
  },
}
