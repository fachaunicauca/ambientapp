import { TakeTestQuestion } from "@/api/apiEvaluation/interfaces/takeTest-interfaces";
import { QuestionStructureRenderer } from "@/components/evaluation-components/question-components/questionStructureRenderer";
import { QuestionType } from "@/types/questionTypes";

interface TakeTestQuestionCardProps {
    question: TakeTestQuestion;
    index: number; // número de la pregunta
    onStudentResponse: (answer: string) => void;
    savedResponse?: string;
}

export default function TakeTestQuestionCard({
    question,
    index,
    onStudentResponse,
    savedResponse
}: TakeTestQuestionCardProps) {
    return (
        <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            {/* Número + título */}
            <div className="mb-1">
                <h2 className="text-sm text-gray-500 dark:text-gray-400">
                    Pregunta {index + 1}
                </h2>

                {question.questionTitle && (
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {question.questionTitle}
                    </h3>
                )}
            </div>

            {/* Texto principal */}
            <p className="text-base text-gray-800 dark:text-gray-100 mb-4 whitespace-pre-line">
                {question.questionText}
            </p>

            {/* Imagen (si existe) */}
            {question.questionImageUrl && (
                <div className="mb-6 flex justify-center">
                    <img
                        src={question.questionImageUrl}
                        alt="Imagen de la pregunta"
                        className="w-4/12 rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                </div>
            )}

            {/* Estructura (respuestas) */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <QuestionStructureRenderer
                    mode="player"
                    questionType={question.questionType as QuestionType}
                    structure={question.questionStructure}
                    onAnswer={onStudentResponse}
                    storedResponse={savedResponse}
                />
            </div>
        </div>
    );
}