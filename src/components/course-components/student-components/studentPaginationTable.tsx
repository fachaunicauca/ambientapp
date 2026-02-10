"use client";

import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../ui/buttons/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/layout/table";
import {
    PagedStudents,
    StudentInfo,
} from "@/api/apiCourses/interfaces/student-interfaces";
import { PaginationControls } from "../../ui/navigation/pagination-controls";
import ConfirmDialog from "../../ui/modals/confirmDialog";

interface StudentsPaginationTableProps {
    data: PagedStudents | null;
    loading: boolean;
    error?: string;
    currentPage: number;
    onPageChange: (page: number) => void;
    onEdit?: (student: StudentInfo) => void;
    onDelete: (studentId: number) => void;
    deleteMessage: string;
}

export default function StudentsPaginationTable({
    data,
    loading,
    error,
    currentPage,
    onPageChange,
    onEdit,
    onDelete,
    deleteMessage,
}: StudentsPaginationTableProps) {
    if (error || !data || data.content.length === 0) {
        return (
            <div className="text-center p-6 border border-dashed rounded-xl text-gray-400">
                {error ?? "No hay estudiantes registrados."}
            </div>
        );
    }

    return (
        <div className="border rounded-md overflow-hidden max-w-4xl mx-auto w-full">
            {/* Header de la tabla */}
            <div className="px-4 py-3 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">
                    Lista de estudiantes
                </h2>
                <p className="text-sm text-gray-500">
                    Estudiantes registrados en el sistema
                </p>
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
                        <TableHead className="font-bold text-gray-800 text-right">
                            Acciones
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.content.map((student) => (
                        <TableRow key={student.studentId}>
                            <TableCell className="text-gray-800">
                                {student.studentFirstName}
                            </TableCell>
                            <TableCell className="text-gray-800">
                                {student.studentLastName}
                            </TableCell>
                            <TableCell className="text-gray-800">
                                {student.studentEmail}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    {onEdit && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(student)}
                                            className="text-blueDark hover:text-white hover:bg-blueLight"
                                        >
                                            <Pencil />
                                        </Button>
                                    )}

                                    <ConfirmDialog
                                        title="¿Eliminar estudiante?"
                                        description={deleteMessage}
                                        onConfirm={() =>
                                            onDelete(student.studentId)
                                        }
                                        trigger={
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-redLight hover:text-white hover:bg-redLight"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        }
                                        confirmText="Eliminar"
                                        confirmVariant="destructive"
                                    />
                                </div>
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
                    onPageChange={onPageChange}
                />
            )}

            {loading && (
                <div className="fixed inset-0 bg-white/20 backdrop-blur-[1px] flex justify-center items-center z-50">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                </div>
            )}
        </div>
    );
}
