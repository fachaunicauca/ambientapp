import { ChevronLeft, ChevronRight } from "lucide-react";

import { useEffect, useState } from "react";
import { Button } from "../buttons/button";

interface PaginationControlsProps {
    totalPages: number;
    currentPage: number; // La pagina inicial es 0
    first: boolean;
    last: boolean;
    loading?: boolean;
    onPageChange: (page: number) => void;
}

export function PaginationControls({
    totalPages,
    currentPage,
    first,
    last,
    loading = false,
    onPageChange,
}: PaginationControlsProps) {
    const [pageInput, setPageInput] = useState(String(currentPage + 1));

    useEffect(() => {
        setPageInput(String(currentPage + 1));
    }, [currentPage]);

    if (totalPages <= 1) return null;

    const handleBlur = () => {
        const page = Number(pageInput);

        if (
            !Number.isNaN(page) &&
            page >= 1 &&
            page <= totalPages &&
            page - 1 !== currentPage
        ) {
            onPageChange(page - 1);
        } else {
            setPageInput(String(currentPage + 1));
        }
    };

    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
            <p className="text-sm text-gray-700 flex items-center gap-2 font-medium">
                Página
                <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.currentTarget.blur();
                        }
                    }}
                    className="w-16 text-center border border-gray-300 rounded-md px-2 py-1 text-gray-900
                    bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-gray-600">
                    de <strong>{totalPages}</strong>
                </span>
            </p>

            <div className="flex gap-3">
                <Button
                    variant="outline"
                    onClick={() => {
                        onPageChange(currentPage - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={first || loading}
                    className="gap-2"
                >
                    <ChevronLeft size={18} />
                    Anterior
                </Button>

                <Button
                    variant="outline"
                    onClick={() => {
                        onPageChange(currentPage + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={last || loading}
                    className="gap-2"
                >
                    Siguiente
                    <ChevronRight size={18} />
                </Button>
            </div>
        </div>
    );
}
