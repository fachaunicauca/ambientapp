"use client";

import { useEffect, useState } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/modals/dialog";

import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/form/input";
import {
    ChevronDown,
    Upload,
    FileText,
    ChevronsDownUp,
    ChevronsUpDown,
    ChevronUp,
} from "lucide-react";

interface QuestionImporterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImport: (file: File, selectedIndexes: number[]) => void;
}

interface Question {
    index: number;
    text: string;
    type: string;
}

interface Category {
    name: string;
    questions: Question[];
}

export default function QuestionImporterModal({
    isOpen,
    onClose,
    onImport,
}: QuestionImporterModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [categories, setCategories] = useState<Category[]>([]);
    const [selected, setSelected] = useState<Set<number>>(new Set());
    const [openCategories, setOpenCategories] = useState<Set<string>>(
        new Set()
    );
    const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(
        new Set()
    );

    useEffect(() => {
        if (!isOpen) {
            setFile(null);
            setErrors({});
            setCategories([]);
            setSelected(new Set());
        }
    }, [isOpen]);

    const parseXML = (xmlText: string) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");

        const questionNodes = Array.from(xml.getElementsByTagName("question"));

        let currentCategory = "Sin categoría";
        const categoryMap: Record<string, Question[]> = {};

        let index = 1;

        questionNodes.forEach((q) => {
            const type = q.getAttribute("type") || "";

            if (type === "category") {
                const text =
                    q.getElementsByTagName("text")[0]?.textContent || "";
                currentCategory = text.split("/").pop() || "Sin categoría";
                return;
            }

            const questionTextNode = q
                .getElementsByTagName("questiontext")[0]
                ?.getElementsByTagName("text")[0];

            if (!questionTextNode) return;

            const rawText = questionTextNode.textContent || "";
            const cleanText = rawText.replace(/<[^>]+>/g, "").trim();

            if (!categoryMap[currentCategory]) {
                categoryMap[currentCategory] = [];
            }

            categoryMap[currentCategory].push({
                index,
                text: cleanText,
                type,
            });

            index++;
        });

        const parsedCategories: Category[] = Object.entries(categoryMap).map(
            ([name, questions]) => ({
                name,
                questions,
            })
        );

        setCategories(parsedCategories);
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        if (!selectedFile.name.endsWith(".xml")) {
            setErrors({ file: "El archivo debe estar en formato XML." });
            return;
        }

        const text = await selectedFile.text();
        parseXML(text);

        setFile(selectedFile);
        setErrors({});
    };

    const isSelectable = (type: string) =>
        type === "multichoice" || type === "truefalse";

    const toggleQuestion = (index: number) => {
        const newSet = new Set(selected);
        if (newSet.has(index)) {
            newSet.delete(index);
        } else {
            newSet.add(index);
        }
        setSelected(newSet);
    };

    const toggleCategory = (category: Category) => {
        const newSet = new Set(selected);

        const selectableQuestions = category.questions.filter((q) =>
            isSelectable(q.type)
        );

        const allSelected = selectableQuestions.every((q) =>
            newSet.has(q.index)
        );

        selectableQuestions.forEach((q) => {
            if (allSelected) newSet.delete(q.index);
            else newSet.add(q.index);
        });

        setSelected(newSet);
    };

    const allSelectable = categories
        .flatMap((c) => c.questions)
        .filter((q) => isSelectable(q.type));

    const allSelected =
        allSelectable.length > 0 &&
        allSelectable.every((q) => selected.has(q.index));

    const someSelected =
        !allSelected && allSelectable.some((q) => selected.has(q.index));

    const toggleAll = () => {
        const newSet = new Set<number>();

        if (!allSelected) {
            allSelectable.forEach((q) => newSet.add(q.index));
        }

        setSelected(newSet);
    };

    const toggleOpenCategory = (name: string) => {
        const newSet = new Set(openCategories);
        if (newSet.has(name)) {
            newSet.delete(name);
        } else {
            newSet.add(name);
        }
        setOpenCategories(newSet);
    };

    const handleSubmit = () => {
        if (!file) {
            setErrors({ file: "Debes seleccionar un archivo." });
            return;
        }

        if (selected.size === 0) {
            setErrors({ general: "Debes seleccionar al menos una pregunta." });
            return;
        }

        onImport(
            file,
            Array.from(selected).sort((a, b) => a - b)
        );
        handleClose();
    };

    const handleClose = () => {
        setErrors({});
        setFile(null);
        setCategories([]);
        setSelected(new Set());
        setExpandedQuestions(new Set());
        onClose();
    };

    const isCategoryAllSelected = (category: Category) => {
        const selectable = category.questions.filter((q) =>
            isSelectable(q.type)
        );
        return (
            selectable.length > 0 &&
            selectable.every((q) => selected.has(q.index))
        );
    };

    const isCategorySomeSelected = (category: Category) => {
        const selectable = category.questions.filter((q) =>
            isSelectable(q.type)
        );
        return (
            selectable.some((q) => selected.has(q.index)) &&
            !isCategoryAllSelected(category)
        );
    };

    const toggleExpand = (index: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const newSet = new Set(expandedQuestions);
        if (newSet.has(index)) {
            newSet.delete(index);
        } else {
            newSet.add(index);
        }
        setExpandedQuestions(newSet);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold tracking-tight">
                        Importar Preguntas
                    </DialogTitle>
                </DialogHeader>

                {/* Archivo */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Archivo Moodle XML *
                    </label>

                    <label
                        className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors
                            ${
                                file
                                    ? "border-primary/50 bg-primary/5"
                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                    >
                        {file ? (
                            <FileText size={36} className="mb-2 text-primary" />
                        ) : (
                            <Upload size={36} className="mb-2 text-gray-400" />
                        )}

                        <span
                            className={`text-sm font-medium ${
                                file ? "text-primary" : "text-gray-500"
                            }`}
                        >
                            {file ? file.name : "Seleccionar archivo XML"}
                        </span>

                        {!file && (
                            <span className="text-xs text-gray-400 mt-1">
                                Solo archivos .xml de Moodle
                            </span>
                        )}

                        <Input
                            type="file"
                            accept=".xml"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {errors.file && (
                        <p className="mt-1.5 text-xs text-redLight">
                            {errors.file}
                        </p>
                    )}
                </div>

                {/* Seleccionar todo */}
                {categories.length > 0 && (
                    <div className="mt-4 flex items-center gap-3 px-1">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    ref={(el) => {
                                        if (el) el.indeterminate = someSelected;
                                    }}
                                    onChange={toggleAll}
                                    className="w-[18px] h-[18px] rounded border-gray-300 accent-primary cursor-pointer"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                                Seleccionar todas las preguntas
                            </span>
                        </label>

                        <span className="ml-auto text-xs text-gray-400 font-medium">
                            {selected.size} / {allSelectable.length}{" "}
                            seleccionadas
                        </span>
                    </div>
                )}

                {/* Separador */}
                {categories.length > 0 && <hr className="border-gray-100" />}

                {/* Lista de categorías */}
                <div className="space-y-3">
                    {categories.map((cat) => (
                        <div
                            key={cat.name}
                            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                        >
                            {/* Header de la categoría */}
                            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors">
                                {/* Checkbox de la categoría */}
                                <input
                                    type="checkbox"
                                    checked={isCategoryAllSelected(cat)}
                                    ref={(el) => {
                                        if (el)
                                            el.indeterminate =
                                                isCategorySomeSelected(cat);
                                    }}
                                    onChange={() => toggleCategory(cat)}
                                    className="w-[18px] h-[18px] rounded border-gray-300 accent-primary cursor-pointer flex-shrink-0"
                                />

                                {/* Botón de colapsar de la categoria*/}
                                <button
                                    onClick={() => toggleOpenCategory(cat.name)}
                                    className="flex items-center gap-1.5 flex-1 min-w-0 text-left"
                                >
                                    <span className="text-sm font-semibold text-gray-800 truncate">
                                        {cat.name}
                                    </span>

                                    <span className="ml-1 text-xs text-gray-400 font-normal flex-shrink-0">
                                        (
                                        {
                                            cat.questions.filter((q) =>
                                                isSelectable(q.type)
                                            ).length
                                        }{" "}
                                        preguntas)
                                    </span>

                                    <span className="ml-auto flex-shrink-0 text-gray-400">
                                        {openCategories.has(cat.name) ? (
                                            <ChevronUp size={16} />
                                        ) : (
                                            <ChevronDown size={16} />
                                        )}
                                    </span>
                                </button>
                            </div>

                            {/* Preguntas */}
                            {openCategories.has(cat.name) && (
                                <div className="divide-y divide-gray-100">
                                    {cat.questions.map((q) => {
                                        const selectable = isSelectable(q.type);

                                        return (
                                            <label
                                                key={q.index}
                                                className={`flex gap-3 items-start px-4 py-2.5 transition-colors
                                                    ${
                                                        selectable
                                                            ? "cursor-pointer hover:bg-gray-50"
                                                            : "opacity-40 cursor-not-allowed"
                                                    }`}
                                            >
                                                {/* Checkbox de la pregunta */}
                                                <input
                                                    type="checkbox"
                                                    disabled={!selectable}
                                                    checked={selected.has(
                                                        q.index
                                                    )}
                                                    onChange={() =>
                                                        toggleQuestion(q.index)
                                                    }
                                                    className="w-[18px] h-[18px] mt-[1px] rounded border-gray-300 accent-primary cursor-pointer flex-shrink-0"
                                                />

                                                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                                    {/* Identificador */}
                                                    <span className="text-xs font-semibold text-gray-500 uppercase leading-none">
                                                        Pregunta {q.index}
                                                    </span>

                                                    {/* Texto de la pregunta */}
                                                    <span
                                                        className={`text-[13px] text-gray-700 leading-snug ${
                                                            expandedQuestions.has(
                                                                q.index
                                                            )
                                                                ? ""
                                                                : "line-clamp-2"
                                                        }`}
                                                    >
                                                        {q.text}
                                                    </span>

                                                    {/* Botón expandir/colapsar texto de la pregunta */}
                                                    {selectable && (
                                                        <button
                                                            onClick={(e) =>
                                                                toggleExpand(
                                                                    q.index,
                                                                    e
                                                                )
                                                            }
                                                            className="flex items-center gap-1 mt-0.5 text-[11px] text-gray-400 hover:text-gray-600 transition-colors w-fit"
                                                        >
                                                            {expandedQuestions.has(
                                                                q.index
                                                            ) ? (
                                                                <>
                                                                    <ChevronsDownUp
                                                                        size={
                                                                            11
                                                                        }
                                                                    />
                                                                    <span>
                                                                        Ver
                                                                        menos
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ChevronsUpDown
                                                                        size={
                                                                            11
                                                                        }
                                                                    />
                                                                    <span>
                                                                        Ver más
                                                                    </span>
                                                                </>
                                                            )}
                                                        </button>
                                                    )}

                                                    {/* Badge del tipo */}
                                                    {!selectable && (
                                                        <span className="text-[11px] text-gray-400 italic mt-0.5">
                                                            Tipo no importable:{" "}
                                                            {q.type}
                                                        </span>
                                                    )}
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <DialogFooter className="mt-6 gap-2 flex-row justify-end">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button
                        onClick={handleSubmit}
                        disabled={selected.size === 0}
                    >
                        Importar {selected.size > 0 ? `(${selected.size})` : ""}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
