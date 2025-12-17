import { TestInfo } from "@/api/apiEvaluation/interfaces/test-interfaces";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/navigation/tooltip";
import { Info } from "lucide-react";

export const TestDetailsCard = ({ testInfo }: { testInfo: TestInfo }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700">
            {/* Descripción */}
            <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Descripción
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {testInfo.testDescription ||
                        "No hay una descripción detallada disponible para esta evaluación."}
                </p>
            </div>

            {/* Titulo Parametros */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Parametros de la Evaluación
            </h3>

            {/* Lista de Parametros */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {/* Duración */}
                <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Duración
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                        {testInfo.testDurationMinutes} minutos
                    </dd>
                </div>

                {/* Número de Preguntas */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
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

                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                        {testInfo.testNumberOfQuestions}
                    </dd>
                </div>

                {/* Límite de Intentos */}
                <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Límite de Intentos
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                        {testInfo.testAttemptLimit}
                    </dd>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
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
                                        presentarse nuevamente en un semestre distinto.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                        {testInfo.isPeriodic ? "Sí" : "No"}
                    </dd>
                </div>

                {/* Estado */}
                <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Estado
                    </dt>
                    <dd
                        className={`text-lg font-bold ${
                            testInfo.testState === 1
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {testInfo.testState === 1 ? "Activo" : "Inactivo"}
                    </dd>
                </div>
            </dl>
        </div>
    );
};
