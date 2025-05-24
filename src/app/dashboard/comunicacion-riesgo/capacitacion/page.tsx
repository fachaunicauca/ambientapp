"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import FileItem from "@/components/comunicationComponents/preparationComponent/fileItem";
import SearchBar from "@/components/comunicationComponents/preparationComponent/searchBar";
import PaginationControls from "@/components/comunicationComponents/testComponent/paginationControl";
import Title from "@/components/ui/typography/title";
import { TestGuide, TestGuideList } from "@/api/apiEvaluation/interfaces/guide-interfaces";
import { deleteFile, fetchFileData } from "@/api/apiEvaluation/services/guide-services";
import { Button } from "@/components/ui/buttons/button";
import { Trash, Upload } from "lucide-react";
import UploadGuideModal from "@/components/comunicationComponents/preparationComponent/uploadGuideModal";
import ConfirmDeleteModal from "@/components/ui/modals/confirmDeleteModal";


export default function Capacitacion() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const [guides, setGuides] = useState<TestGuide[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleUploadSuccess = async () => {
        const response = await fetchFileData();
        if (!response.error) {
            setGuides(response.files);
            setModalOpen(false);
        }
    };

    useEffect(() => {
        const fetchGuides = async () => {
            const response = await fetchFileData();
            if (response.error) {
                setError(response.error);
            } else {
                const guideList: TestGuideList = { test_guide_list: response.files };
                setGuides(guideList.test_guide_list);
            }
        };
        fetchGuides();
    }, []);

    const viewFile = (guide: TestGuide) => {
        router.push(`/dashboard/comunicacion-riesgo/capacitacion/visualizar?url=${guide.test_guide_url}`);
    };

    const handleDeleteFile = async (fileName: string) => {
        const response = await deleteFile(fileName);
        if (response.error) {
            setError(response.error);
        } else {
            const updated = await fetchFileData();
            if (!updated.error) {
                setGuides(updated.files);
            }
        }
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(0);
    };

    const filteredData = guides.filter((item) =>
        item.test_guide_id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <section>
            <Title title="Material de Capacitación" />
            <div className="mt-4">
                <UploadGuideModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onUploadSuccess={handleUploadSuccess} />
                <div className="flex justify-between">
                    <SearchBar onSearch={handleSearch} placeholder="Nombre del archivo" />
                    <Button className="bg-blue hover:bg-blue/90 w-1/5 w-50 ml-2" onClick={() => setModalOpen(true)}>
                        <Upload className="h-4 w-4 mr-2" />
                        Subir guía
                    </Button>
                </div>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <ul className="space-y-3 mt-4">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((guide, index) => (
                                <FileItem
                                    key={index}
                                    file={{
                                        name: guide.test_guide_id,
                                        url: guide.test_guide_url,
                                        type: String(guide.test_guide_id.split(".").pop())
                                    }}
                                    onView={() => viewFile(guide)}
                                    onDelete={() => { }}
                                    deleteButton={
                                        <ConfirmDeleteModal
                                            trigger={<Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100">
                                                <Trash className="w-5 h-5" />
                                            </Button>}
                                            onConfirm={() => handleDeleteFile(guide.test_guide_id)}
                                            name={guide.test_guide_id}
                                        />
                                    }
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No se encontraron archivos...</p>
                        )}
                    </ul>
                )}
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
