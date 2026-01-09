import { QuestionMode, QuestionType } from "@/types/questionTypes";
import { MultipleChoiceView } from "./question-structures-views/MultipleChoiceView";
import { OpenEndedView } from "./question-structures-views/OpenEndedView";
import MultipleChoiceBuilder from "./question-structures-builders/MultipleChoiceBuilder";
import { MultipleChoicePlayer } from "./question-structures-players/multipleChoicePlayer";

export interface QuestionStructureComponentProps {
    structure: string;
    onChange?: (newStructure: string) => void; // Para builders
    // Para players
    onAnswer?: (answer: string) => void; 
    storedResponse?: string;
}

interface QuestionStructureRendererProps {
    mode: QuestionMode;
    questionType: QuestionType;
    structure: string;
    onChange?: (newStructure: string) => void; // Para builders
    // Para players
    onAnswer?: (answer: string) => void; 
    storedResponse?: string;
}

type ComponentMap = {
    [K in QuestionMode]: {
        [T in QuestionType]: React.ComponentType<QuestionStructureComponentProps>;
    };
};

const QuestionComponentFactory: ComponentMap = {
    viewer: {
        MULTIPLE_CHOICE: MultipleChoiceView,
        OPEN_ENDED: OpenEndedView,
    },
    builder: {
        MULTIPLE_CHOICE: MultipleChoiceBuilder,
        OPEN_ENDED: OpenEndedView,
    },
    player: {
        MULTIPLE_CHOICE: MultipleChoicePlayer,
        OPEN_ENDED: OpenEndedView,
    },
};

const getQuestionComponent = (
    mode: QuestionMode,
    questionType: QuestionType
): React.ComponentType<QuestionStructureComponentProps> | null => {
    const modeComponents = QuestionComponentFactory[mode];
    if (!modeComponents) return null;

    return modeComponents[questionType] || null;
};

export const QuestionStructureRenderer: React.FC<
    QuestionStructureRendererProps
> = ({ mode, questionType, structure, onChange, onAnswer, storedResponse }) => {
    const Component = getQuestionComponent(mode, questionType);

    if (!Component) {
        return (
            <div className="p-4 border border-red-300 bg-red-50 rounded">
                <p className="text-red-600">
                    Estructura de pregunta no soportado: {structure}
                </p>
            </div>
        );
    }

    return <Component structure={structure} onChange={onChange} onAnswer={onAnswer} storedResponse={storedResponse}/>;
};
