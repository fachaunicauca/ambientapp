"use client";

import TestInfoPage from "@/components/evaluation-components/test-components/testInfoPage";
import { Button } from "@/components/ui/buttons/button";
import { useRouter } from "next/navigation";

export default function EvaluacionGeneral() {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-4">
            <TestInfoPage testId={1} />

            <div className="flex justify-center">
                <Button
                    variant="default"
                    onClick={() => router.back()}
                    className="w-4/12"
                >
                    Volver
                </Button>
            </div>
        </div>
    );
}
