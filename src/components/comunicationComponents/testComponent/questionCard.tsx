import { Checkbox } from "@/components/ui/form/checkbox";
import { Question } from "@/api/apiEvaluation/interfaces/evaluation-interfaces"; 

interface QuestionCardProps {
    question: Question;
    selectedAnswer: number | null;
    onAnswerChange: (questionId: number, answerId: number) => void;
}

export default function QuestionCard({ question, selectedAnswer, onAnswerChange }: QuestionCardProps) {
    const handleChange = (answerId: number) => {
        onAnswerChange(question.questionId, answerId); 
    };

    return (
        <div className="mb-4">
            <p className="font-semibold tracking-wide leading-26 text-base">{question.questionText}</p>
            {question.answers.map((answer) => (
                <div key={answer.answerId} className="flex items-center gap-2 m-1">
                    <Checkbox
                        name={`question-${question.questionId}`}
                        value={answer.answerId.toString()} 
                        onCheckedChange={() => handleChange(answer.answerId)}
                        checked={selectedAnswer === answer.answerId} 
                    />
                    <label htmlFor={`question-${question.questionId}-${answer.answerId}`}>{answer.answerText}</label>
                </div>
            ))}
        </div>
    );
}