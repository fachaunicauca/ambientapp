import { MultipleChoiceStructure } from "@/types/questionTypes";
import { parseJson } from "@/utils/parseJson";
import { QuestionStructureComponentProps } from "../questionStructureRenderer";

export const MultipleChoiceView = ({
    structure,
}: QuestionStructureComponentProps) => {
    const parsedStructure = parseJson<MultipleChoiceStructure>(structure);

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
        <div className="space-y-2">
            <p className="text-sm text-gray-500 italic">
                Opciones ({parsedStructure.correctAnswerCount} correctas):
            </p>
            <ul className="grid grid-cols-1 gap-2">
                {parsedStructure.answers.map((ans: any) => (
                    <li
                        key={ans.id}
                        className={`p-3 rounded border ${
                            ans.correct
                                ? "border-green dark:bg-green"
                                : "bg-gray-50 border-gray-200 dark:bg-gray-700"
                        }`}
                    >
                        <span
                            className={
                                ans.correct
                                    ? "font-bold text-green dark:text-green"
                                    : ""
                            }
                        >
                            {ans.text} {ans.correct && "✓"}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
