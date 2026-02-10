"use client";

import {
    PagedStudents,
    StudentInfo,
} from "@/api/apiCourses/interfaces/student-interfaces";
import {
    deleteStudentById,
    getStudentsPaged,
} from "@/api/apiCourses/services/student-services";
import StudentFormModal from "@/components/course-components/student-components/studentFormModal";
import StudentsPaginationTable from "@/components/course-components/student-components/studentPaginationTable";
import { Button } from "@/components/ui/buttons/button";
import Title from "@/components/ui/typography/title";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Estudiantes() {
    const [data, setData] = useState<PagedStudents | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleDelete = async (studentId: number) => {
        setLoading(true);
        const result = await deleteStudentById(studentId);

        if (typeof result === "string") {
            toast.error(result);
        } else {
            if (data && data.content.length === 1 && currentPage > 0) {
                setCurrentPage((prev) => prev - 1);
            } else {
                fetchStudents(currentPage);
            }
        }
        setLoading(false);
    };

    const handleEditSuccess = () => {
        setEditStudent(null);
        fetchStudents(currentPage);
    };

    const handleCreateSuccess = () => {
        setIsModalOpen(false);
        fetchStudents(0);
        setCurrentPage(0);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <Title title="Estudiantes" />
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-min items-center gap-2"
                >
                    <Plus size={18} />
                    Registrar Estudiante
                </Button>
            </div>

            <StudentsPaginationTable
                data={data}
                loading={loading}
                error={error}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onEdit={setEditStudent}
                onDelete={handleDelete}
                deleteMessage={
                    "¿Está seguro de que desea eliminar el estudiante? Esta acción no se puede deshacer."
                }
            />

            <StudentFormModal
                isOpen={isModalOpen || !!editStudent}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditStudent(null);
                }}
                onSuccess={
                    editStudent ? handleEditSuccess : handleCreateSuccess
                }
                initialData={editStudent}
            />
        </div>
    );
}
