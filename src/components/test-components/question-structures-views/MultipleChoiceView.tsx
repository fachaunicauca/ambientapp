import { MultipleChoiceStructure } from "@/types/questionTypes";


export const MultipleChoiceView = ({ structure }: { structure: MultipleChoiceStructure }) => (
    <div className="space-y-2">
        <p className="text-sm text-gray-500 italic">
            Opciones ({structure.correctAnswerCount} correctas):
        </p>
        <ul className="grid grid-cols-1 gap-2">
            {structure.answers.map((ans: any) => (
                <li
                    key={ans.id}
                    className={`p-3 rounded border ${
                        ans.correct
                            ? "bg-green- border-green dark:bg-green"
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
