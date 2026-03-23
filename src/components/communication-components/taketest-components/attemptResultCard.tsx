import { StudentTestAttemptResult } from "@/api/apiEvaluation/interfaces/takeTest-interfaces";
import { MAX_TEST_SCORE } from "@/config/testConfig";

interface AttemptResultCardProps {
    testTitle?: string;
    result: StudentTestAttemptResult;
}

export const AttemptResultCard = ({
    testTitle,
    result,
}: AttemptResultCardProps) => {
    return (
        <div className="max-w-2xl mx-auto mt-4 p-8 border rounded-2xl shadow-sm bg-white">
            <div className="text-center mb-2">
                <h2 className="text-2xl font-bold text-blue">
                    {testTitle || "Resultados de la Evaluación"}
                </h2>
            </div>
            {/* Puntaje */}
            <div className="flex justify-center my-6">
                <div className="rounded-2xl border bg-gradient-to-br from-blue/10 to-white px-8 py-6 text-center shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">
                        Puntaje obtenido
                    </p>
                    <p className="text-5xl font-extrabold text-blue">
                        {(result.testAttemptScore * MAX_TEST_SCORE).toFixed(1)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        sobre {MAX_TEST_SCORE}
                    </p>
                </div>
            </div>

            {/* Información general */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-gray-50 border">
                    <p className="text-gray-500 mb-1">Estudiante</p>
                    <p className="font-medium text-gray-700">
                        {result.studentEmail}
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border">
                    <p className="text-gray-500 mb-1">Fecha</p>
                    <p className="font-medium text-gray-700">
                        {new Date(result.testAttemptDate).toLocaleString()}
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border">
                    <p className="text-gray-500 mb-1">Preguntas respondidas</p>
                    <p className="font-medium text-gray-700">
                        {result.testAttemptNumberOfQuestions}
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border">
                    <p className="text-gray-500 mb-1">Estado de calificación</p>
                    <p className="font-medium text-gray-700">
                        {result.fullyScored
                            ? "Completamente calificado"
                            : "Pendiente de revisión"}
                    </p>
                </div>
            </div>
        </div>
    );
};
