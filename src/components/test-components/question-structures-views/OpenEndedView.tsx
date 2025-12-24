import { OpenEndedStructure } from "@/types/questionTypes";

export const OpenEndedView = ({ structure }: { structure: OpenEndedStructure }) => (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 rounded">
        <p className="text-sm text-blue-700 dark:text-blue-300 italic">
            Respuesta Abierta
        </p>
        <p className="mt-2 text-xs text-gray-400">
            Máximo de caracteres: {structure.maxResponseSize}
        </p>
    </div>
);
