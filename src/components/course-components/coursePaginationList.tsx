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
import SearchBar from "../ui/navigation/searchBar";
import { COURSES_FILTERS } from "@/config/testConfig";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export default function CoursePaginationList() {
    const router = useRouter();
    const [data, setData] = useState<PagedCourses | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const isAdmin =
        useAuthStore.getState().profile?.roles?.includes("ADMIN") ?? false;

    const [activeFilter, setActiveFilter] = useState<{
        key?: string;
        value?: string;
    }>({});

    const fetchCoursesPage = async (
        page: number,
        filterKey?: string,
        filterValue?: string
    ) => {
        setLoading(true);

        const result =
            filterKey && filterValue
                ? await getCoursesPaged(page, 5, filterKey, filterValue)
                : await getCoursesPaged(page, 5);

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

    const handleSearch = (value: string, filterKey?: string) => {
        if (filterKey === "teacherEmail" && isAdmin === false) {
            toast.error(
                "Solamente el administrador puede filtrar por docentes."
            );
        } else {
            const newFilter = { key: filterKey, value };
            setActiveFilter(newFilter);
            fetchCoursesPage(0, filterKey, value);
        }
    };

    const handlePageChange = (page: number) => {
        fetchCoursesPage(page, activeFilter.key, activeFilter.value);
    };

    const handleDelete = async (id: number) => {
        setLoading(true);

        const result = deleteCourseById(id);

        if (typeof result === "string") {
            setError(result);
        } else {
            if (data && data.content.length === 1 && currentPage > 0) {
                await fetchCoursesPage(
                    currentPage - 1,
                    activeFilter.key,
                    activeFilter.value
                );
            } else {
                await fetchCoursesPage(
                    currentPage,
                    activeFilter.key,
                    activeFilter.value
                );
            }
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-6 mx-2">
            <SearchBar
                placeholder="Buscar curso..."
                filters={COURSES_FILTERS}
                onSearch={handleSearch}
            />
            {/* Header */}
            {data && (
                <div className="flex items-center justify-between px-2">
                    <h3 className="font-semibold text-base text-blueDark">
                        {activeFilter.value?.trim()
                            ? "Resultados de búsqueda"
                            : "Cursos almacenados"}
                    </h3>

                    <span className="text-sm text-gray-500 font-medium">
                        Total: {data.totalElements}
                    </span>
                </div>
            )}

            {/* Cursos paginados */}
            <div
                className={`flex flex-col gap-2 transition-opacity duration-300 ${
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
                    <div className="text-center p-6 text-lg text-gray-400">
                        {error}
                    </div>
                )}
            </div>

            {/* Controles de paginación */}
            {data && data.totalPages > 1 && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={data.totalPages}
                    onPageChange={handlePageChange}
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
