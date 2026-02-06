"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import FileItem from "@/components/comunicationComponents/preparationComponent/fileItem";
import SearchBar from "@/components/comunicationComponents/preparationComponent/searchBar";
import Title from "@/components/ui/typography/title";
import {
    TestGuide,
    TestGuideList,
} from "@/api/apiEvaluation/interfaces/guide-interfaces";
import {
    deleteFile,
    fetchFileData,
} from "@/api/apiEvaluation/services/guide-services";
import { Button } from "@/components/ui/buttons/button";
import { Trash, Upload } from "lucide-react";
import UploadGuideModal from "@/components/comunicationComponents/preparationComponent/uploadGuideModal";
import ConfirmDialog from "@/components/ui/modals/confirmDialog";

export default function Capacitacion() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const [guides, setGuides] = useState<TestGuide[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
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
            setLoading(true);
            const response = await fetchFileData();
            if (response.error) {
                setError(response.error);
            } else {
                const guideList: TestGuideList = {
                    testGuideList: response.files,
                };
                setGuides(guideList.testGuideList);
            }
            setLoading(false);
        };
        fetchGuides();
    }, []);

    const viewFile = (guide: TestGuide) => {
        router.push(
            `/dashboard/comunicacion-riesgo/capacitacion/visualizar?url=${guide.testGuideUrl}`
        );
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

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = guides;

    return (
        <section>
            <Title title="Material de Capacitación" />

            <div className="mt-4">
                {/* Modal subir guía */}
                <UploadGuideModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onUploadSuccess={handleUploadSuccess}
                />

                {/* Barra de búsqueda + Subir */}
                <div className="flex justify-between items-center">
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder="Nombre del archivo"
                    />

                    <Button
                        className="bg-blue hover:bg-blue/90 w-1/5 w-50 ml-2"
                        onClick={() => setModalOpen(true)}
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        Subir guía
                    </Button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="p-6 flex justify-center">
                        <p className="text-gray-500 text-lg text-center">
                            Cargando...
                        </p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="p-12 flex justify-center">
                        <p className="text-gray-500 text-center text-xl font-semibold">
                            {error}
                        </p>
                    </div>
                )}

                {/* Lista de archivos */}
                {/* {!loading && !error && (
                    <ul className="space-y-3 mt-4">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((guide, index) => (
                                <FileItem
                                    key={index}
                                    file={{
                                        name: guide.testGuideId,
                                        url: guide.testGuideUrl,
                                        type: String(
                                            guide.testGuideId.split(".").pop()
                                        ),
                                    }}
                                    onView={() => viewFile(guide)}
                                    onDelete={() => {}}
                                    deleteButton={
                                        <ConfirmDialog
                                            trigger={
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:bg-red-100"
                                                >
                                                    <Trash className="w-5 h-5" />
                                                </Button>
                                            }
                                            onConfirm={() =>
                                                handleDeleteFile(
                                                    guide.testGuideId
                                                )
                                            }
                                            title="¿Eliminar archivo?"
                                            description={`¿Estás seguro de que deseas eliminar "${guide.testGuideId}"? Esta acción no se puede deshacer.`}
                                            confirmText="Eliminar"
                                            confirmVariant="destructive"
                                        />
                                    }
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">
                                No se encontraron archivos...
                            </p>
                        )}
                    </ul>
                )} */}

                {/* Paginación */}
                {!loading &&
                    !error && guides &&
                    // Mostrar las guias almacenadas sin los paginationcontrols
                    guides.map((guide, index) => (
                        <FileItem
                            key={index}
                            file={{
                                name: guide.testGuideId,
                                url: guide.testGuideUrl,
                                type: String(
                                    guide.testGuideId.split(".").pop()
                                ),
                            }}
                            onView={() => viewFile(guide)}
                            onDelete={() => {}}
                            deleteButton={
                                <ConfirmDialog
                                    trigger={
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:bg-red-100"
                                        >
                                            <Trash className="w-5 h-5" />
                                        </Button>
                                    }
                                    onConfirm={() =>
                                        handleDeleteFile(guide.testGuideId)
                                    }
                                    title="¿Eliminar archivo?"
                                    description={`¿Estás seguro de que deseas eliminar "${guide.testGuideId}"? Esta acción no se puede deshacer.`}
                                    confirmText="Eliminar"
                                    confirmVariant="destructive"
                                />
                            }
                        />
                    ))}
            </div>
        </section>
    );
}
