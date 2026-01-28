import { TestBasicInfo } from "@/api/apiEvaluation/interfaces/takeTest-interfaces";
import { ClipboardList } from "lucide-react";

interface TakeTestListItemProps {
    testInfo: TestBasicInfo;
    viewTeacher?: boolean;
}

export const TakeTestListItem = ({
    testInfo,
    viewTeacher = true,
}: TakeTestListItemProps) => {
    return (
        <div className="flex items-start gap-4">
            {/* Icono */}
            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blueLight text-white">
                <ClipboardList size={20} />
            </div>

            {/* Información */}
            <div className="space-y-1">
                <h3 className="text-base font-semibold text-blueDark">
                    {testInfo.testTitle}
                </h3>

                {/* Descripción completa */}
                <p className="text-sm text-gray-500 whitespace-pre-line max-w-3xl">
                    {testInfo.testDescription || "Sin descripción"}
                </p>

                {viewTeacher && (
                    <p className="text-xs text-gray-400">
                        Docente:{" "}
                        <span className="font-medium">
                            {testInfo.teacherEmail}
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};
