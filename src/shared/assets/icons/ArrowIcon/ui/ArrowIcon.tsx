import { FC } from 'react';

import styles from './ArrowIcon.module.scss';
import clsx from 'clsx';

export interface Props extends React.SVGProps<SVGSVGElement> {
    /**
     * Цвет иконки
     * @default cyan
     */
    color?: 'white' | 'cyan';

    /**
     * Направление, куда повернута стрелочка
     * @default right
     */
    direction?: 'right' | 'left' | 'up' | 'down';

    /**
     * Дополнительный класс для css стилей
     */
    className?: string;
}

/** Иконка стрелочки ui-кита */
export const ArrowIcon: FC<Props> = ({
    color = 'cyan',
    direction = 'right',
    className,
    ...rest
}) => {
    return (
        <div className={className}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="45"
                viewBox="0 0 42 45"
                fill="currentColor"
                className={clsx(styles.root, styles[color], styles[direction])}
                {...rest}
            >
                <g filter="url(#filter0_ddii_24_1598)">
                    <path
                        d="M10.5 30.2942C4.50002 26.8301 4.5 18.1699 10.5 14.7058L23.25 7.34456C29.25 3.88046 36.75 8.21058 36.75 15.1388L36.75 29.8612C36.75 36.7894 29.25 41.1195 23.25 37.6554L10.5 30.2942Z"
                        fill="currentColor"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_ddii_24_1598"
                        x="0"
                        y="0.125366"
                        width="41.65"
                        height="44.6493"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                    >
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dx="1" dy="2" />
                        <feGaussianBlur stdDeviation="1.95" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.0369822 0 0 0 0 0.0961538 0 0 0 0 0.0793886 0 0 0 0.28 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_24_1598"
                        />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dx="-2" dy="-2" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="effect1_dropShadow_24_1598"
                            result="effect2_dropShadow_24_1598"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect2_dropShadow_24_1598"
                            result="shape"
                        />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dx="-2" dy="-3" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
                        />
                        <feBlend mode="normal" in2="shape" result="effect3_innerShadow_24_1598" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feOffset dx="2" dy="1" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.053578 0 0 0 0 0.182692 0 0 0 0 0.126743 0 0 0 0.23 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="effect3_innerShadow_24_1598"
                            result="effect4_innerShadow_24_1598"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};
