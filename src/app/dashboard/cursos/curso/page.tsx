"use client";

import { CourseInfo } from "@/api/apiCourses/interfaces/course-interfaces";
import { getCourseById } from "@/api/apiCourses/services/course-services";
import CourseFormModal from "@/components/course-components/courseFormModal";
import { Button } from "@/components/ui/buttons/button";
import Title from "@/components/ui/typography/title";
import { useAuthStore } from "@/store/authStore";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Curso() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get("id");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string>();
    const [courseInfo, setCourseInfo] = useState<CourseInfo>();
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

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditSuccess = () => {
        setIsModalOpen(false);
        fetchData();
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
                    <Plus size={18} />
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
