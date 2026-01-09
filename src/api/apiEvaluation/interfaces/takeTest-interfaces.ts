export interface TestBasicInfo {
    testId: number;
    testTitle: string;
    testDescription: string;
    teacherEmail: string;
}

export interface PagedTestsBasicInfo {
    content: TestBasicInfo[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface TakeTestQuestion {
    questionId: number;
    questionText: string;
    questionTitle: string | null;
    questionImageUrl: string | null;
    questionType: string;
    questionStructure: string;
}

export interface TakeTestInfo {
    testId: number;
    testTitle: string;
    testDurationMinutes: number;
    testNumberOfQuestions: number;

    questions: TakeTestQuestion[];
}
