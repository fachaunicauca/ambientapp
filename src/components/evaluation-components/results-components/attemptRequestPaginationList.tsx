"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { PaginationControls } from "@/components/ui/navigation/pagination-controls";
import { AttemptRequestListItem } from "./attemptRequestListItem";
import { PagedAttemptRequests } from "@/api/apiEvaluation/interfaces/testResults-interfaces";
import { getPendingAttemptRequests, resetStudentAttempts } from "@/api/apiEvaluation/services/testResults-services";
import { toast } from "sonner";

interface AttemptRequestsPaginationListProps {
    testId: number;
}

export default function AttemptRequestsPaginationList({
    testId,
}: AttemptRequestsPaginationListProps) {
    const [data, setData] = useState<PagedAttemptRequests | null>(null);
    const [error, setError] = useState<string>();
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchRequestsPage = async (page: number) => {
        setLoading(true);

        const result = await getPendingAttemptRequests(testId, page, 4);

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

    const handleResetAttempts = async (studentEmail: string) => {
        setLoading(true);

        const result = resetStudentAttempts(testId, studentEmail);

        if (typeof result === "string") {
            toast.error(result);
        } else {
             // Si la pagina queda vacia despues de solucionar una solicitud, cargar la pagina anterior
             if (data && data.content.length === 1 && currentPage > 0) {  
                await fetchRequestsPage(currentPage - 1);
             }else{
                await fetchRequestsPage(currentPage);
             }
        }

        setLoading(false);
    }

    useEffect(() => {
        if (testId) {
            fetchRequestsPage(0);
        }
    }, [testId]);

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
                No hay solicitudes pendientes para esta evaluación.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 mx-2">
            {/* Header */}
            <div className="flex justify-between items-center px-2">
                <h2 className="text-lg font-semibold text-gray-700">
                    Solicitudes Pendientes
                </h2>

                <span className="text-sm text-gray-500 font-medium">
                    Total: {data.totalElements}
                </span>
            </div>

            {/* Grid de solicitudes */}
            <div
                className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 transition-opacity duration-300 ${
                    loading ? "opacity-40 pointer-events-none" : "opacity-100"
                }`}
            >
                {data.content.map((request) => (
                    <AttemptRequestListItem
                        key={request.studentTestConfigId}
                        attemptRequestInfo={request}
                        onResetAttempts={handleResetAttempts}
                    />
                ))}
            </div>

            {/* Controles de paginación */}
            {data.totalPages > 1 && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={data.totalPages}
                    first={data.first}
                    last={data.last}
                    loading={loading}
                    onPageChange={fetchRequestsPage}
                />
            )}

            {/* Loading */}
            {loading && (
                <div className="fixed inset-0 bg-white/20 backdrop-blur-[1px] flex justify-center items-center z-50">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                </div>
            )}
        </div>
    );
}
