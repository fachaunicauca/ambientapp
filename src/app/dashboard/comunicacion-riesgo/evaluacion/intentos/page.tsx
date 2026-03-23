"use client";

import { StudentTestAttemptResult } from "@/api/apiEvaluation/interfaces/takeTest-interfaces";
import { getStudentTestAttempts } from "@/api/apiEvaluation/services/takeTest-services";
import { AttemptResultCard } from "@/components/communication-components/taketest-components/attemptResultCard";
import Title from "@/components/ui/typography/title";
import { useAuthStore } from "@/store/authStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { set } from "zod";

export default function IntentosEvaluacion() {
    const searchParams = useSearchParams();
    const testId = searchParams.get("testId");
    const studentEmail = useAuthStore.getState().profile?.email || "";
    const [attempts, setAttempts] = useState<StudentTestAttemptResult[]>([]);
    const [error, setError] = useState<string | null>(null);

    if (!testId) {
        return (
            <>
                <Title title="Intentos Presentados" />
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-gray-500 text-lg">
                        No se ha especificado un test para mostrar los intentos.
                    </p>
                </div>
            </>
        );
    }

    const fetchStudentAttempts = async () => {
        const result = await getStudentTestAttempts(
            parseInt(testId),
            studentEmail
        );

        if (typeof result === "string") {
            setError(result);
            setAttempts([]);
            return;
        }

        setError(null);
        setAttempts(result);
    };

    useEffect(() => {
        fetchStudentAttempts();
    }, [testId]);

    return (
        <div>
            <div className="mb-6">
                <Title title="Intentos Presentados" />
            </div>

            {error && (
                <div className="p-4 text-lg text-gray-400 text-center">
                    {error}
                </div>
            )}

            {attempts && (
                <div className="mt-6 gap-2">
                    {attempts.map((attempt, index) => (
                        <div key={attempt.testAttemptId} className="mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex-1 h-px bg-gray-200" />
                                <span className="text-sm font-medium text-white bg-blue rounded-full px-3 py-1 whitespace-nowrap">
                                    Intento {index + 1}
                                </span>
                                <div className="flex-1 h-px bg-gray-200" />
                            </div>
                            <AttemptResultCard result={attempt} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
