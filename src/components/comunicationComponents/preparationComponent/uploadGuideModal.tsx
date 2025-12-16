import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/buttons/button";
import { uploadFile } from "@/api/apiEvaluation/services/guide-services";
import { Input } from "@/components/ui/form/input";
import { toast } from "sonner";

interface UploadGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadSuccess: () => void;
}

export default function UploadGuideModal({ isOpen, onClose, onUploadSuccess }: UploadGuideModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");

    const resetForm = () => {
        setFile(null);
        setFileName("");
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setFile(event.target.files[0]);
            setFileName(event.target.files[0].name);
        }
    };

    const handleUpload = async () => {
        if (!file || !fileName) {
            toast.error("Por favor, selecciona un archivo.");
            return;
        }

        try {
            const guideData = { testGuideId: fileName, testGuideArchive: file };
            const response = await uploadFile(guideData);

            if (response.success) {
                alert("Guía subida con éxito.");
                onUploadSuccess();
                handleClose();
            } else {
                alert("Error al subir la guía.");
            }
        } catch (error) {
            console.error("Error subiendo la guía:", error);
            alert("Hubo un problema al subir la guía.");
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    useEffect(() => {
        if (!isOpen) resetForm();
    }, [isOpen]);

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
                <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                        <Dialog.Title className="text-lg font-bold">Subir Guía</Dialog.Title>
                        <Dialog.Description className="mt-2 text-gray-700">
                            Selecciona un archivo para subirlo como material de capacitación.
                        </Dialog.Description>

                        <div className="mt-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Archivo</label>
                            <div className="flex items-center gap-3">
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Seleccionar
                                </label>
                                <span className="text-sm text-gray-600 truncate max-w-[250px]">
                                    {file?.name || "Ningún archivo seleccionado..."}
                                </span>
                            </div>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".pdf,.doc,.docx,.ppt,.pptx"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        <div className="mt-4">
                            <Input
                                type="text"
                                placeholder="Nombre del archivo"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                            />
                        </div>

                        <div className="mt-6 flex gap-4 justify-end">
                            <Dialog.Close asChild>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancelar
                                </Button>
                            </Dialog.Close>
                            <Button variant="default" onClick={handleUpload}>
                                Subir
                            </Button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
