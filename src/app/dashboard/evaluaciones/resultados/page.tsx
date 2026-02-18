"use client";

import { TestStats } from "@/api/apiEvaluation/interfaces/testResults-interfaces";
import { getTestStats } from "@/api/apiEvaluation/services/testResults-services";
import AttemptRequestsPaginationList from "@/components/evaluation-components/results-components/attemptRequestPaginationList";
import StudentsResultsPaginationTable from "@/components/evaluation-components/results-components/studentsResultsPaginationTable";
import Title from "@/components/ui/typography/title";
import { MAX_TEST_SCORE } from "@/config/testConfig";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EvaluacionResultados() {
    const searchParams = useSearchParams();
    const testId = Number(searchParams.get("testId"));
    const [stats, setStats] = useState<TestStats | null>(null);
    const [statsError, setStatsError] = useState<string>();

    const router = useRouter();

    if (!testId) {
        toast.error("No se pudo obtener el ID de la evaluacion");
        router.replace("/dashboard/evaluaciones/evaluaciones-especificas");
    }

    const fetchTestStats = async () => {
        const response = await getTestStats(testId);

        if (typeof response === "string") {
            setStatsError(response);
            setStats(null);
        } else {
            setStatsError(undefined);
            setStats(response);
        }
    };

    useEffect(() => {
        if (testId) {
            fetchTestStats();
        }
    }, [testId]);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <Title title="Resultados" />
            </div>

            <AttemptRequestsPaginationList testId={testId} />

            {/* Estadisticas de la evaluación */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b bg-white">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        Estadísticas de la Evaluación
                    </h2>
                </div>

                {/* Body */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Fila 1 */}
                    <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
                        <p className="text-xs text-gray-500 uppercase">
                            Presentadas
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                            {stats ? stats.totalTaken : "--"}
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
                        <p className="text-xs text-gray-500 uppercase">
                            No presentadas
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                            {stats ? stats.totalNotTaken ?? "No aplica" : "--"}
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
                        <p className="text-xs text-gray-500 uppercase">
                            Aprobadas
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                            {stats ? stats.totalPassed : "--"}
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
                        <p className="text-xs text-gray-500 uppercase">
                            Reprobadas
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                            {stats ? stats.totalFailed : "--"}
                        </p>
                    </div>

                    {/* Fila 2 */}
                    <div className="bg-gray-100 rounded-xl p-4 shadow-sm lg:col-span-2">
                        <p className="text-xs text-gray-500 uppercase">
                            Promedio
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                            {stats
                                ? (stats.averageScore * MAX_TEST_SCORE).toFixed(
                                      2
                                  )
                                : "--"}
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-4 shadow-sm lg:col-span-2">
                        <p className="text-xs text-gray-500 uppercase">
                            Desviación estándar
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                            {stats
                                ? (
                                      stats.standardDeviation * MAX_TEST_SCORE
                                  ).toFixed(2)
                                : "--"}
                        </p>
                    </div>
                </div>
            </div>
            <StudentsResultsPaginationTable testId={testId} />
        </div>
    );
}
