//interfaces de peticion  de la api
export interface Answer {
    answerId: number;
    answerText: string;
}

export interface Question {
    questionId: number;
    questionTitle: string | null;
    questionText: string;
    questionImage: string | null;
    answers: Answer[];
}

export interface QuestionList {
    questions: Question[];
}


//interfaces de envio a la api
export interface StudentAnswer {
    questionId: number;
    answersIds: number[]; 
}

export interface StudentTestResponse {
    subjectName: string;
    teacherName: string;
    testDate: Date;
    studentCode: number;
    studentResponse: StudentAnswer[];
}

export interface TryInfo{
    actualDate: string;
    studentCode: number
}