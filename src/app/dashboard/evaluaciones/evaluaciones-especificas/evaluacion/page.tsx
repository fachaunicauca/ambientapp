"use client";
import TestInfoPage from "@/components/test-components/testInfoPage";
import { Button } from "@/components/ui/buttons/button";
import { useSearchParams, useRouter } from "next/navigation";

export default function EvaluacionEspecificaViewer() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const testId = searchParams.get("id");

    return (
        <div className="flex flex-col gap-4">
            <TestInfoPage testId={testId ? parseInt(testId) : 0} />

            <Button variant="default" onClick={() => router.back()}>
                Volver
            </Button>
        </div>
    );
}
