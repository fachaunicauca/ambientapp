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
