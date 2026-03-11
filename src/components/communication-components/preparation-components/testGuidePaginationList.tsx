"use client";

import { useEffect, useState } from "react";
import {
    getGuidesPaged,
    deleteTestGuide,
} from "@/api/apiEvaluation/services/guide-services";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { PaginationControls } from "@/components/ui/navigation/pagination-controls";
import { TestGuideListItem } from "./testGuideListItem";
import { useAuthStore } from "@/store/authStore";
import { PagedTestGuides } from "@/api/apiEvaluation/interfaces/guide-interfaces";
import { toast } from "sonner";
import SearchBar from "@/components/ui/navigation/searchBar";
import { TEST_GUIDES_FILTERS } from "@/config/testConfig";

export default function TestGuidePaginationList() {
    const router = useRouter();

    const [data, setData] = useState<PagedTestGuides | null>(null);
    const [error, setError] = useState<string>();
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const roles = useAuthStore.getState().profile?.roles ?? [];

    const canDelete = roles.includes("ADMIN") || roles.includes("TEACHER");

    const [activeFilter, setActiveFilter] = useState<{
        key?: string;
        value?: string;
    }>({});

    const fetchGuidesPage = async (
        page: number,
        filterKey?: string,
        filterValue?: string
    ) => {
        setLoading(true);

        const result =
            filterKey && filterValue
                ? await getGuidesPaged(page, 5, filterKey, filterValue)
                : await getGuidesPaged(page, 5);

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
        if (
            filterKey === "teacherEmail" &&
            roles.includes("TEACHER") &&
            !roles.includes("ADMIN")
        ) {
            toast.error(
                "Solamente el administrador puede filtrar por docentes."
            );
            return;
        }

        const newFilter = { key: filterKey, value };

        setActiveFilter(newFilter);

        fetchGuidesPage(0, filterKey, value);
    };

    const handlePageChange = (page: number) => {
        fetchGuidesPage(page, activeFilter.key, activeFilter.value);
    };

    const handleDelete = async (id: string) => {
        setLoading(true);

        const result = await deleteTestGuide(id);

        if (typeof result === "string") {
            setError(result);
        } else {
            if (data && data.content.length === 1 && currentPage > 0) {
                await fetchGuidesPage(
                    currentPage - 1,
                    activeFilter.key,
                    activeFilter.value
                );
            } else {
                await fetchGuidesPage(
                    currentPage,
                    activeFilter.key,
                    activeFilter.value
                );
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchGuidesPage(0);
    }, []);

    return (
        <div className="flex flex-col gap-4 mx-2">
            <SearchBar
                placeholder="Buscar guía..."
                filters={TEST_GUIDES_FILTERS}
                onSearch={handleSearch}
            />

            {error && (
                <div className="text-center p-6 text-xl text-gray-400">
                    {error}
                </div>
            )}

            {!error && (!data || data.content.length === 0) && (
                <div className="text-center p-6 text-xl text-gray-400">
                    No hay guías registradas.
                </div>
            )}

            {data && data.content.length > 0 && (
                <>
                    <div className="flex items-center justify-between px-2">
                        <span className="font-semibold text-base text-blueDark">
                            {activeFilter.value?.trim()
                                ? "Resultados de búsqueda"
                                : "Guías almacenadas"}
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
                        {data.content.map((guide) => (
                            <TestGuideListItem
                                key={guide.testGuideId}
                                guide={guide}
                                canDelete={canDelete}
                                onDelete={handleDelete}
                                onView={(url) =>
                                    router.push(
                                        `/dashboard/comunicacion-riesgo/capacitacion/visualizar?url=${url}`
                                    )
                                }
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
