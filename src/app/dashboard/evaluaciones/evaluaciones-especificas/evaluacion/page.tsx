"use client";
import TestInfoPage from "@/components/evaluation-components/test-components/testInfoPage";
import { useSearchParams } from "next/navigation";

export default function EvaluacionEspecificaViewer() {
    const searchParams = useSearchParams();

    const testId = searchParams.get("id");

    return (
        <div className="flex flex-col gap-4">
            <TestInfoPage testId={testId ? parseInt(testId) : 0} />
        </div>
    );
}
