"use client";

import { useEffect, useState, useMemo } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/modals/dialog";

import { Button } from "@/components/ui/buttons/button";
import { ChevronsDownUp, ChevronsUpDown, Download } from "lucide-react";
import SearchBar from "@/components/ui/navigation/searchBar";
import { QUESTION_FILTERS, QUESTION_TYPE_LABELS } from "@/config/testConfig";
import { QuestionInfo } from "@/api/apiEvaluation/interfaces/question-interfaces";

interface QuestionExporterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onExport: (selectedIds: number[]) => void;
    questions: QuestionInfo[];
}

export default function QuestionExporterModal({
    isOpen,
    onClose,
    onExport,
    questions,
}: QuestionExporterModalProps) {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(
        new Set()
    );
    const [searchText, setSearchText] = useState("");
    const [searchFilterKey, setSearchFilterKey] = useState<
        string | undefined
    >();
    const [filterType, setFilterType] = useState<string>("all");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSearch = (value: string, filterKey?: string) => {
        setSearchText(value);
        setSearchFilterKey(filterKey);
    };

    useEffect(() => {
        if (!isOpen) {
            setSelectedIds(new Set());
            setExpandedQuestions(new Set());
            setSearchText("");
            setSearchFilterKey(undefined);
            setFilterType("all");
            setErrors({});
        }
    }, [isOpen]);

    const availableTypes = useMemo(() => {
        const types = Array.from(new Set(questions.map((q) => q.questionType)));
        return types.sort();
    }, [questions]);

    const filteredQuestions = useMemo(() => {
        return questions.filter((q) => {
            const matchesSearch = (() => {
                if (searchText.trim() === "") return true;
                const needle = searchText.toLowerCase();
                if (searchFilterKey === "questionTitle")
                    return (
                        q.questionTitle?.toLowerCase().includes(needle) ?? false
                    );
                if (searchFilterKey === "questionText")
                    return q.questionText.toLowerCase().includes(needle);
                return false;
            })();
            const matchesType =
                filterType === "all" || q.questionType === filterType;
            return matchesSearch && matchesType;
        });
    }, [questions, searchText, searchFilterKey, filterType]);

    const allSelected =
        filteredQuestions.length > 0 &&
        filteredQuestions.every((q) => selectedIds.has(q.questionId));

    const someSelected =
        !allSelected &&
        filteredQuestions.some((q) => selectedIds.has(q.questionId));

    const toggleQuestion = (id: number) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
        if (errors.general) setErrors({});
    };

    const toggleAll = () => {
        const newSet = new Set(selectedIds);
        if (allSelected) {
            filteredQuestions.forEach((q) => newSet.delete(q.questionId));
        } else {
            filteredQuestions.forEach((q) => newSet.add(q.questionId));
        }
        setSelectedIds(newSet);
    };

    const toggleExpand = (id: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const newSet = new Set(expandedQuestions);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedQuestions(newSet);
    };

    const handleSubmit = () => {
        if (selectedIds.size === 0) {
            setErrors({ general: "Debes seleccionar al menos una pregunta." });
            return;
        }
        onExport(Array.from(selectedIds));
        handleClose();
    };

    const handleClose = () => {
        setSelectedIds(new Set());
        setExpandedQuestions(new Set());
        setSearchText("");
        setSearchFilterKey(undefined);
        setFilterType("all");
        setErrors({});
        onClose();
    };

    const questionIndexMap = useMemo(() => {
        const map = new Map<number, number>();
        questions.forEach((q, i) => map.set(q.questionId, i + 1));
        return map;
    }, [questions]);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold tracking-tight">
                        Exportar Preguntas
                    </DialogTitle>
                </DialogHeader>

                {/* Búsqueda y filtro */}
                <div className="flex items-center gap-2">
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder="Buscar pregunta..."
                        filters={QUESTION_FILTERS}
                    />

                    {availableTypes.length > 1 && (
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="text-sm border border-gray-300 rounded-md px-3 h-12 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue cursor-pointer flex-shrink-0"
                        >
                            <option value="all">Todos los tipos</option>
                            {availableTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Seleccionar todo + contador */}
                {questions.length > 0 && (
                    <div className="flex items-center gap-3 px-1">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                ref={(el) => {
                                    if (el) el.indeterminate = someSelected;
                                }}
                                onChange={toggleAll}
                                className="w-[18px] h-[18px] rounded border-gray-300 accent-primary cursor-pointer"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Seleccionar{" "}
                                {searchText || filterType !== "all"
                                    ? "resultados"
                                    : "todas"}
                            </span>
                        </label>

                        <span className="ml-auto text-xs text-gray-400 font-medium">
                            {selectedIds.size} / {questions.length}{" "}
                            seleccionadas
                        </span>
                    </div>
                )}

                {/* Separador */}
                {questions.length > 0 && <hr className="border-gray-100" />}

                {/* Lista de preguntas */}
                <div className="space-y-1">
                    {filteredQuestions.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-8">
                            No se encontraron preguntas.
                        </p>
                    ) : (
                        filteredQuestions.map((q) => (
                            <label
                                key={q.questionId}
                                className="flex gap-3 items-start px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedIds.has(q.questionId)}
                                    onChange={() =>
                                        toggleQuestion(q.questionId)
                                    }
                                    className="w-[18px] h-[18px] mt-[1px] rounded border-gray-300 accent-primary cursor-pointer flex-shrink-0"
                                />

                                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-gray-500 uppercase leading-none">
                                            Pregunta{" "}
                                            {questionIndexMap.get(q.questionId)}
                                        </span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
                                            {QUESTION_TYPE_LABELS[
                                                q.questionType
                                            ] || q.questionType}
                                        </span>
                                    </div>

                                    <span
                                        className={`text-[13px] text-gray-700 leading-snug ${
                                            expandedQuestions.has(q.questionId)
                                                ? ""
                                                : "line-clamp-2"
                                        }`}
                                    >
                                        {q.questionText}
                                    </span>

                                    <button
                                        onClick={(e) =>
                                            toggleExpand(q.questionId, e)
                                        }
                                        className="flex items-center gap-1 mt-0.5 text-[11px] text-gray-400 hover:text-gray-600 transition-colors w-fit"
                                    >
                                        {expandedQuestions.has(q.questionId) ? (
                                            <>
                                                <ChevronsDownUp size={11} />
                                                <span>Ver menos</span>
                                            </>
                                        ) : (
                                            <>
                                                <ChevronsUpDown size={11} />
                                                <span>Ver más</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </label>
                        ))
                    )}
                </div>

                {/* Error */}
                {errors.general && (
                    <p className="text-xs text-redLight">{errors.general}</p>
                )}

                <DialogFooter className="mt-6 gap-2 flex-row justify-end">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button
                        onClick={handleSubmit}
                        disabled={selectedIds.size === 0}
                    >
                        <Download size={15} className="mr-1.5" />
                        Exportar{" "}
                        {selectedIds.size > 0 ? `(${selectedIds.size})` : ""}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
