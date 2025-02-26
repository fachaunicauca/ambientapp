import { Button } from "../ui/button";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    onSubmit: () => void;
    allAnswered: boolean;
    isSubmitting: boolean;
}

export default function PaginationControls({ currentPage, totalPages, onPageChange, onSubmit, allAnswered, isSubmitting }: PaginationControlsProps) {
    const isLastPage = currentPage >= totalPages - 1;

    return (
        <div className="flex justify-between mt-4">
            <Button
                onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
                disabled={currentPage === 0}
                variant="secondary"
                className={`w-md rounded-full ${currentPage === 0 ? 'cursor-not-allowed' : ''}`}
            >
                Anterior
            </Button>
            <Button
                onClick={isLastPage ? onSubmit : () => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
                disabled={isSubmitting || (!allAnswered && isLastPage)}
                variant="default"
                className={`w-md rounded-full ${isSubmitting || (!allAnswered && isLastPage) ? 'cursor-not-allowed' : ''}`}
            >
                {isSubmitting ? "Enviando..." : isLastPage ? "Finalizar Test" : "Siguiente"}
            </Button>
        </div>
    );
}
