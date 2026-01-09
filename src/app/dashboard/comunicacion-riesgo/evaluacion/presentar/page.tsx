"use client";

import TakeTestPage from "@/components/communication-components/taketest-components/takeTestPage";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function PresentarEvaluacion() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const testIdParam = searchParams.get("testId");

    const handleFatalError = useCallback((message: string) => {
        toast.error(message);
        router.back();
    }, [router]);

    if (!testIdParam) {
        handleFatalError("No se pudo identificar la evaluación.");
        return null;
    }

    const handleFinishTest = () => {    
        router.push('/dashboard/comunicacion-riesgo/evaluacion/presentar/resultados');
    }

    return (
        <TakeTestPage
            testId={Number(testIdParam)}
            onFatalError={handleFatalError}
            onFinish={handleFinishTest}
        />
    );
}
