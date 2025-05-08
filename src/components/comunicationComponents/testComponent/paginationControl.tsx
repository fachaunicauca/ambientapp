import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    onAction?: () => void; 
    actionText?: string; 
    isSubmitting?: boolean; 
    disableNext?: boolean; 
}

export default function PaginationControls({
    currentPage,
    totalPages,
    onPageChange,
    onAction,
    actionText = "Finalizar",
    isSubmitting = false,
    disableNext = false,
}: PaginationControlsProps) {
    const isLastPage = currentPage >= totalPages - 1;

    return (
        <div className="flex mt-4">
            <Button
                onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
                disabled={currentPage === 0}
                variant="secondary"
                className={`w-md rounded-full mr-2 ${currentPage === 0 ? "cursor-not-allowed" : ""}`}
            >
                Anterior
            </Button>
            <Button
                onClick={isLastPage ? onAction : () => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
                disabled={isSubmitting || disableNext}
                variant="default"
                className={`w-md rounded-full mt-0 ${isSubmitting || disableNext ? "cursor-not-allowed" : ""}`}
            >
                {isSubmitting ? "Procesando..." : isLastPage ? actionText : "Siguiente"}
            </Button>
        </div>
    );
}