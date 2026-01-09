"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/buttons/button";
import { ChevronLeft, ChevronRight, Loader2, PlayCircle } from "lucide-react";

import {
    PagedTestsBasicInfo,
    TestBasicInfo,
} from "@/api/apiEvaluation/interfaces/takeTest-interfaces";

import {
    getActiveTestsPaged,
    getGeneralTest,
    startTestAttempt,
} from "@/api/apiEvaluation/services/takeTest-services";

import { TakeTestListItem } from "./takeTestListItem";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ui/modals/confirmDialog";

export default function TakeTestsPaginationList() {
    const router = useRouter();

    const [generalTest, setGeneralTest] = useState<TestBasicInfo | null>(null);
    const [pagedData, setPagedData] = useState<PagedTestsBasicInfo | null>(
        null
    );

    const [generalError, setGeneralError] = useState<string | null>(null);
    const [pagedError, setPagedError] = useState<string | null>(null);

    const [loadingGeneral, setLoadingGeneral] = useState(false);
    const [loadingPaged, setLoadingPaged] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);

    const [selectedTestId, setSelectedTestId] = useState<number | null>(null);

    const fetchGeneralTest = async () => {
        setLoadingGeneral(true);

        const result = await getGeneralTest();

        if (typeof result !== "string") {
            setGeneralTest(result);
            setGeneralError(null);
        } else {
            setGeneralError(result);
            setGeneralTest(null);
        }

        setLoadingGeneral(false);
    };

    const fetchTestsPage = async (page: number) => {
        setLoadingPaged(true);

        const result = await getActiveTestsPaged(page, 5);

        if (typeof result !== "string") {
            setPagedData(result);
            setCurrentPage(page);
            setPagedError(null);
        } else {
            setPagedError(result);
        }

        setLoadingPaged(false);
    };

    useEffect(() => {
        fetchGeneralTest();
        fetchTestsPage(0);
    }, []);

    const handleTakeTest = (testId: number) => {
        setSelectedTestId(testId);
    };

    const handleConfirmStartTest = async () => {
        if (!selectedTestId) {
            toast.error("No se ha seleccionado una evaluación.");
            return;
        };

        router.push(`/dashboard/comunicacion-riesgo/evaluacion/presentar?testId=${selectedTestId}`);
    };

    return (
        <div className="flex flex-col gap-8 mx-2">
            {/* Evaluación General */}
            <div className="flex flex-col gap-3">
                {generalTest && (
                    <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex-1">
                            <TakeTestListItem
                                testInfo={generalTest}
                                viewTeacher={false}
                            />
                        </div>

                        <ConfirmDialog
                            trigger={
                                <Button
                                    onClick={() =>
                                        handleTakeTest(generalTest.testId)
                                    }
                                    className="gap-2 w-min"
                                >
                                    <PlayCircle size={16} />
                                    Presentar evaluación
                                </Button>
                            }
                            onConfirm={handleConfirmStartTest}
                            title="Presentar evaluación general"
                            description="¿Estás seguro de que deseas presentar la evaluación general?"
                            confirmText="Iniciar evaluación"
                            confirmVariant="default"
                        />
                    </div>
                )}

                {generalError && (
                    <div className="p-4 border border-dashed rounded-lg text-sm text-gray-400 text-center">
                        {generalError}
                    </div>
                )}
            </div>

            {/* Header evaluaciones específicas */}
            <div className="flex items-center justify-between px-2">
                <h3 className="font-bold text-lg text-gray-700">
                    Evaluaciones especificas disponibles
                </h3>

                {pagedData && (
                    <span className="text-sm text-gray-500 font-medium">
                        Total: {pagedData.totalElements}
                    </span>
                )}
            </div>

            {/* Evaluaciones Paginadas */}
            <div
                className={`flex flex-col gap-4 transition-opacity duration-300 ${
                    loadingPaged
                        ? "opacity-40 pointer-events-none"
                        : "opacity-100"
                }`}
            >
                {pagedData?.content.map((test) => (
                    <div
                        key={test.testId}
                        className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex-1">
                            <TakeTestListItem testInfo={test} />
                        </div>

                        <ConfirmDialog
                            trigger={
                                <Button
                                    onClick={() => handleTakeTest(test.testId)}
                                    className="gap-2 w-min"
                                >
                                    <PlayCircle size={16} />
                                    Presentar evaluación
                                </Button>
                            }
                            onConfirm={handleConfirmStartTest}
                            title={`Presentar Evaluación: ${test.testTitle}`}
                            description={`¿Estás seguro de que deseas presentar la evaluación?`}
                            confirmText="Iniciar evaluación"
                            confirmVariant="default"
                        />
                    </div>
                ))}

                {pagedError && (
                    <div className="text-center p-6 border border-dashed rounded-xl text-gray-400">
                        {pagedError}
                    </div>
                )}
            </div>

            {/* Paginación */}
            {pagedData && (
                <div className="flex items-center justify-between py-6 mt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Página{" "}
                        <span className="font-bold text-gray-900">
                            {pagedData.number + 1}
                        </span>{" "}
                        de {pagedData.totalPages}
                    </p>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                fetchTestsPage(currentPage - 1);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            disabled={pagedData.first || loadingPaged}
                            className="gap-2"
                        >
                            <ChevronLeft size={18} />
                            Anterior
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => {
                                fetchTestsPage(currentPage + 1);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            disabled={pagedData.last || loadingPaged}
                            className="gap-2"
                        >
                            Siguiente
                            <ChevronRight size={18} />
                        </Button>
                    </div>
                </div>
            )}

            {/* Loader global */}
            {(loadingGeneral || loadingPaged) && (
                <div className="fixed inset-0 bg-white/20 backdrop-blur-[1px] flex justify-center items-center z-50">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                </div>
            )}
        </div>
    );
}
