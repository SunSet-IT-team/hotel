import type { Meta, StoryObj } from '@storybook/nextjs'
import { Typography } from './Typography'

const meta: Meta<typeof Typography> = {
  title: 'Shared/Typography',
  component: Typography,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1','h2','h3','h4','h5','p','span'],
    },
    as: {
      control: 'select',
      options: ['h1','h2','h3','h4','h5','h6','p','span','div','label','li'],
    },
    align: {
      control: 'inline-radio',
      options: ['left','center','right','justify','inherit'],
    },
    color: {
      control: 'inline-radio',
      options: ['dark','blue','white'],
    },
    truncate: { control: 'boolean' },
    className: { control: false },
    children: { control: 'text' },
  },
  args: {
    variant: 'p',
    as: 'p',
    align: 'inherit',
    color: 'dark',
    truncate: false,
    children: 'Sample typography text',
  },
};
export default meta;

type Story = StoryObj<typeof Typography>;


export const Playground: Story = {};

/** Заголовки по вариантам */
export const Headings: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Typography variant="h1" color='blue'>Заголовок H1</Typography>
      <Typography variant="h2" color='dark'>Заголовок H2</Typography>
      <Typography variant="h3" color='white'>Заголовок H3</Typography>
      <Typography variant="h4" color='blue'>Заголовок H4</Typography>
      <Typography variant="h5">Заголовок H5</Typography>
    </div>
  ),
};

/** Цвета */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, background: 'var(--background)', padding: 16 }}>
      <Typography color="dark">Текст цветом dark</Typography>
      <Typography color="blue">Текст цветом blue</Typography>
      <div style={{ background: 'var(--color-primary-blue)', padding: 8 }}>
        <Typography color="white">Текст поверх цветного фона (white)</Typography>
      </div>
    </div>
  ),
};

/** Выравнивание */
export const Alignments: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, width: 420 }}>
      <Typography align="left">Left</Typography>
      <Typography align="center">Center</Typography>
      <Typography align="right">Right</Typography>
      <Typography align="justify">
        Justify: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra.
      </Typography>
    </div>
  ),
};


/** Обрезка в одну строку (truncate) */
export const Truncate: Story = {
  render: () => (
    <div style={{ width: 220, border: '1px dashed #ccc', padding: 6 }}>
      <Typography truncate>
        Очень длинный текст, который не помещается в одну строку и должен обрезаться троеточием
      </Typography>
    </div>
  ),
};
