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

export default function TestsPaginationList() {
    const router = useRouter();
    const [data, setData] = useState<PagedTests | null>(null);
    const [error, setError] = useState<string>();
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchTestsPage = async (page: number) => {
        setLoading(true);
        const result = await getTestsPaged(page, 5);

        if (typeof result !== "string") {
            setData(result);
            setCurrentPage(page);
        } else {
            setError(result);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        setLoading(true);
        const result = await deleteTest(id);
        if (typeof result === "string") {
            setError(result);
        } else {
            fetchTestsPage(currentPage);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTestsPage(0);
    }, []);

    if (error) {
        return (
            <div className="text-center p-6 border border-dashed rounded-xl text-gray-400">
                {error}
            </div>
        );
    }

    if (!data || data.content.length === 0) {
        return (
            <div className="text-center p-10 border-2 border-dashed rounded-xl text-gray-400 mx-2">
                No hay evaluaciones registradas.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 mx-2">
            {/* Header */}
            <div className="flex justify-end px-2">
                <span className="text-sm text-gray-500 font-medium">
                    Total: {data.totalElements}
                </span>
            </div>

            {/* Lista de Tests */}
            <div
                className={`flex flex-col gap-1 transition-opacity duration-300 ${
                    loading ? "opacity-40 pointer-events-none" : "opacity-100"
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

            {/* Controles de Paginación */}
            <div className="flex items-center justify-between py-6 mt-2 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                    Página{" "}
                    <span className="font-bold text-gray-900">
                        {data.number + 1}
                    </span>{" "}
                    de {data.totalPages}
                </p>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => {
                            fetchTestsPage(currentPage - 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={data.first || loading}
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
                        disabled={data.last || loading}
                        className="gap-2"
                    >
                        Siguiente
                        <ChevronRight size={18} />
                    </Button>
                </div>
            </div>

            {loading && (
                <div className="fixed inset-0 bg-white/20 backdrop-blur-[1px] flex justify-center items-center z-50">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                </div>
            )}
        </div>
    );
}
