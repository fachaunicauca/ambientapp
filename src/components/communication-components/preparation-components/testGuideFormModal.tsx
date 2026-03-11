"use client";

import { useEffect, useRef, useState } from "react";
import { uploadFile } from "@/api/apiEvaluation/services/guide-services";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/modals/dialog";

import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/form/input";
import { Upload } from "lucide-react";

interface TestGuideFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    teacherEmail: string;
}

export default function TestGuideFormModal({
    isOpen,
    onClose,
    onSuccess,
    teacherEmail,
}: TestGuideFormModalProps) {
    const [formData, setFormData] = useState({
        testGuideId: "",
        file: null as File | null,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                testGuideId: "",
                file: null,
            });
            setErrors({});
        }
    }, [isOpen]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        const filename = selectedFile.name.replace(/\.[^/.]+$/, "");

        setFormData((prev) => ({
            ...prev,
            file: selectedFile,
            testGuideId: filename,
        }));
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.file) {
            setErrors({ testGuideArchive: "Debes seleccionar un archivo." });
            return;
        }

        const submitData = {
            testGuideId: formData.testGuideId.trim(),
            testGuideArchive: formData.file,
            teacherEmail: teacherEmail,
        };

        const result = await uploadFile(submitData);

        if (result === true) {
            onSuccess();
            handleClose();
            return;
        }

        setErrors(result as Record<string, string>);
    };

    const handleClose = () => {
        setErrors({});
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Subir Guía</DialogTitle>
                </DialogHeader>

                {/* Archivo */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Archivo *
                    </label>

                    <label
                        className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all
                                    ${
                                        errors.testGuideArchive
                                            ? "border-redLight"
                                            : "border-gray-300 hover:border-blueLight hover:bg-gray-50"
                                    }`}
                    >
                        <Upload size={40} className="mb-2 text-gray-400" />

                        <span className="text-sm text-gray-600">
                            {formData.file
                                ? formData.file.name
                                : "Haz clic para seleccionar un archivo"}
                        </span>

                        <Input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {errors.testGuideArchive && (
                        <p className="mt-2 text-xs text-redLight">
                            {errors.testGuideArchive}
                        </p>
                    )}
                </div>

                {/* Nombre */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Nombre de la guía *
                    </label>

                    <Input
                        value={formData.testGuideId}
                        onChange={(e) =>
                            handleChange("testGuideId", e.target.value)
                        }
                        className={errors.testGuideId ? "border-redLight" : ""}
                    />

                    {errors.testGuideId && (
                        <p className="mt-1 text-xs text-redLight">
                            {errors.testGuideId}
                        </p>
                    )}
                </div>

                <DialogFooter className="mt-6 gap-4">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button variant="default" onClick={handleSubmit}>
                        Subir Guía
                    </Button>
                </DialogFooter>

                {errors.general && (
                    <p className="mt-4 text-sm text-redLight text-center">
                        {errors.general}
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
}
