import React, { useState, useEffect } from "react";
import { Trash2, Plus, Check } from "lucide-react";
import { ChoiceAnswer, MultipleChoiceStructure } from "@/types/questionTypes";
import { Button } from "@/components/ui/buttons/button";
import { Textarea } from "@/components/ui/form/textarea";

interface MultipleChoiceBuilderProps {
    structure: string;
    onChange?: (newStructure: string) => void;
}

export default function MultipleChoiceBuilder({
    structure,
    onChange,
}: MultipleChoiceBuilderProps) {
    const [answers, setAnswers] = useState<ChoiceAnswer[]>([]);
    const [nextId, setNextId] = useState(1);
    const [isInitialized, setIsInitialized] = useState(false);

    // Parsear la estructura inicial SOLO UNA VEZ
    useEffect(() => {
        try {
            const parsed: MultipleChoiceStructure = JSON.parse(structure);
            if (parsed.answers && parsed.answers.length > 0) {
                setAnswers(parsed.answers);
                const maxId = Math.max(...parsed.answers.map((a) => a.id));
                setNextId(maxId + 1);
            } else {
                initializeDefaultAnswers();
            }
        } catch {
            initializeDefaultAnswers();
        }
        setIsInitialized(true);
    }, []); // ← Sin dependencias, solo se ejecuta al montar

    const initializeDefaultAnswers = () => {
        const defaultAnswers: ChoiceAnswer[] = [
            { id: 1, text: "", correct: false },
            { id: 2, text: "", correct: false },
        ];
        setAnswers(defaultAnswers);
        setNextId(3);
    };

    // Notificar cambios SOLO después de la inicialización
    useEffect(() => {
        if (isInitialized && answers.length > 0 && onChange) {
            const correctCount = answers.filter((a) => a.correct).length;
            const newStructure: MultipleChoiceStructure = {
                answers,
                correctAnswerCount: correctCount,
            };
            onChange(JSON.stringify(newStructure));
        }
    }, [answers, isInitialized]); // ← Removido onChange de las dependencias

    const addAnswer = () => {
        const newAnswer: ChoiceAnswer = {
            id: nextId,
            text: "",
            correct: false,
        };
        setAnswers([...answers, newAnswer]);
        setNextId(nextId + 1);
    };

    const removeAnswer = (id: number) => {
        setAnswers(answers.filter((a) => a.id !== id));
    };

    const updateAnswerText = (id: number, text: string) => {
        setAnswers(answers.map((a) => (a.id === id ? { ...a, text } : a)));
    };

    const toggleCorrect = (id: number) => {
        setAnswers(
            answers.map((a) =>
                a.id === id ? { ...a, correct: !a.correct } : a
            )
        );
    };

    const correctCount = answers.filter((a) => a.correct).length;

    return (
        <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Opciones de Respuesta
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {correctCount}{" "}
                    {correctCount === 1
                        ? "respuesta correcta"
                        : "respuestas correctas"}
                </span>
            </div>

            <div className="space-y-3">
                {answers.map((answer, index) => (
                    <div
                        key={answer.id}
                        className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                            {index + 1}
                        </div>

                        <Textarea
                            value={answer.text}
                            onChange={(e) => {
                                updateAnswerText(answer.id, e.target.value);
                                e.target.style.height = "auto";
                                e.target.style.height =
                                    e.target.scrollHeight + "px";
                            }}
                            placeholder="Escribe la opción de respuesta..."
                            rows={1}
                            className="flex-1 resize-none overflow-hidden h-min"
                        />

                        <Button
                            variant={"default"}
                            size="icon"
                            onClick={() => toggleCorrect(answer.id)}
                            className={`flex-shrink-0 ${
                                answer.correct
                                    ? "bg-green hover:bg-green text-white"
                                    : "bg-gray-200  text-gray-400 hover:bg-green hover:text-white"
                            }`}
                            title={
                                answer.correct
                                    ? "Marcar como incorrecta"
                                    : "Marcar como correcta"
                            }
                        >
                            <Check size={20} />
                        </Button>

                        <Button
                            variant={"destructive"}
                            size="icon"
                            onClick={() => removeAnswer(answer.id)}
                            title="Eliminar opción"
                        >
                            <Trash2 size={20} />
                        </Button>
                    </div>
                ))}
            </div>

            <Button variant={"default"} onClick={addAnswer}>
                <Plus size={20} />
                Agregar Opción
            </Button>
        </div>
    );
}
