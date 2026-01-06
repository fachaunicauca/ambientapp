import { useEffect, useState } from "react";
import {
    deleteQuestionById,
    getTestQuestionsPaged,
} from "@/api/apiEvaluation/services/question-services";
import {
    PagedQuestions,
    QuestionInfo,
} from "@/api/apiEvaluation/interfaces/question-interfaces";
import { Button } from "@/components/ui/buttons/button";
import { ChevronLeft, ChevronRight, Loader2, Plus } from "lucide-react";
import QuestionDetailsCard from "./questionDetailsCard";
import QuestionFormModal from "./questionFormModal";
import { toast } from "sonner";

interface Props {
    testId: number;
}

export default function QuestionsPaginationList({ testId }: Props) {
    const [data, setData] = useState<PagedQuestions | null>(null);
    const [error, setError] = useState<string>();
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] =
        useState<QuestionInfo | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const fetchQuestionsPage = async (page: number) => {
        setLoading(true);
        const result = await getTestQuestionsPaged(testId, page, 6);
        if (typeof result !== "string") {
            setData(result);
            setCurrentPage(page);
            setError(undefined);
        } else {
            setError(result);
        }
        setLoading(false);
    };

    const handleQuestionSuccess = () => {
        setIsModalOpen(false);
        fetchQuestionsPage(currentPage);
    };

    const handleDeleteQuestion = async (id: number) => {
        setLoading(true);

        const result = await deleteQuestionById(id);

        if (typeof result === "string") {
            toast.error(result);
        } else {
            fetchQuestionsPage(currentPage);
        }

        setLoading(false);
    };

    const handleEditQuestion = (question: QuestionInfo) => {
        setSelectedQuestion(question);
        setIsEditModalOpen(true);
    };

    useEffect(() => {
        fetchQuestionsPage(0);
    }, [testId]);

    if (error) {
        return <div className="text-redLight font-medium">{error}</div>;
    }

    return (
        <div className="flex flex-col gap-6 mx-2">
            {/* Header */}
            <div className="flex items-center justify-between px-2">
                <h3 className="font-bold text-lg text-gray-700">
                    Preguntas almacenadas
                </h3>

                <Button
                    variant="default"
                    onClick={() => setIsModalOpen(true)}
                    className="w-min gap-2"
                >
                    <Plus size={20} />
                    Agregar Pregunta
                </Button>

                {data && (
                    <span className="text-sm text-gray-500 font-medium">
                        Total: {data.totalElements}
                    </span>
                )}
            </div>

            {/* Contenido */}
            {!data || data.content.length === 0 ? (
                <div className="text-center p-10 border-2 border-dashed rounded-xl text-gray-400">
                    No hay preguntas registradas.
                </div>
            ) : (
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-300 ${
                        loading
                            ? "opacity-40 pointer-events-none"
                            : "opacity-100"
                    }`}
                >
                    {data.content.map((q) => (
                        <QuestionDetailsCard
                            key={q.questionId}
                            question={q}
                            onEdit={handleEditQuestion}
                            onDelete={handleDeleteQuestion}
                        />
                    ))}
                </div>
            )}

            {/* Paginación */}
            {data && data.totalPages > 1 && (
                <div className="flex items-center justify-between py-6 mt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Página{" "}
                        <span className="font-bold text-gray-900">
                            {data.number + 1}
                        </span>{" "}
                        de {data.totalPages}
                    </p>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                fetchQuestionsPage(currentPage - 1);
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                });
                            }}
                            disabled={data.first || loading}
                            className="gap-2"
                        >
                            <ChevronLeft size={18} />
                            Anterior
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => {
                                fetchQuestionsPage(currentPage + 1);
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                });
                            }}
                            disabled={data.last || loading}
                            className="gap-2"
                        >
                            Siguiente
                            <ChevronRight size={18} />
                        </Button>
                    </div>
                </div>
            )}

            {/* Loader */}
            {loading && (
                <div className="flex justify-center items-center py-4">
                    <Loader2 className="animate-spin text-blue-600" size={32} />
                </div>
            )}

            <QuestionFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleQuestionSuccess}
                testId={testId}
            />

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
        </div>
    );
}
