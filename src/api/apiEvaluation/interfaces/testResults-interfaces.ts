export interface StudentTestConfig {
    studentTestConfigId: number;
    studentEmail: string;
    attemptsUsed: number;
    totalAttemptsUsed?: number;
    lastAttemptAt?: string;
    finalScore: number;
}

export interface AttemptRequestInfo {
    studentTestConfigId: number;
    studentEmail: string;
    totalAttemptsUsed: number;
    finalScore: number;
}

export interface PagedAttemptRequests {
    content: AttemptRequestInfo[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
