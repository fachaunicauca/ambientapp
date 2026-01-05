import { OpenEndedStructure } from "@/types/questionTypes";
import { parseStructure } from "@/utils/parseStructure";

export const OpenEndedView = ({ structure }: { structure: string }) => {
    const parsedStructure = parseStructure<OpenEndedStructure>(structure);

    if (!parsedStructure) {
        return (
            <div className="p-4 bg-redLight border border-redLight rounded">
                <p className="text-red text-sm">
                    Error al cargar la estructura de la pregunta
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 rounded">
            <p className="text-sm text-blue-700 dark:text-blue-300 italic">
                Respuesta Abierta
            </p>
            <p className="mt-2 text-xs text-gray-400">
                Máximo de caracteres: {parsedStructure.maxResponseSize}
            </p>
        </div>
    );
};
