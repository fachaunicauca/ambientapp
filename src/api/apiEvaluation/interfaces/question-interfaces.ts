export interface QuestionInfo{
    questionId: number;
    questionText: string;
    questionTitle: string | null;
    questionImageId: number | null;
    questionImageUrl: string | null;
    questionImage: File | null;
    questionType: string;
    questionStructure: string;
    testId: number;
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