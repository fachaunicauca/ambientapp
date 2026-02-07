"use client";

import { Eye, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/buttons/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/layout/table";
import {
    PagedStudents,
    StudentInfo,
} from "@/api/apiStudents/interfaces/student-interfaces";
import { useEffect, useState } from "react";
import {
    deleteStudentById,
    getStudentsPaged,
} from "@/api/apiStudents/services/student-services";
import { PaginationControls } from "../ui/navigation/pagination-controls";
import StudentFormModal from "./studentFormModal";
import { toast } from "sonner";
import ConfirmDialog from "../ui/modals/confirmDialog";

export default function StudentsPaginationTable() {
    const [data, setData] = useState<PagedStudents | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editStudent, setEditStudent] = useState<StudentInfo | null>(null);

    const fetchStudents = async (page: number) => {
        setLoading(true);
        const response = await getStudentsPaged(page, 10);

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
        fetchStudents(currentPage);
    }, [currentPage]);

    const handleEditStudentSuccess = () => {
        setIsEditModalOpen(false);
        fetchStudents(currentPage);
    };

    const handleDeleteStudent = async (studentId: number) => {
        setLoading(true);

        const result = await deleteStudentById(studentId);

        if (typeof result === "string") {
            toast.error(result);
        } else {
            // Si la pagina queda vacia despues de eliminar un estudiante, cargar la pagina anterior
            if (data && data.content.length === 1 && currentPage > 0) {
                await fetchStudents(currentPage - 1);
            } else {
                await fetchStudents(currentPage);
            }
        }

        setLoading(false);
    };

    if (error || !data || data.content.length === 0) {
        return (
            <div className="text-center p-6 border border-dashed rounded-xl text-gray-400">
                {error ? error : "Ocurrio un error al obtener los estudiantes."}
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
                        <TableHead className="text-blue font-medium">
                            Nombres
                        </TableHead>
                        <TableHead className="text-blue font-medium">
                            Apellidos
                        </TableHead>
                        <TableHead className="text-blue font-medium">
                            Correo electrónico
                        </TableHead>
                        <TableHead className="text-blue font-medium text-right">
                            Acciones
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.content.map((student) => (
                        <TableRow
                            key={student.studentId}
                            className="hover:bg-gray-50"
                        >
                            <TableCell className="text-blue">
                                {student.studentFirstName}
                            </TableCell>
                            <TableCell className="text-blue">
                                {student.studentLastName}
                            </TableCell>
                            <TableCell className="text-blue">
                                {student.studentEmail}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-blue hover:bg-white hover:text-blue"
                                        onClick={() => {
                                            setEditStudent(student);
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>

                                    <ConfirmDialog
                                        title="¿Eliminar estudiante?"
                                        description="¿Estás seguro de que deseas eliminar este estudiante de la plataforma? Esta acción no se puede deshacer."
                                        onConfirm={() =>
                                            handleDeleteStudent(
                                                student.studentId
                                            )
                                        }
                                        trigger={
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-redLight hover:bg-white hover:text-red-500"
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

            {data && data.totalPages > 1 && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={data.totalPages}
                    first={data.first}
                    last={data.last}
                    loading={loading}
                    onPageChange={(page) => {
                        setCurrentPage(page);
                        fetchStudents(page);
                    }}
                />
            )}

            <StudentFormModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={handleEditStudentSuccess}
                initialData={editStudent}
            />

            {loading && (
                <div className="fixed inset-0 bg-white/20 backdrop-blur-[1px] flex justify-center items-center z-50">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                </div>
            )}
        </div>
    );
}
