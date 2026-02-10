"use client";

import { CourseInfo } from "@/api/apiCourses/interfaces/course-interfaces";
import { PagedStudents } from "@/api/apiCourses/interfaces/student-interfaces";
import { getCourseById } from "@/api/apiCourses/services/course-services";
import {
    enrollStudentInCourse,
    getCourseStudents,
    unenrollStudentFromCourse,
} from "@/api/apiCourses/services/enrollment-services";
import CourseFormModal from "@/components/course-components/courseFormModal";
import StudentsPaginationTable from "@/components/course-components/student-components/studentPaginationTable";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/form/input";
import Title from "@/components/ui/typography/title";
import { useAuthStore } from "@/store/authStore";
import { Pencil, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Curso() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get("id");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string>();
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [studentsError, setStudentsError] = useState<string>();
    const [courseInfo, setCourseInfo] = useState<CourseInfo>();
    const [students, setStudents] = useState<PagedStudents>();
    const [currentStudentsPage, setCurrentStudentsPage] = useState(0);
    const [studentEmail, setStudentEmail] = useState("");
    const email = useAuthStore.getState().profile?.email || "";

    if (!courseId) {
        toast.error("ID del curso no proporcionado.");
        router.replace("/dashboard/cursos");
    }

    const fetchData = async () => {
        const result: CourseInfo | string = await getCourseById(
            Number(courseId)
        );

        if (typeof result === "string") {
            setCourseInfo(undefined);
            setError(result);
        } else {
            setCourseInfo(result as CourseInfo);
            setError(undefined);
        }
    };

    const fetchStudents = async (page: number) => {
        setLoadingStudents(true);
        const result = await getCourseStudents(Number(courseId), page, 10);

        if (typeof result === "string") {
            setStudents(undefined);
            setStudentsError(result);
        } else {
            setStudents(result as PagedStudents);
            setStudentsError(undefined);
        }
        setLoadingStudents(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (courseInfo) {
            fetchStudents(currentStudentsPage);
        }
    }, [courseInfo, currentStudentsPage]);

    const handleEditSuccess = () => {
        setIsModalOpen(false);
        fetchData();
    };

    const handleEnrollStudent = async () => {
        if (!studentEmail.trim()) {
            toast.error("Por favor ingresa el correo del estudiante.");
            return;
        }

        const result = await enrollStudentInCourse(
            studentEmail.trim(),
            Number(courseId)
        );

        if (result === true) {
            toast.success("Estudiante agregado al curso exitosamente.");
            setStudentEmail("");
            setCurrentStudentsPage(0);
            fetchStudents(0);
            return;
        }

        toast.error(result);
    };

    const handleUnenrollStudent = async (studentId: number) => {
        if(!studentId || !courseInfo) {
            toast.error("Id del estudiante o Curso no proporcionado.");
            return;
        }

        const result = await unenrollStudentFromCourse(studentId, courseInfo.courseId);

        if (result === true) {
            toast.success("Estudiante removido del curso exitosamente.");

            if (students && students.content.length === 1 && currentStudentsPage > 0) {
                setCurrentStudentsPage((prev) => prev - 1);
            } else{
                fetchStudents(currentStudentsPage);
            }
            return;
        }

        toast.error(result);
    };

    if (error) {
        return (
            <div className="text-center p-6 border border-dashed rounded-xl text-gray-400">
                {error
                    ? error
                    : "Ocurrió un error al cargar la informacion del curso."}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <Title title={courseInfo ? courseInfo.courseName : "Curso"} />
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-min items-center gap-2"
                >
                    <Pencil size={18} />
                    Editar Curso
                </Button>
            </div>

            {/* Informacion */}
            <div className="flex flex-col gap-4 p-6 border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                        ID del Curso:
                    </span>
                    <span className="text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-md">
                        {courseInfo?.courseId}
                    </span>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed w-11/12">
                    {courseInfo?.courseDescription || (
                        <span className="italic text-gray-400">
                            Sin descripción
                        </span>
                    )}
                </p>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Docente:</span>
                    <span className="text-sm font-medium text-gray-800">
                        {courseInfo?.teacherEmail}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 rounded-xl border bg-white p-4 shadow-sm">
                <Input
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="Correo del estudiante"
                    className="w-3/12 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <Button
                    onClick={handleEnrollStudent}
                    variant={"default"}
                    className="w-min"
                >
                    <Plus size={18} />
                    Agregar estudiante
                </Button>
            </div>

            {studentsError || !students ? (
                <div className="text-center p-6 border border-dashed rounded-xl text-gray-400">
                    {studentsError
                        ? studentsError
                        : "No se pudieron cargar los estudiantes del curso."}
                </div>
            ) : (
                <StudentsPaginationTable
                    data={students}
                    loading={loadingStudents}
                    currentPage={currentStudentsPage}
                    onPageChange={setCurrentStudentsPage}
                    onDelete={handleUnenrollStudent}
                    deleteMessage={
                        "¿Está seguro de que desea eliminar el estudiante del curso? Esta acción no se puede deshacer."
                    }
                    subtitle="Estudiantes matriculados en este curso"
                />
            )}

            <CourseFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleEditSuccess}
                initialData={courseInfo}
                teacherEmail={email}
            />
        </div>
    );
}
