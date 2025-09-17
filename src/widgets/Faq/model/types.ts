/** Тип элемента списка, содержащего контент для аккордионов */
export type FaqItem = {
    id: string;
    question: string;
    answer: string | string[];
};
