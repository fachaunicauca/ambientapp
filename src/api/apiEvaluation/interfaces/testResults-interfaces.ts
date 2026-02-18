import { number } from "zod";

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

export interface StudentTestResult {
    studentId: number;
    studentFirstName: string;
    studentLastName: string;
    studentEmail: string;
    totalAttemptsUsed: number;
    finalScore: number;
}

export interface PagedStudentsResults {
    content: StudentTestResult[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

export interface TestStats {
    totalTaken: number;
    totalPassed: number;
    totalFailed: number;
    totalNotTaken: number | null;
    averageScore: number;
    standardDeviation: number;
}