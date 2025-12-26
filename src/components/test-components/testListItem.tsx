import { Button } from "@/components/ui/buttons/button";
import { Eye, Trash2, ClipboardCheck } from "lucide-react";
import DeleteConfirmDialog from "../ui/modals/confirmDeleteModal";
import { TestInfo } from "@/api/apiEvaluation/interfaces/test-interfaces";

interface TestListItemProps {
    testInfo: TestInfo;
    onView: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TestListItem = ({
    testInfo,
    onView,
    onDelete,
}: TestListItemProps) => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all mb-3">
            {/* Información basica del Test */}
            <div className="flex gap-4 items-start mb-4 md:mb-0">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                    <ClipboardCheck size={20} />
                </div>
                <div>
                    <h3 className="text-md font-bold text-gray-900">{testInfo.testTitle}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                        {testInfo.testDescription || "Sin descripción"}
                    </p>
                </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-2 w-full md:w-auto">
                <Button
                    variant="outline"
                    onClick={() => onView(testInfo.testId)}
                    className="flex-1 md:flex-none gap-2"
                >
                    <Eye size={16} />
                    Detalles
                </Button>

                <DeleteConfirmDialog
                    title="¿Eliminar evaluación?"
                    description={`¿Estás seguro de que deseas eliminar "${testInfo.testTitle}"? Todos los datos asociados se perderán permanentemente.`}
                    onConfirm={() => onDelete(testInfo.testId)}
                    trigger={
                        <Button
                            variant="outline"
                            className="flex-1 md:flex-none gap-2 text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                        >
                            <Trash2 size={16} />
                            Eliminar
                        </Button>
                    }
                />
            </div>
        </div>
    );
};
