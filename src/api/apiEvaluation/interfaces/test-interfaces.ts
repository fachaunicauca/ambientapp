export interface TestInfo {
    testId: number;
    teacherEmail: string;
    testTitle: string;
    testDescription: string | null;
    testDurationMinutes: number;
    testNumberOfQuestions: number;
    testAttemptLimit: number;
    testState: number;
    isPeriodic: boolean;
    courseId: number;
}

export interface PagedTests {
    content: TestInfo[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
