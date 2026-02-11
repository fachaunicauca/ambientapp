import { TestInfo } from "@/api/apiEvaluation/interfaces/test-interfaces";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/navigation/tooltip";
import { TEST_STATE_LABELS } from "@/config/testConfig";

import { Info } from "lucide-react";

export const TestDetailsCard = ({ testInfo }: { testInfo: TestInfo }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100">
            {/* Descripción */}
            <div className="mb-6 pb-4 border-b border-gray-200 ">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Descripción
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    {testInfo.testDescription ||
                        "No hay una descripción disponible para esta evaluación."}
                </p>
                <div className="flex items-center gap-2 text-sm mt-2">
                    <span className="text-sm text-gray-900 font-semibold">
                        Curso ID:
                    </span>
                    <span className="text-sm text-gray-700 leading-relaxed">
                        {testInfo.courseId === 0
                            ? "0 (Cualquier estudiante puede presentar la evaluacion)"
                            : testInfo.courseId}
                    </span>
                </div>
            </div>

            {/* Titulo Parametros */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                Parametros de la Evaluación
            </h3>

            {/* Lista de Parametros */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {/* Duración */}
                <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 ">
                        Duración
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                        {testInfo.testDurationMinutes} minutos
                    </dd>
                </div>

                {/* Número de Preguntas */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <dt className="text-sm font-medium text-gray-500 ">
                            Número de Preguntas
                        </dt>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        Cantidad de preguntas que se
                                        seleccionarán aleatoriamente para cada
                                        intento de la evaluación.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <dd className="text-lg font-semibold text-gray-900 ">
                        {testInfo.testNumberOfQuestions}
                    </dd>
                </div>

                {/* Límite de Intentos */}
                <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">
                        Límite de Intentos
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                        {testInfo.testAttemptLimit}
                    </dd>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <dt className="text-sm font-medium text-gray-500">
                            Evaluación Periódica
                        </dt>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        Indica si la evaluación puede
                                        presentarse nuevamente en un semestre
                                        distinto.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <dd className="text-lg font-semibold text-gray-900">
                        {testInfo.isPeriodic ? "Sí" : "No"}
                    </dd>
                </div>

                {/* Estado */}
                <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">
                        Estado
                    </dt>
                    <dd className={`text-lg font-bold`}>
                        {TEST_STATE_LABELS[testInfo.testState]}
                    </dd>
                </div>
            </dl>
        </div>
    );
};
