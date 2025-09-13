import { Typography } from '@/shared/ui';
import { Accordion } from '@/shared/ui/Accordion';
import React from 'react';
import s from './FaqSection.module.scss';

type FaqItem = {
    id: string;
    question: string;
    answer: string | string[];
};

const FAQ_STUBS: FaqItem[] = [
    {
        id: 'q1',
        question: 'Как устроен наш сайт?',
        answer: 'Заглушка: краткое описание работы сервиса. Здесь позже появится подробный ответ.',
    },
    {
        id: 'q2',
        question: 'Можно ли забронировать отель?',
        answer: 'Заглушка: да, но детали и ограничения будут добавлены позже ответственным редактором.',
    },
    {
        id: 'q3',
        question: 'Как найти самый дешевый авиабилет?',
        answer: [
            'Искать авиабилеты на нашем сайте очень просто. Каждый месяц более 100 миллионов опытных путешественников заходят на наш сайт и в приложение, чтобы найти дешевые авиабилеты, отели и прокат автомобилей. Рассказываем, как получить максимальную пользу от нашего сервиса.',
            'У нас очень просто найти самый быстрый перелет, рейс любимой авиакомпании или идеальный номер. Читайте отзывы настоящих путешественников, выбирайте агентства и отели с высоким рейтингом, бронируйте без комиссий.',
        ],
    },
    {
        id: 'q4',
        question: 'Что значат звезды у отеля?',
        answer: 'Заглушка: это условная классификация удобств. Точная расшифровка будет позже.',
    },
    {
        id: 'q5',
        question: 'Куда сейчас стоит поехать?',
        answer: 'Заглушка: подборка направлений готовится редакцией. Информация обновится в ближайшее время.',
    },
    {
        id: 'q6',
        question: 'Как найти хороший отель?',
        answer: 'Заглушка: обращайте внимание на рейтинг и отзывы. Подробности появятся позже.',
    },
];

export const FaqSection = () => {
    return (
        <section className={s.section}>
            <div className={s.grid}>
                <Typography as="h2" variant="h1" color="blue" className={s.title}>
                    Ответы на часто задаваемые вопросы
                </Typography>
                {FAQ_STUBS.map((item) => (
                    <div className={s.cell} key={item.id}>
                        <Accordion title={item.question} className={s.accord}>
                            {Array.isArray(item.answer)
                                ? item.answer.map((text, idx) => (
                                      <React.Fragment key={idx}>{text}</React.Fragment>
                                  ))
                                : item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>
        </section>
    );
};
