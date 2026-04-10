"use client";

import { StudentTestAttemptResult } from "@/api/apiEvaluation/interfaces/takeTest-interfaces";
import { scoreAndSaveStudentAttempt } from "@/api/apiEvaluation/services/takeTest-services";
import { AttemptResultCard } from "@/components/communication-components/taketest-components/attemptResultCard";
import { Button } from "@/components/ui/buttons/button";
import Title from "@/components/ui/typography/title";
import { useStudentTestAttemptStore } from "@/store/studentTestAttemptStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ResultadosEvaluacion() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<StudentTestAttemptResult | null>(null);
    const hasSubmitted = useRef(false);
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
            if (hasSubmitted.current) return;
            hasSubmitted.current = true;

            if (testResult) {
                setResult(testResult);
                setLoading(false);
                return;
            }

            const attempt = buildAttemptPayload();
            if (!attempt) {
                setError(
                    "Ocurrio un error al obtener la informacion del intento."
                );
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
        // No es necesario incluir las dependencias del store ya que este efecto solo debe
        // ejecutarse una vez al montar el componente, y las funciones del store son estables
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

            <AttemptResultCard
                testTitle={testInfo?.testTitle || "Resultados de la Evaluación"}
                result={result}
            />

            <div className="mt-8 w-min mx-auto">
                <Button onClick={handleBackToEvaluations}>
                    Volver a Evaluaciones
                </Button>
            </div>
        </div>
    );
}
