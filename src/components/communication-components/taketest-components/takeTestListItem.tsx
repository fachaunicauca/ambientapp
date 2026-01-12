import { TestBasicInfo } from "@/api/apiEvaluation/interfaces/takeTest-interfaces";
import { Button } from "@/components/ui/buttons/button";
import { ClipboardCheck, PlayCircle } from "lucide-react";

interface TakeTestListItemProps {
    testInfo: TestBasicInfo;
    viewTeacher?: boolean;
}

export const TakeTestListItem = ({
    testInfo,
    viewTeacher = true,
}: TakeTestListItemProps) => {
    return (
        <div className="flex gap-4 items-start">
            {/* Información básica del Test */}
            <div className="flex gap-4 items-start mb-4 md:mb-0">
                <div className="p-2 rounded-lg text-gray-600">
                    <ClipboardCheck size={50}/>
                </div>

                <div className="space-y-1">
                    <h3 className="text-md font-bold text-gray-900">
                        {testInfo.testTitle}
                    </h3>

                    {/* Descripción completa siempre visible */}
                    <p className="text-sm text-gray-500 whitespace-pre-line">
                        {testInfo.testDescription || "Sin descripción"}
                    </p>

                    {viewTeacher && (
                        <p className="text-xs text-gray-400">
                            Docente: {testInfo.teacherEmail}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
