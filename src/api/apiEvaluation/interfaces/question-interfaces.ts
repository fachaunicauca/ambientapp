export interface QuestionInfo{
    questionId: number;
    questionText: string;
    questionTitle: string | null;
    questionImageUrl: string | null;
    questionType: string;
    questionStructure: string;
}

export interface PagedQuestions {
    content: QuestionInfo[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}