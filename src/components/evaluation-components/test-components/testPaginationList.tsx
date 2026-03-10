"use client";

import { useEffect, useState } from "react";
import {
    getTestsPaged,
    deleteTest,
} from "@/api/apiEvaluation/services/test-services";
import { PagedTests } from "@/api/apiEvaluation/interfaces/test-interfaces";
import { Button } from "@/components/ui/buttons/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { TestListItem } from "./testListItem";
import { PaginationControls } from "@/components/ui/navigation/pagination-controls";
import SearchBar from "@/components/ui/navigation/searchBar";
import { TESTS_FILTERS } from "@/config/testConfig";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export default function TestsPaginationList() {
    const router = useRouter();
    const [data, setData] = useState<PagedTests | null>(null);
    const [error, setError] = useState<string>();
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const isAdmin =
        useAuthStore.getState().profile?.roles?.includes("ADMIN") ?? false;

    const [activeFilter, setActiveFilter] = useState<{
        key?: string;
        value?: string;
    }>({});

    const fetchTestsPage = async (
        page: number,
        filterKey?: string,
        filterValue?: string
    ) => {
        setLoading(true);

        const result =
            filterKey && filterValue
                ? await getTestsPaged(page, 5, filterKey, filterValue)
                : await getTestsPaged(page, 5);

        if (typeof result !== "string") {
            setError(undefined);
            setData(result);
            setCurrentPage(page);
        } else {
            setData(null);
            setError(result);
        }
        setLoading(false);
    };

    const handleSearch = (value: string, filterKey?: string) => {
        if (filterKey === "teacherEmail" && isAdmin === false) {
            toast.error(
                "Solamente el administrador puede filtrar por docentes."
            );
        } else {
            const newFilter = { key: filterKey, value };
            setActiveFilter(newFilter);
            fetchTestsPage(0, filterKey, value);
        }
    };

    const handlePageChange = (page: number) => {
        fetchTestsPage(page, activeFilter.key, activeFilter.value);
    };

    const handleDelete = async (id: number) => {
        setLoading(true);
        const result = await deleteTest(id);

        if (typeof result === "string") {
            setError(result);
        } else {
            if (data && data.content.length === 1 && currentPage > 0) {
                await fetchTestsPage(
                    currentPage - 1,
                    activeFilter.key,
                    activeFilter.value
                );
            } else {
                await fetchTestsPage(
                    currentPage,
                    activeFilter.key,
                    activeFilter.value
                );
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTestsPage(0);
    }, []);

    return (
        <div className="flex flex-col gap-4 mx-2">
            <SearchBar
                placeholder="Buscar evaluación..."
                filters={TESTS_FILTERS}
                onSearch={handleSearch}
            />

            {error && (
                <div className="text-center p-6 text-xl text-gray-400">
                    {error}
                </div>
            )}

            {!error && (!data || data.content.length === 0) && (
                <div className="text-center p-6 text-xl text-gray-400">
                    No hay evaluaciones registradas.
                </div>
            )}

            {data && data.content.length > 0 && (
                <>
                    <div className="flex items-center justify-between px-2">
                        <span className="font-semibold text-base text-blueDark">
                            {activeFilter.value?.trim()
                                ? "Resultados de búsqueda"
                                : "Evaluaciones almacenadas"}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">
                            Total: {data.totalElements}
                        </span>
                    </div>

                    <div
                        className={`flex flex-col gap-2 transition-opacity duration-300 ${
                            loading
                                ? "opacity-40 pointer-events-none"
                                : "opacity-100"
                        }`}
                    >
                        {data.content.map((test) => (
                            <TestListItem
                                key={test.testId}
                                testInfo={test}
                                onView={(id) =>
                                    router.push(
                                        `/dashboard/evaluaciones/evaluaciones-especificas/evaluacion?id=${id}`
                                    )
                                }
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                    {data.totalPages > 1 && (
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={data.totalPages}
                            first={data.first}
                            last={data.last}
                            loading={loading}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}

            {loading && (
                <div className="fixed inset-0 bg-white/20 backdrop-blur-[1px] flex justify-center items-center z-50">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                </div>
            )}
        </div>
    );
}
