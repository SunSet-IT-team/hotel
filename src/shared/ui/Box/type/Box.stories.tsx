import type { Meta, StoryObj } from '@storybook/nextjs'
import { Box } from '../Box'

const meta: Meta<typeof Box> = {
  title: 'UI/Box',
  component: Box,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Содержимое компонента',
    },
    paddingTop: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Отступ сверху в пикселях (по умолчанию: 16)',
    },
    paddingRight: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Отступ справа в пикселях (по умолчанию: 8)',
    },
    paddingBottom: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Отступ снизу в пикселях (по умолчанию: 16)',
    },
    paddingLeft: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Отступ слева в пикселях (по умолчанию: 8)',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Интерактивный демонстратор Box компонента
export const InteractiveDemo: Story = {
  args: {
    children: 'Это интерактивный демонстратор Box компонента. Измените значения отступов в Controls справа, чтобы увидеть, как меняется внешний вид компонента. Значения по умолчанию: paddingTop=16, paddingRight=8, paddingBottom=16, paddingLeft=8',
  },
  // Не указываем значения padding в args, чтобы использовались значения по умолчанию
}

