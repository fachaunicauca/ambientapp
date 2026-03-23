"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/buttons/button";
import { History, Loader2, PlayCircle } from "lucide-react";

import {
    PagedTestsBasicInfo,
    TestBasicInfo,
} from "@/api/apiEvaluation/interfaces/takeTest-interfaces";

import {
    getActiveTestsPaged,
    getGeneralTest,
} from "@/api/apiEvaluation/services/takeTest-services";

import { TakeTestListItem } from "./takeTestListItem";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ui/modals/confirmDialog";
import { PaginationControls } from "@/components/ui/navigation/pagination-controls";
import SearchBar from "@/components/ui/navigation/searchBar";
import { TESTS_FILTERS } from "@/config/testConfig";

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

    const [activeFilter, setActiveFilter] = useState<{
        key?: string;
        value?: string;
    }>({});

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

    const fetchTestsPage = async (
        page: number,
        filterKey?: string,
        filterValue?: string
    ) => {
        setLoadingPaged(true);

        const result =
            filterKey && filterValue
                ? await getActiveTestsPaged(page, 5, filterKey, filterValue)
                : await getActiveTestsPaged(page, 5);

        if (typeof result !== "string") {
            setPagedData(result);
            setCurrentPage(page);
            setPagedError(null);
        } else {
            setPagedError(result);
            setPagedData(null);
        }

        setLoadingPaged(false);
    };

    useEffect(() => {
        fetchGeneralTest();
        fetchTestsPage(0);
    }, []);

    const handleSearch = (value: string, filterKey?: string) => {
        const newFilter = { key: filterKey, value };

        setActiveFilter(newFilter);

        fetchTestsPage(0, filterKey, value);
    };

    const handlePageChange = (page: number) => {
        fetchTestsPage(page, activeFilter.key, activeFilter.value);
    };

    const handleTakeTest = (testId: number) => {
        setSelectedTestId(testId);
    };

    const handleConfirmStartTest = async () => {
        if (!selectedTestId) {
            toast.error("No se ha seleccionado una evaluación.");
            return;
        }

        router.push(
            `/dashboard/comunicacion-riesgo/evaluacion/presentar?testId=${selectedTestId}`
        );
    };

    const handleVisualizeAttempts = (testId: number) => {
        router.push(
            `/dashboard/comunicacion-riesgo/evaluacion/intentos?testId=${testId}`
        );
    };

    return (
        <div className="flex flex-col gap-6 mx-2">
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

                        <div className="flex flex-col gap-2 w-min">
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

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() =>
                                    handleVisualizeAttempts(generalTest.testId)
                                }
                            >
                                <History size={16} />
                                Ver Intentos
                            </Button>
                        </div>
                    </div>
                )}

                {generalError && (
                    <div className="p-4 border border-dashed rounded-lg text-sm text-gray-400 text-center">
                        {generalError}
                    </div>
                )}
            </div>

            {/* Barra de búsqueda */}
            <SearchBar
                placeholder="Buscar evaluación..."
                filters={TESTS_FILTERS}
                onSearch={handleSearch}
            />

            {/* Header evaluaciones específicas */}
            <div className="flex items-center justify-between px-2">
                <h3 className="font-semibold text-lg text-blueDark">
                    Evaluaciones especificas activas
                </h3>

                {pagedData && (
                    <span className="text-sm text-gray-500 font-medium">
                        Total: {pagedData.totalElements}
                    </span>
                )}
            </div>

            {/* Evaluaciones Paginadas */}
            <div
                className={`flex flex-col gap-2 transition-opacity duration-300 ${
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
                        <div className="flex flex-col gap-2 w-min">
                            <ConfirmDialog
                                trigger={
                                    <Button
                                        onClick={() =>
                                            handleTakeTest(test.testId)
                                        }
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
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() =>
                                    handleVisualizeAttempts(test.testId)
                                }
                            >
                                <History size={16} />
                                Ver Intentos
                            </Button>
                        </div>
                    </div>
                ))}

                {pagedError && (
                    <div className="text-center p-6 border border-dashed rounded-xl text-gray-400">
                        {pagedError}
                    </div>
                )}
            </div>

            {/* Controles de Paginación */}
            {pagedData && pagedData.totalPages > 1 && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={pagedData.totalPages}
                    onPageChange={handlePageChange}
                    loading={loadingPaged}
                    first={pagedData.first}
                    last={pagedData.last}
                />
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
