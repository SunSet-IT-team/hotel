import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useEffect, useState } from 'react';

import { Counter } from '../Counter';
import styles from './Counter.stories.module.scss';

type CounterProps = React.ComponentProps<typeof Counter>;

const meta = {
    title: 'UI/Counter',
    component: Counter,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Интерактивный счетчик с возможностью изменения всех параметров в реальном времени. Используйте панель Controls для изменения пропсов.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'number' },
            description: 'Текущее значение счетчика',
            table: { type: { summary: 'number' }, defaultValue: { summary: '0' } },
        },
        min: {
            control: { type: 'number' },
            description: 'Минимальное значение',
            table: { type: { summary: 'number' }, defaultValue: { summary: '0' } },
        },
        max: {
            control: { type: 'number' },
            description: 'Максимальное значение',
            table: { type: { summary: 'number' }, defaultValue: { summary: '100' } },
        },
        step: {
            control: { type: 'number', step: 0.1 },
            description: 'Шаг изменения',
            table: { type: { summary: 'number' }, defaultValue: { summary: '1' } },
        },
        className: {
            control: { type: 'text' },
            description: 'Дополнительные CSS классы',
            table: { type: { summary: 'string' } },
        },
        onChange: {
            action: 'changed',
            control: false,
            description: 'Колбэк изменения значения',
            table: { type: { summary: '(value: number) => void' } },
        },
    },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Обёртка: управляем value внутри, onChange берём свой
type InteractiveArgs = Partial<Omit<CounterProps, 'onChange'>>;

const InteractiveCounter: React.FC<InteractiveArgs> = (args) => {
    const [value, setValue] = useState<number>(args.value ?? 0);

    useEffect(() => {
        setValue(args.value ?? 0);
    }, [args.value]);

    return (
        <div className={styles.interactiveContainer}>
            <div className={styles.valueDisplay}>
                <h3 className={styles.valueTitle}>Текущее значение:</h3>
                <div className={styles.valueNumber}>{value}</div>
            </div>

            <Counter
                value={value}
                onChange={setValue}
                min={args.min}
                max={args.max}
                step={args.step}
                className={args.className}
            />

            <div className={styles.paramsInfo}>
                <div className={styles.paramItem}>Min: {args.min}</div>
                <div className={styles.paramItem}>Max: {args.max}</div>
                <div className={styles.paramItem}>Step: {args.step}</div>
            </div>
        </div>
    );
};

export const Interactive: Story = {
    render: (args) => {
        const { onChange: _omit, ...rest } = args as CounterProps;
        return <InteractiveCounter {...rest} />;
    },
    args: {
        value: 5,
        min: 0,
        max: 20,
        step: 1,
        className: '',
        onChange: () => {},
    } satisfies Partial<CounterProps>,
    parameters: {
        docs: {
            description: {
                story: 'Интерактивная Story для компонента Counter. Используйте панель Controls справа для изменения всех параметров компонента в реальном времени.',
            },
        },
    },
};
