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
