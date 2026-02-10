import { CourseInfo } from "@/api/apiCourses/interfaces/course-interfaces";
import { ClipboardCheck, Eye, Trash2 } from "lucide-react";
import { Button } from "../ui/buttons/button";
import ConfirmDialog from "../ui/modals/confirmDialog";

interface CourseListItemProps {
    courseInfo: CourseInfo;
    onView: (id: number) => void;
    onDelete: (id: number) => void;
}

export const CourseListItem = ({
    courseInfo,
    onView,
    onDelete,
}: CourseListItemProps) => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-start gap-4">
                {/* Icono */}
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blueLight text-white">
                    <ClipboardCheck size={20} />
                </div>

                {/* Información */}
                <div className="space-y-1">
                    <h3 className="text-base font-semibold text-blueDark">
                        {courseInfo.courseName}
                    </h3>

                    <p className="text-sm text-gray-500 whitespace-pre-line max-w-3xl">
                        {courseInfo.courseDescription || "Sin descripción"}
                    </p>

                    <p className="text-xs text-gray-400">
                        Docente:{" "}
                        <span className="font-medium">
                            {courseInfo.teacherEmail}
                        </span>
                    </p>
                </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-2 w-full md:w-auto">
                <Button
                    variant="outline"
                    onClick={() => onView(courseInfo.courseId)}
                    className="flex-1 md:flex-none gap-2 border-gray-700 text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                >
                    <Eye size={16} />
                    Detalles
                </Button>

                <ConfirmDialog
                    title="¿Eliminar curso?"
                    description={`¿Estás seguro de que deseas eliminar el curso: "${courseInfo.courseName}"? Esta acción no se puede deshacer.`}
                    onConfirm={() => onDelete(courseInfo.courseId)}
                    trigger={
                        <Button
                            variant="destructive"
                            className="flex-1 md:flex-none gap-2 border-red text-white hover:bg-red"
                        >
                            <Trash2 size={16} />
                            Eliminar
                        </Button>
                    }
                    confirmText="Eliminar"
                    confirmVariant="destructive"
                />
            </div>
        </div>
    );
};
