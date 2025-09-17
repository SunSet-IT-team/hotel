import type { Meta, StoryObj } from '@storybook/nextjs';

import { Typography } from '../ui/Typography';
import styles from './Typography.stories.module.scss';

const meta: Meta<typeof Typography> = {
    title: 'UI/Typography',
    component: Typography,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Универсальный типографический компонент для текста с настраиваемыми стилями, цветами и выравниванием.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'span'],
            description: 'Визуальный стиль текста',
            table: {
                type: { summary: 'Variant' },
                defaultValue: { summary: 'p' },
            },
        },
        as: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
            description: 'HTML-тег для рендеринга',
            table: {
                type: { summary: 'As' },
                defaultValue: { summary: 'p' },
            },
        },
        color: {
            control: 'inline-radio',
            options: ['dark', 'blue', 'white'],
            description: 'Цвет текста',
            table: {
                type: { summary: 'Color' },
                defaultValue: { summary: 'dark' },
            },
        },
        truncate: {
            control: 'boolean',
            description: 'Обрезка текста с многоточием',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        children: {
            control: 'text',
            description: 'Содержимое текста',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
        className: {
            control: false,
            description: 'Дополнительные CSS-классы',
            table: {
                type: { summary: 'string' },
            },
        },
    },
    args: {
        variant: 'p',
        as: 'p',
        color: 'dark',
        truncate: false,
        children: 'Sample typography text',
    },
};
export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
    render: () => (
        <div className={styles.container}>
            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Заголовки</h3>
                <div className={styles.headingsGrid}>
                    <Typography variant="h1" color="blue">
                        Заголовок H1
                    </Typography>
                    <Typography variant="h2" color="dark">
                        Заголовок H2
                    </Typography>
                    <div className={styles.darkBackground}>
                        <Typography variant="h3" color="white">
                            Заголовок H3
                        </Typography>
                    </div>
                    <Typography variant="h4" color="blue">
                        Заголовок H4
                    </Typography>
                    <Typography variant="h5">Заголовок H5</Typography>
                </div>
            </section>

            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Цвета</h3>
                <div className={styles.colorsContainer}>
                    <Typography color="dark">Текст цветом dark</Typography>
                    <Typography color="blue">Текст цветом blue</Typography>
                    <div className={styles.colorBackground}>
                        <Typography color="white">Текст поверх цветного фона (white)</Typography>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Выравнивание</h3>
                <div className={styles.alignmentsContainer}>
                    <Typography>Left выравнивание</Typography>
                    <Typography>Center выравнивание</Typography>
                    <Typography>Right выравнивание</Typography>
                    <Typography>
                        Justify выравнивание: Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Curabitur viverra.
                    </Typography>
                </div>
            </section>

            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Обрезка текста</h3>
                <div className={styles.truncateContainer}>
                    <Typography truncate>
                        Очень длинный текст, который не помещается в одну строку и должен обрезаться
                        троеточием
                    </Typography>
                </div>
            </section>

            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Разные HTML-теги</h3>
                <div className={styles.tagsGrid}>
                    <Typography as="h1" variant="h1" color="blue">
                        H1 тег
                    </Typography>
                    <Typography as="p" variant="p">
                        P тег
                    </Typography>
                    <Typography as="span" variant="span" color="blue">
                        Span тег
                    </Typography>
                    <Typography as="h6" variant="p" color="dark">
                        H6 тег
                    </Typography>
                </div>
            </section>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Демонстрация различных вариантов использования компонента Typography с разными пропсами.',
            },
        },
    },
};

export const Interactive: Story = {
    args: {
        variant: 'p',
        as: 'p',
        color: 'dark',
        truncate: false,
        children:
            'Это интерактивный пример Typography. Измените пропсы в панели Controls, чтобы увидеть, как меняется компонент.',
    },
    parameters: {
        docs: {
            description: {
                story: 'Интерактивный пример компонента Typography. Используйте панель Controls для изменения пропсов и наблюдения за изменениями в реальном времени.',
            },
        },
    },
};
