import { Checkbox } from "../ui/checkbox";

export interface Question {
    id: string;
    question: string;
    options: string[];
    answer: string;
}

interface QuestionCardProps {
    question: Question;
    selectedAnswer: string;
    onAnswerChange: (questionId: string, answer: string) => void;
}

export default function QuestionCard({ question, selectedAnswer, onAnswerChange }: QuestionCardProps) {
    const handleChange = (option: string) => {
        onAnswerChange(question.id, option);
    };

    return (
        <div className="mb-4">
            <p className="font-semibold tracking-wide leading-26 text-base">{question.question}</p>
            {question.options.map((opt) => (
                <div key={opt} className="flex items-center gap-2 m-1">
                    <Checkbox
                        name={`question-${question.id}`}
                        value={opt}
                        onCheckedChange={() => handleChange(opt)}
                        checked={selectedAnswer === opt}
                    />
                    <label htmlFor={`question-${question.id}-${opt}`}>{opt}</label>
                </div>
            ))}
        </div>
    );
}
