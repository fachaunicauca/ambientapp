import { TestBasicInfo } from "@/api/apiEvaluation/interfaces/takeTest-interfaces";
import { Button } from "@/components/ui/buttons/button";
import { ClipboardCheck, PlayCircle } from "lucide-react";

interface TakeTestListItemProps {
    testInfo: TestBasicInfo;
    onTake: (id: number) => void;
}

export const TakeTestListItem = ({
    testInfo,
    onTake,
}: TakeTestListItemProps) => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all mb-3">
            {/* Información básica del Test */}
            <div className="flex gap-4 items-start mb-4 md:mb-0">
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    <ClipboardCheck size={20} />
                </div>

                <div className="space-y-1">
                    <h3 className="text-md font-bold text-gray-900">
                        {testInfo.testTitle}
                    </h3>

                    {/* Descripción completa siempre visible */}
                    <p className="text-sm text-gray-500 whitespace-pre-line">
                        {testInfo.testDescription || "Sin descripción"}
                    </p>

                    <p className="text-xs text-gray-400">
                        Docente: {testInfo.teacherEmail}
                    </p>
                </div>
            </div>

            {/* Acción presentar */}
            <div className="flex w-full md:w-auto">
                <Button
                    onClick={() => onTake(testInfo.testId)}
                    className="flex-1 md:flex-none gap-2"
                >
                    <PlayCircle size={16} />
                    Presentar evaluación
                </Button>
            </div>
        </div>
    );
};
