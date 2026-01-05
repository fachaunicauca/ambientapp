export interface ChoiceAnswer{
    id: number;
    text: string;
    correct: boolean;
}

export interface MultipleChoiceStructure{
    answers: ChoiceAnswer[];
    correctAnswerCount: number;
}

export interface OpenEndedStructure{
    maxResponseSize: number;
}

export type QuestionMode = 'viewer' | 'builder' | 'player';
export type QuestionType = 'MULTIPLE_CHOICE' | 'OPEN_ENDED';

