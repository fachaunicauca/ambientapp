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
}
