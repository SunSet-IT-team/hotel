'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectValues, setAdults, setChildren } from '@/features/search-form';
import { Button, Counter, Typography } from '@/shared/ui';
import { Box } from '@/shared/ui/Box/ui/Box';

import s from './GuestsField.module.scss';

export const GuestsField = () => {
    const { adults, children } = useSelector(selectValues);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [applied, setApplied] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const label = !applied ? 'Кол-во гостей' : `${adults} взрос. ${children} реб.`;
    const borderRadius = isMobile ? '12px' : '24px';

    return (
        <div className={s.root}>
            <Button
                type="button"
                variant="white"
                size="big"
                className={s.trigger}
                onClick={() => setOpen((v) => !v)}
                style={{ borderRadius }}
            >
                <Typography as="span" variant="h2" color="dark">
                    {label}
                </Typography>
            </Button>

            {open && (
                <Box
                    as="div"
                    paddingLeft={isMobile ? 30 : 25}
                    paddingRight={isMobile ? 19 : 25}
                    paddingTop={isMobile ? 22 : 19}
                    paddingBottom={isMobile ? 14 : 19}
                    className={s.panel}
                >
                    <div className={s.row}>
                        <div className={s.title}>
                            <Typography className={s.mobileSize} as="h5" variant="h2" color="blue">
                                Взрослые
                            </Typography>
                            <Typography as="p" variant={isMobile ? 'h2' : 'h3'} color="dark">
                                18 лет и старше
                            </Typography>
                        </div>
                        <Counter
                            value={adults}
                            onChange={(v) => {
                                dispatch(setAdults(v));
                            }}
                            min={1}
                            max={10}
                            className={s.count}
                        />
                    </div>

                    <div className={s.row}>
                        <div className={s.title}>
                            <Typography className={s.mobileSize} as="h5" variant="h2" color="blue">
                                Дети
                            </Typography>
                            <Typography as="p" variant={isMobile ? 'h2' : 'h3'} color="dark">
                                от 0 до 17 лет
                            </Typography>
                        </div>
                        <Counter
                            value={children}
                            onChange={(v) => {
                                dispatch(setChildren(v));
                            }}
                            min={0}
                            max={10}
                            className={s.count}
                        />
                    </div>

                    <div className={s.textBlock}>
                        <Typography
                            className={s.customLineHeight}
                            as="p"
                            variant={isMobile ? 'h2' : 'h3'}
                            color="dark"
                        >
                            Ваш возраст на момент поездки должен соответствовать категории
                            забронированного билета. У авиакомпаний есть ограничения для пассажиров
                            младше 18 лет, путешествующих без сопровождения. У авиакомпаний есть
                            ограничения для пассажиров младше 18 лет, путешествующих без
                            сопровождения. Ваш возраст на момент поездки должен соответствовать
                            категории забронированного билета. У авиакомпаний есть ограничения для
                            пассажиров младше 18 лет, путешествующих без сопровождения. У
                            авиакомпаний есть ограничения для пассажиров младше 18 лет,
                            путешествующих без сопровождения. Ваш возраст на момент поездки должен
                            соответствовать категории забронированного билета. У авиакомпаний есть
                            ограничения для пассажиров младше 18 лет, путешествующих без
                            сопровождения. У авиакомпаний есть ограничения для пассажиров младше 18
                            лет, путешествующих без сопровождения.
                        </Typography>
                    </div>

                    <div className={s.footer}>
                        <Button
                            size="medium"
                            variant="cyan"
                            className={s.footerButton}
                            onClick={() => {
                                setApplied(true);
                                setOpen(false);
                            }}
                        >
                            <Typography as="p" variant="h2" color="white">
                                Применить
                            </Typography>
                        </Button>
                    </div>
                </Box>
            )}
        </div>
    );
};
