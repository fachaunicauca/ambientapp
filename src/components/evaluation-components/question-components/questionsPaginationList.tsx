import { useEffect, useState } from "react";
import {
    deleteQuestionById,
    exportQuestions,
    getTestQuestionsPaged,
    importQuestions,
} from "@/api/apiEvaluation/services/question-services";
import {
    PagedQuestions,
    QuestionInfo,
} from "@/api/apiEvaluation/interfaces/question-interfaces";
import { Button } from "@/components/ui/buttons/button";
import { Download, Loader2, Plus, Upload } from "lucide-react";
import QuestionDetailsCard from "./questionDetailsCard";
import QuestionFormModal from "./questionFormModal";
import { toast } from "sonner";
import { PaginationControls } from "@/components/ui/navigation/pagination-controls";
import ConfirmDialog from "@/components/ui/modals/confirmDialog";
import QuestionImporterModal from "./questionImporterModal";
import QuestionExporterModal from "./questionExporterModal";
import { all } from "axios";

interface Props {
    testId: number;
    onDelete: () => void;
}

export default function QuestionsPaginationList({ testId, onDelete }: Props) {
    const [data, setData] = useState<PagedQuestions | null>(null);
    const [error, setError] = useState<string>();
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] =
        useState<QuestionInfo | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [allQuestions, setAllQuestions] = useState<QuestionInfo[]>([]);

    const fetchQuestionsPage = async (page: number) => {
        setLoading(true);
        const result = await getTestQuestionsPaged(testId, page, 6);
        if (typeof result !== "string") {
            setData(result);
            setCurrentPage(page);
            setError(undefined);
        } else {
            setError(result);
            setData(null);
        }
        setLoading(false);
    };

    const fetchAllQuestions = async (): Promise<QuestionInfo[]> => {
        if (!data || data.content.length === 0) return [];

        const result = await getTestQuestionsPaged(
            testId,
            0,
            data.totalElements
        );

        if (typeof result === "string") {
            toast.error(result as string);
            return [];
        }

        return result.content;
    };

    const handleAddQuestionSuccess = () => {
        setIsAddModalOpen(false);
        fetchQuestionsPage(currentPage);
    };

    const handleDeleteQuestion = async (id: number) => {
        setLoading(true);

        const result = await deleteQuestionById(id);

        if (typeof result === "string") {
            toast.error(result);
        } else {
            // Si la pagina queda vacia despues de eliminar una pregunta, cargar la pagina anterior
            if (data && data.content.length === 1 && currentPage > 0) {
                await fetchQuestionsPage(currentPage - 1);
            } else {
                await fetchQuestionsPage(currentPage);
            }
            onDelete();
        }

        setLoading(false);
    };

    const handleEditQuestion = (question: QuestionInfo) => {
        setSelectedQuestion(question);
        setIsEditModalOpen(true);
    };

    const handleImportQuestions = async (file: File, selectedIdx: number[]) => {
        console.log("Preguntas importadas:", selectedIdx);
        setIsImportModalOpen(false);
        setLoading(true);

        const result = await importQuestions(file, selectedIdx, testId);

        if (typeof result === "string") {
            toast.error(result as string);
        }

        setLoading(false);

        fetchQuestionsPage(currentPage);
    };

    const handleOpenExportModal = async () => {
        setLoading(true);

        const questions = await fetchAllQuestions();

        setAllQuestions(questions);
        setLoading(false);

        setIsExportModalOpen(true);
    };

    const handleExportQuestions = async (selectedIds: number[]) => {
        setLoading(true);

        const result = await exportQuestions(selectedIds);

        if (typeof result === "string") {
            toast.error(result);
        } else {
            // Convertir el Blob en descarga automática
            const url = URL.createObjectURL(result);
            const a = document.createElement("a");
            a.href = url;
            a.download = `preguntas-evaluacion-${testId}.xml`;
            a.click();
            URL.revokeObjectURL(url);

            toast.success("Preguntas exportadas exitosamente.");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchQuestionsPage(0);
    }, [testId]);

    return (
        <div className="flex flex-col gap-6 mx-2">
            {/* Header */}
            <div className="flex items-center justify-between px-2">
                <div className="items-center gap-8">
                    <h3 className="font-bold text-lg text-gray-700">
                        Preguntas almacenadas
                    </h3>
                    {data && (
                        <span className="text-sm text-gray-500 font-medium">
                            Total: {data.totalElements}
                        </span>
                    )}
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="default"
                        onClick={() => setIsAddModalOpen(true)}
                        className="w-min gap-2"
                    >
                        <Plus size={20} />
                        Agregar Pregunta
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={() => setIsImportModalOpen(true)}
                        className="p-2 border rounded-md"
                    >
                        <Download size={20} />
                        Importar
                    </Button>

                    {data && data.totalElements > 0 && (
                        <Button
                            variant="ghost"
                            className="p-2 border rounded-md"
                            onClick={handleOpenExportModal}
                        >
                            <Upload size={20} />
                            Exportar
                        </Button>
                    )}
                </div>
            </div>

            {/* Contenido */}
            <div className="relative">
                {!loading && (!data || data.content.length === 0) ? (
                    <div className="text-center p-10 border-2 border-dashed rounded-xl text-gray-400">
                        {error ? error : "No hay preguntas registradas."}
                    </div>
                ) : (
                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-300 ${
                            loading
                                ? "opacity-40 pointer-events-none"
                                : "opacity-100"
                        }`}
                    >
                        {data &&
                            data.content.map((q) => (
                                <QuestionDetailsCard
                                    key={q.questionId}
                                    question={q}
                                    onEdit={handleEditQuestion}
                                    onDelete={handleDeleteQuestion}
                                />
                            ))}
                    </div>
                )}
                {/* Loader superpuesto */}
                {loading && (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <Loader2
                            className="animate-spin text-blue-600"
                            size={32}
                        />
                    </div>
                )}
            </div>

            {/* Controles de Paginación */}
            {data && data.totalPages > 1 && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={data.totalPages}
                    onPageChange={(page) => fetchQuestionsPage(page)}
                    loading={loading}
                    first={data.first}
                    last={data.last}
                />
            )}

            {/* Modal Agregar Pregunta */}
            <QuestionFormModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddQuestionSuccess}
                testId={testId}
            />

            {/* Modal Editar Pregunta */}
            {selectedQuestion && (
                <QuestionFormModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedQuestion(null);
                    }}
                    onSuccess={() => {
                        setIsEditModalOpen(false);
                        setSelectedQuestion(null);
                        fetchQuestionsPage(currentPage);
                    }}
                    initialData={selectedQuestion}
                    testId={testId}
                />
            )}

            {/* Modal Importar Preguntas */}
            <QuestionImporterModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImport={handleImportQuestions}
            />

            {/* Modal Exportar Preguntas */}
            <QuestionExporterModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                onExport={handleExportQuestions}
                questions={allQuestions}
            />
        </div>
    );
}
