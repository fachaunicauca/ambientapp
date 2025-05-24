//interfaces de peticion  de la api
export interface Answer {
    answer_id: number;
    answer_text: string;
}

export interface Question {
    question_id: number;
    question_title: string | null;
    question_text: string;
    question_image: string | null;
    answers: Answer[];
}

export interface QuestionList {
    questions: Question[];
}


//interfaces de envio a la api
export interface StudentAnswer {
    question_id: number;
    answers_ids: number[]; 
}

export interface StudentTestResponse {
    subject_name: string;
    teacher_name: string;
    test_date: Date;
    student_code: number;
    student_response: StudentAnswer[];
}

export interface TryInfo{
    actual_date: string;
    student_code: number
}