import {
    CourseInfo,
    PagedCourses,
} from "@/api/apiCourses/interfaces/course-interfaces";
import {
    deleteCourseById,
    getCoursesPaged,
} from "@/api/apiCourses/services/course-services";
import { useEffect, useState } from "react";
import { CourseListItem } from "./courseListItem";
import { PaginationControls } from "../ui/navigation/pagination-controls";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CoursePaginationList() {
    const router = useRouter();
    const [data, setData] = useState<PagedCourses | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchCoursesPage = async (page: number) => {
        setLoading(true);

        const result = await getCoursesPaged(page, 5);

        if (typeof result !== "string") {
            setData(result);
            setCurrentPage(page);
            setError(null);
        } else {
            setError(result);
            setData(null);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchCoursesPage(0);
    }, []);

    const handleDelete = async (id: number) => {
        setLoading(true);

        const result = deleteCourseById(id);

        if (typeof result === "string") {
            setError(result);
        } else {
            // Si la pagina queda vacia despues de eliminar una pregunta, cargar la pagina anterior
            if (data && data.content.length === 1 && currentPage > 0) {
                await fetchCoursesPage(currentPage - 1);
            } else {
                await fetchCoursesPage(currentPage);
            }
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-6 mx-2">
            {/* Header */}
            <div className="flex items-center justify-between px-2">
                <h3 className="font-semibold text-lg text-blueDark">
                    Lista de Cursos
                </h3>

                {data && (
                    <span className="text-sm text-gray-500 font-medium">
                        Total: {data.totalElements}
                    </span>
                )}
            </div>

            {/* Cursos paginados */}
            <div
                className={`flex flex-col gap-4 transition-opacity duration-300 ${
                    loading ? "opacity-40 pointer-events-none" : "opacity-100"
                }`}
            >
                {data?.content.map((course: CourseInfo) => (
                    <div key={course.courseId}>
                        <CourseListItem
                            courseInfo={course}
                            onDelete={handleDelete}
                            onView={() =>
                                router.push(
                                    `/dashboard/cursos/curso?id=${course.courseId}`
                                )
                            }
                        />
                    </div>
                ))}

                {error && (
                    <div className="text-center p-6 border border-dashed rounded-xl text-gray-400">
                        {error}
                    </div>
                )}
            </div>

            {/* Controles de paginación */}
            {data && data.totalPages > 1 && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={data.totalPages}
                    onPageChange={fetchCoursesPage}
                    loading={loading}
                    first={data.first}
                    last={data.last}
                />
            )}

            {/* Loader */}
            {loading && (
                <div className="fixed inset-0 bg-white/20 backdrop-blur-[1px] flex justify-center items-center z-50">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                </div>
            )}
        </div>
    );
}
