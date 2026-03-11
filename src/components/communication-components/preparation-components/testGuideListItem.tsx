import { Button } from "@/components/ui/buttons/button";
import { Trash2, FileText, Eye } from "lucide-react";
import ConfirmDialog from "@/components/ui/modals/confirmDialog";
import { TestGuide } from "@/api/apiEvaluation/interfaces/guide-interfaces";

interface TestGuideListItemProps {
    guide: TestGuide;
    onView: (url: string) => void;
    canDelete?: boolean;
    onDelete?: (id: string) => void;
}

export const TestGuideListItem = ({
    guide,
    onView,
    canDelete = false,
    onDelete,
}: TestGuideListItemProps) => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-white border border-gray-200 rounded-lg">
            {/* Información */}
            <div className="flex items-start gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blueLight text-white">
                    <FileText size={20} />
                </div>

                <div>
                    <h3 className="text-base font-semibold text-blueDark">
                        {guide.testGuideId.replaceAll("_", " ")}
                    </h3>

                    <p className="text-xs text-gray-400">
                        Docente:{" "}
                        <span className="font-medium">
                            {guide.teacherEmail}
                        </span>
                    </p>
                </div>
            </div>

            {/* Acciones */}

            <div className="flex gap-2 w-full md:w-auto">
                <Button
                    variant="outline"
                    onClick={() => onView(guide.testGuideUrl)}
                    className="flex-1 md:flex-none gap-2 border-gray-700 text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                >
                    <Eye size={16} />
                    Ver Guía
                </Button>
                {canDelete && onDelete && (
                    <ConfirmDialog
                        title="¿Eliminar guía?"
                        description={`¿Estás seguro de que deseas eliminar esta guía? Esta acción no se puede deshacer.`}
                        onConfirm={() => onDelete(guide.testGuideId)}
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
                )}
            </div>
        </div>
    );
};
