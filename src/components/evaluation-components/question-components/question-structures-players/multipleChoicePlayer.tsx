import { ChoiceResponse, MultipleChoiceStructure } from "@/types/questionTypes";
import { parseJson } from "@/utils/parseJson";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { QuestionStructureComponentProps } from "../questionStructureRenderer";

export const MultipleChoicePlayer = ({
    structure,
    onAnswer,
    storedResponse,
}: QuestionStructureComponentProps) => {
    const parsedStructure = parseJson<MultipleChoiceStructure>(structure);

    const [selectedIds, setSelectedIds] = useState<number[]>(() => {
        if (!storedResponse) return [];

        const parsed = parseJson<ChoiceResponse>(storedResponse);

        if (!parsed) {
            console.error(
                "Ocurrio un error al parsear la respuesta guardada " +
                    storedResponse
            );
            return [];
        }

        return parsed.selectedAnswerIds;
    });

    

    if (!parsedStructure)
        return <p className="text-red-500">Error al cargar opciones</p>;

    const maxChoices = parsedStructure.correctAnswerCount;
    const isMultiple = maxChoices > 1;

    const handleSelect = (id: number) => {
        const isAlreadySelected = selectedIds.includes(id);
        let newSelection: number[] = [...selectedIds];

        if (isAlreadySelected) {
            // Si ya está seleccionada se quita
            newSelection = newSelection.filter((item) => item !== id);
        } else {
            // Si es una nueva selección:
            if (!isMultiple) {
                // Caso Selección Única: Reemplaza la anterior
                newSelection = [id];
            } else {
                // Caso Selección Múltiple: Se agrega si no se ha alcanzado el límite
                if (selectedIds.length < maxChoices) {
                    newSelection.push(id);
                } else {
                    console.warn(
                        `Solo puedes seleccionar ${maxChoices} opciones`
                    );
                    return;
                }
            }
        }

        setSelectedIds(newSelection);

        if (onAnswer) {
            const response: ChoiceResponse = { selectedAnswerIds: newSelection };
            onAnswer(JSON.stringify(response));
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <p className="text-sm font-medium text-gray-600">
                    {isMultiple
                        ? `Selecciona hasta ${maxChoices} opciones:`
                        : "Selecciona la respuesta correcta:"}
                </p>
                {isMultiple && (
                    <span
                        className={`text-xs font-bold ${
                            selectedIds.length === maxChoices
                                ? "text-blue"
                                : "text-gray-400"
                        }`}
                    >
                        {selectedIds.length} / {maxChoices}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 gap-3">
                {parsedStructure.answers.map((ans) => {
                    const isSelected = selectedIds.includes(ans.id);
                    const isLimitReached =
                        !isSelected &&
                        selectedIds.length >= maxChoices &&
                        isMultiple;

                    return (
                        <button
                            key={ans.id}
                            onClick={() => handleSelect(ans.id)}
                            disabled={isLimitReached} // Deshabilitar visualmente si ya no puede marcar más
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                                isSelected
                                    ? "border-green"
                                    : isLimitReached
                                    ? "border-gray-50 bg-gray-50 opacity-60 cursor-not-allowed"
                                    : "border-gray-100 hover:border-blue-200 bg-white"
                            }`}
                        >
                            <div
                                className={`w-5 h-5 flex items-center justify-center border-2 transition-colors ${
                                    isSelected
                                        ? "bg-blue-600 border-blue-600"
                                        : "border-gray-300"
                                } ${isMultiple ? "rounded" : "rounded-full"}`}
                            >
                                {isSelected && (
                                    <Check
                                        size={12}
                                        className="text-green"
                                        strokeWidth={4}
                                    />
                                )}
                            </div>
                            <span
                                className={
                                    isSelected
                                        ? "text-blue-900 font-semibold"
                                        : "text-gray-700"
                                }
                            >
                                {ans.text}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
