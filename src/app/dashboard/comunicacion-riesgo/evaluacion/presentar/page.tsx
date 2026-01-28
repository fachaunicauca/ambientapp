"use client";

import { startTestAttempt } from "@/api/apiEvaluation/services/takeTest-services";
import { useStudentTestAttemptStore } from "@/store/studentTestAttemptStore";
import { Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import TakeTestQuestionCard from "@/components/communication-components/taketest-components/takeTestQuestionCard";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import ConfirmDialog from "@/components/ui/modals/confirmDialog";
import { Button } from "@/components/ui/buttons/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function PresentarEvaluacion() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const testId = Number(searchParams.get("testId"));

    const handleFatalError = (message: string) => {
        toast.info(message);
        router.back();
    };

    if (!testId) {
        handleFatalError("No se pudo identificar la evaluación.");
    }

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Estado local para forzar el re-render del timer cada segundo
    const [, setTick] = useState(0);
    const studentEmail = useAuthStore.getState().profile?.email || "";

    const {
        testInfo,
        startAttempt,
        getRemainingTimeSeconds,
        clearAttempt,
        saveResponse,
        responses,
    } = useStudentTestAttemptStore();

    useEffect(() => {
        const loadTest = async () => {
            if (testInfo?.testId === testId) {
                setLoading(false);
                return;
            }

            setLoading(true);
            const result = await startTestAttempt(testId, studentEmail);

            if (typeof result === "string") {
                if (clearAttempt) clearAttempt();
                handleFatalError(result);
                return;
            }

            startAttempt(studentEmail, result);
            setLoading(false);
        };

        loadTest();
    }, [testId]);

    const handleFinishTest = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        router.replace(
            "/dashboard/comunicacion-riesgo/evaluacion/presentar/resultados"
        );
    };

    useEffect(() => {
        if (loading || !testInfo) return;

        const interval = setInterval(() => {
            const remaining = getRemainingTimeSeconds();
            if (remaining <= 0) {
                clearInterval(interval);
                toast.info(
                    "El tiempo ha finalizado. La evaluacion se enviara automaticamente."
                );
                handleFinishTest(); // Auto-envío del test
            }
            setTick((t) => t + 1); // Re render
        }, 1000);

        return () => clearInterval(interval);
    }, [loading, testInfo, getRemainingTimeSeconds]);

    const handleStudentResponse = (questionId: number, response: string) => {
        saveResponse(questionId, response);
    };

    if (loading || !testInfo) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="animate-spin" size={36} />
            </div>
        );
    }

    const remainingSeconds = Math.max(0, getRemainingTimeSeconds());
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return (
        <div className="relative flex flex-col lg:flex-row gap-8 items-start">
            {/* Preguntas */}
            <div className="flex-1 w-full flex flex-col gap-6">
                {testInfo.questions.map((question, index) => {
                    const savedResponse = responses[question.questionId];

                    return (
                        <TakeTestQuestionCard
                            key={question.questionId}
                            question={question}
                            index={index}
                            onStudentResponse={(response) =>
                                handleStudentResponse(
                                    question.questionId,
                                    response
                                )
                            }
                            savedResponse={savedResponse}
                        />
                    );
                })}
            </div>

            {/* Temporizador */}
            <aside className="hidden lg:block w-64 sticky top-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-gray-600">
                        <Clock size={18} />
                        <span className="font-semibold text-sm">
                            Tiempo restante
                        </span>
                    </div>

                    <p
                        className={`text-3xl font-mono font-bold ${
                            remainingSeconds <= 60
                                ? "text-redLight animate-pulse"
                                : ""
                        }`}
                    >
                        {minutes}:{seconds.toString().padStart(2, "0")}
                    </p>

                    <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue transition-all duration-1000"
                            style={{
                                width: `${
                                    (remainingSeconds /
                                        (testInfo.testDurationMinutes * 60)) *
                                    100
                                }%`,
                            }}
                        />
                    </div>
                </div>
                <ConfirmDialog
                    trigger={
                        <Button className="w-full mt-6" disabled={isSubmitting}>
                            Enviar
                        </Button>
                    }
                    onConfirm={handleFinishTest}
                    title="Enviar evaluación"
                    description={
                        "¿Estás seguro de que deseas enviar la evaluación? Revisa que hayas respondido todas las preguntas."
                    }
                    confirmText="Enviar"
                    confirmVariant="default"
                />
            </aside>
        </div>
    );
}
