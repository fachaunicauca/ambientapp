import { QuestionInfo } from "@/api/apiEvaluation/interfaces/question-interfaces";
import React from "react";
import { QUESTION_TYPE_LABELS } from "@/config/testConfig";
import { QuestionStructureRenderer } from "./questionStructureRenderer";
import { QuestionType } from "@/types/questionTypes";

interface QuestionDetailsCardProps {
    question: QuestionInfo;
}

export default function QuestionDetailsCard({
    question,
}: QuestionDetailsCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700">
            {/* Detalles de la Pregunta */}
            <dl className="grid grid-cols-1 gap-x-8 gap-y-4">
                {/* Titulo de la Pregunta */}
                {question.questionTitle && (
                    <div className="flex flex-col">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Titulo
                        </dt>
                        <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                            {question.questionTitle}
                        </dd>
                    </div>
                )}

                {/* Texto de la Pregunta */}
                <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Texto
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                        {question.questionText}
                    </dd>
                </div>

                {/* Imagen de la Pregunta */}
                {question.questionImageUrl && (
                    <div className="flex flex-col">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Imagen
                        </dt>
                        <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                            <img
                                src={question.questionImageUrl}
                                alt="Imagen de la Pregunta"
                                className="max-w-full h-auto rounded-md"
                            />
                        </dd>
                    </div>
                )}

                {/* Tipo de Pregunta */}
                <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Tipo de Pregunta
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                        {QUESTION_TYPE_LABELS[question.questionType] ||
                            question.questionType}
                    </dd>
                </div>

                {/* Estructura de la Pregunta */}
                <div className="flex flex-col pt-4 border-t border-gray-100 dark:border-gray-700">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Estructura de la pregunta
                    </dt>
                    <dd>
                        <QuestionStructureRenderer
                            mode="viewer"
                            questionType={question.questionType as QuestionType}
                            structure={question.questionStructure}
                        ></QuestionStructureRenderer>
                    </dd>
                </div>
            </dl>
        </div>
    );
}
