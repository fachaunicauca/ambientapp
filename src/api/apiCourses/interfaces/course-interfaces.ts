export interface CourseInfo {
    courseId: number;
    courseName: string;
    teacherEmail: string;
    courseDescription: string;
}

export interface PagedCourses {
    content: CourseInfo[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}