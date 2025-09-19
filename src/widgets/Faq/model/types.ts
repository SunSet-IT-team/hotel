/** Тип элемента списка, содержащего контент для аккордионов */
export interface FaqItem {
    id: string;
    question: string;
    answer: string | string[];
}
