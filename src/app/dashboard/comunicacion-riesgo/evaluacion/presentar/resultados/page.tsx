"use client";

import { StudentTestAttemptResult } from "@/api/apiEvaluation/interfaces/takeTest-interfaces";
import { scoreAndSaveStudentAttempt } from "@/api/apiEvaluation/services/takeTest-services";
import { Button } from "@/components/ui/buttons/button";
import Title from "@/components/ui/typography/title";
import { MAX_TEST_SCORE } from "@/config/testConfig";
import { useStudentTestAttemptStore } from "@/store/studentTestAttemptStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultadosEvaluacion() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<StudentTestAttemptResult | null>(null);
    const {
        testInfo,
        testResult,
        setTestResult,
        clearAttempt,
        buildAttemptPayload,
    } = useStudentTestAttemptStore();

    const router = useRouter();

    useEffect(() => {
        const submitAttempt = async () => {
            if (testResult) {
                setResult(testResult);
                setLoading(false);
                return;
            }

            const attempt = buildAttemptPayload();
            if (!attempt || attempt.studentResponses.length === 0) {
                setError("No se encontraron respuestas para enviar.");
                setLoading(false);
                return;
            }

            setLoading(true);

            const response = await scoreAndSaveStudentAttempt(attempt);

            if (typeof response === "string") {
                setError(response);
            } else {
                setResult(response);
                setTestResult(response);
                clearAttempt();
            }

            setLoading(false);
        };

        submitAttempt();
    }, []);

    const handleBackToEvaluations = () => {
        router.push(`/dashboard/comunicacion-riesgo/evaluacion`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg">
                <h2 className="text-lg font-semibold mb-2">
                    Error al procesar las respuestas del estudiante
                </h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                    Reintentar
                </Button>
            </div>
        );
    }

    if (!result) return null;

    return (
        <div>
            <Title title={`Resultados`} />

            <div className="max-w-2xl mx-auto mt-10 p-8 border rounded-2xl shadow-sm bg-white">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-blue">
                        {testInfo?.testTitle || "Resultados de la Evaluación"}
                    </h2>
                </div>
                {/* Puntaje */}
                <div className="flex justify-center my-8">
                    <div className="rounded-2xl border bg-gradient-to-br from-blue/10 to-white px-8 py-6 text-center shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">
                            Puntaje obtenido
                        </p>
                        <p className="text-5xl font-extrabold text-blue">
                            {(result.testAttemptScore * MAX_TEST_SCORE).toFixed(
                                1
                            )}
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
                        <p className="text-gray-500 mb-1">
                            Preguntas respondidas
                        </p>
                        <p className="font-medium text-gray-700">
                            {result.testAttemptNumberOfQuestions}
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 border">
                        <p className="text-gray-500 mb-1">
                            Estado de calificación
                        </p>
                        <p className="font-medium text-gray-700">
                            {result.fullyScored
                                ? "Completamente calificado"
                                : "Pendiente de revisión"}
                        </p>
                    </div>
                </div>
                <div className="mt-8 w-min mx-auto">
                    <Button onClick={handleBackToEvaluations}>
                        Volver a Evaluaciones
                    </Button>
                </div>
            </div>
        </div>
    );
}
