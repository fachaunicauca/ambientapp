export interface StudentInfo {
    studentId: number
    studentFirstName: string
    studentLastName: string
    studentEmail: string
}

export interface PagedStudents{
    content: StudentInfo[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}