export interface TestGuide {
    testGuideId: string;
    testGuideUrl: string;
    teacherEmail: string;
}

export interface PagedTestGuides {
    content: TestGuide[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface TestGuideRequest {
    testGuideId: string;
    testGuideArchive: File;
    teacherEmail: string;
}
