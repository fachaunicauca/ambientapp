"use client";

import { PagedStudentsResults } from "@/api/apiEvaluation/interfaces/testResults-interfaces";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/layout/table";
import { PaginationControls } from "@/components/ui/navigation/pagination-controls";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getTestResultsPaged } from "@/api/apiEvaluation/services/testResults-services";
import { MAX_TEST_SCORE } from "@/config/testConfig";

interface StudentsResultsPaginationTableProps {
    testId: number;
}

export default function StudentsResultsPaginationTable({
    testId,
}: StudentsResultsPaginationTableProps) {
    const [data, setData] = useState<PagedStudentsResults | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const fetchResults = async (page: number) => {
        setLoading(true);

        const response = await getTestResultsPaged(testId, page, 10);

        if (typeof response === "string") {
            setError(response);
            setData(null);
        } else {
            setError(undefined);
            setData(response);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchResults(currentPage);
    }, [currentPage, testId]);

    if (error || !data || data.content.length === 0) {
        return (
            <div className="text-center p-6 border border-dashed rounded-xl text-gray-400">
                {error ?? "No hay resultados disponibles para esta evaluación."}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="border rounded-md overflow-hidden max-w-5xl mx-auto w-full">
                {/* Header */}
                <div className="px-4 py-3 border-b bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Resultados
                    </h2>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="font-bold text-gray-800">
                                Nombres
                            </TableHead>
                            <TableHead className="font-bold text-gray-800">
                                Apellidos
                            </TableHead>
                            <TableHead className="font-bold text-gray-800">
                                Correo electrónico
                            </TableHead>
                            <TableHead className="font-bold text-gray-800 text-center">
                                Intentos usados
                            </TableHead>
                            <TableHead className="font-bold text-gray-800 text-center">
                                Nota final
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.content.map((student) => (
                            <TableRow key={student.studentId}>
                                <TableCell>
                                    {student.studentFirstName}
                                </TableCell>
                                <TableCell>{student.studentLastName}</TableCell>
                                <TableCell>{student.studentEmail}</TableCell>
                                <TableCell className="text-center">
                                    {student.totalAttemptsUsed ?? 0}
                                </TableCell>
                                <TableCell className="text-center font-semibold">
                                    {student.finalScore !== null &&
                                    student.finalScore !== undefined
                                        ? (
                                              student.finalScore *
                                              MAX_TEST_SCORE
                                          ).toFixed(2)
                                        : "—"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {data.totalPages > 1 && (
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={data.totalPages}
                        first={data.first}
                        last={data.last}
                        loading={loading}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>

            {loading && (
                <div className="fixed inset-0 bg-white/20 backdrop-blur-[1px] flex justify-center items-center z-50">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                </div>
            )}
        </div>
    );
}
