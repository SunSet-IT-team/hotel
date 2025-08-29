import type { Meta, StoryObj } from '@storybook/nextjs'
import { Select, SelectOption } from '../Select'
import styles from './Select.stories.module.scss'

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: { 
      control: 'object',
      description: 'Массив опций для выбора'
    },
    onChange: { 
      action: 'changed',
      description: 'Callback при изменении выбора'
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы для кастомизации'
    },
    width: {
      control: 'text',
      description: 'Кастомная ширина компонента (px, %, rem)'
    },
    height: {
      control: 'text',
      description: 'Кастомная высота компонента (px, %, rem)'
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
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
        <div style={{ maxWidth: '335px' }}>
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
        <h4 className={styles.selectTitle}>Select компонент с изменяемыми пропсами:</h4>
        <Select {...args} />
      </div>
      
      <div className={styles.selectWrapper}>
        <h4 className={styles.selectTitle}>Примеры с кастомными размерами:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <p><strong>Ширина 300px:</strong></p>
            <Select options={args.options} width={300} />
          </div>
          <div>
            <p><strong>Ширина 100%:</strong></p>
            <Select options={args.options} width="100%" />
          </div>
          <div>
            <p><strong>Высота 60px:</strong></p>
            <Select options={args.options} height={60} />
          </div>
          <div>
            <p><strong>Кастомные размеры (400×70px):</strong></p>
            <Select options={args.options} width={400} height={70} />
          </div>
          <div>
            <p><strong>Маленький размер (200×40px):</strong></p>
            <Select options={args.options} width={200} height={40} />
          </div>
          <div>
            <p><strong>Большой размер (600×80px):</strong></p>
            <Select options={args.options} width={600} height={80} />
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    options: defaultOptions,
  },
};
