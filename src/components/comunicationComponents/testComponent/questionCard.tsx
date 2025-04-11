import { Checkbox } from "@/components/ui/form/checkbox";
import { Question } from "@/api/apiEvaluation/interfaces/interfaces"; 

interface QuestionCardProps {
    question: Question;
    selectedAnswer: number | null;
    onAnswerChange: (questionId: number, answerId: number) => void;
}

export default function QuestionCard({ question, selectedAnswer, onAnswerChange }: QuestionCardProps) {
    const handleChange = (answerId: number) => {
        onAnswerChange(question.question_id, answerId); 
    };

    return (
        <div className="mb-4">
            <p className="font-semibold tracking-wide leading-26 text-base">{question.question_text}</p>
            {question.answers.map((answer) => (
                <div key={answer.answer_id} className="flex items-center gap-2 m-1">
                    <Checkbox
                        name={`question-${question.question_id}`}
                        value={answer.answer_id.toString()} 
                        onCheckedChange={() => handleChange(answer.answer_id)}
                        checked={selectedAnswer === answer.answer_id} 
                    />
                    <label htmlFor={`question-${question.question_id}-${answer.answer_id}`}>{answer.answer_text}</label>
                </div>
            ))}
        </div>
    );
}