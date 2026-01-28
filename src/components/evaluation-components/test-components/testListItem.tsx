import { Button } from "@/components/ui/buttons/button";
import { Eye, Trash2, FileText } from "lucide-react";
import ConfirmDialog from "@/components/ui/modals/confirmDialog";
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-white border border-gray-200 rounded-lg">
            {/* Información */}
            <div className="flex items-start gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blueLight text-white">
                    <FileText size={20} />
                </div>

                <div>
                    <h3 className="text-base font-semibold text-blueDark">
                        {testInfo.testTitle}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2 max-w-xl">
                        {testInfo.testDescription || "Sin descripción"}
                    </p>
                </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-2 w-full md:w-auto">
                <Button
                    variant="outline"
                    onClick={() => onView(testInfo.testId)}
                    className="flex-1 md:flex-none gap-2 border-gray-700 text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                >
                    <Eye size={16} />
                    Detalles
                </Button>

                <ConfirmDialog
                    title="¿Eliminar evaluación?"
                    description={`¿Estás seguro de que deseas eliminar "${testInfo.testTitle}"? Esta acción no se puede deshacer.`}
                    onConfirm={() => onDelete(testInfo.testId)}
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
