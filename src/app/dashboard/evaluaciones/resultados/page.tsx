"use client";

import AttemptRequestsPaginationList from "@/components/evaluation-components/results-components/attemptRequestPaginationList";
import Title from "@/components/ui/typography/title";
import { useSearchParams } from "next/navigation";

export default function EvaluacionResultados() {
    const searchParams = useSearchParams();
    const testId = Number(searchParams.get("testId"));

    return (
        <div className="flex flex-col gap-6">
            <div>
                <Title title="Resultados" />
            </div>

            <AttemptRequestsPaginationList testId={testId} />
        </div>
    );
}
