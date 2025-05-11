"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FileItem from "@/components/comunicationComponents/preparationComponent/fileItem";
import SearchBar from "@/components/comunicationComponents/preparationComponent/searchBar";
import Title from "@/components/ui/title";
import PaginationControls from "@/components/comunicationComponents/testComponent/paginationControl";

const files = [
    { name: "Manual de Seguridad para el Laboratorio", type: "pdf", url: "/Mini Manual de Seguridad para el Laboratorio de Química Universitario.pdf" },
    { name: "Guia", type: "pdf", url: "/Mini Manual de Seguridad para el Laboratorio de Química Universitario.pdf" },
    { name: "Taller", type: "pdf", url: "/Mini Manual de Seguridad para el Laboratorio de Química Universitario.pdf" },
    { name: "Sustancias Químicas", type: "pdf", url: "/Mini Manual de Seguridad para el Laboratorio de Química Universitario.pdf" },
    { name: "Materiales", type: "pdf", url: "/Mini Manual de Seguridad para el Laboratorio de Química Universitario.pdf" },
];

export default function Capacitacion() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const viewFile = (file: { url: string; type: string }) => {
        router.push(`/dashboard/comunicacion-riesgo/capacitacion/visualizar?url=${file.url}&type=${file.type}`);
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(0);
    };

    const filteredData = files.filter(
        (item) =>
            item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <section>
            <Title title="Material de Capacitación" />
            <div className="mt-4">
                <SearchBar onSearch={handleSearch} placeholder="Nombre del archivo" />
                <ul className="space-y-3 mt-4">
                    {paginatedData.length > 0 ? (
                        paginatedData.map((file, index) => (
                            <FileItem key={index} file={file} onView={viewFile} />
                        ))
                    ) : (
                        <p className="text-gray-500">No se encontraron archivos...</p>
                    )}
                </ul>
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                    actionText="Siguiente"
                    disableNext={filteredData.length === 0 || currentPage >= Math.ceil(filteredData.length / itemsPerPage) - 1}
                />
            </div>
        </section>
    );
}