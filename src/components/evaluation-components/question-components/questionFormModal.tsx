import React, { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { QuestionInfo } from "@/api/apiEvaluation/interfaces/question-interfaces";
import { saveQuestion } from "@/api/apiEvaluation/services/question-services";
import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/buttons/button";
import { QUESTION_TYPE_LABELS } from "@/config/testConfig";
import { QuestionStructureRenderer } from "./questionStructureRenderer";
import { QuestionType } from "@/types/questionTypes";
import { Textarea } from "@/components/ui/form/textarea";
import { Trash2, Upload } from "lucide-react";

interface QuestionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: QuestionInfo | null;
    testId: number;
}

export default function QuestionFormModal({
    isOpen,
    onClose,
    onSuccess,
    initialData,
    testId,
}: QuestionFormModalProps) {
    const [formData, setFormData] = useState({
        questionText: "",
        questionTitle: "",
        questionType: "MULTIPLE_CHOICE",
        questionStructure: JSON.stringify({
            message: "Estructura por defecto",
        }),
        questionImageId: null as number | null,
        questionImageUrl: null as string | null,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                questionText: initialData.questionText,
                questionTitle: initialData.questionTitle || "",
                questionType: initialData.questionType,
                questionStructure: initialData.questionStructure,
                questionImageId: initialData.questionImageId,
                questionImageUrl: initialData.questionImageUrl,
            });
            setPreviewUrl(initialData.questionImageUrl);
            setImageFile(null);
        } else {
            setFormData({
                questionText: "",
                questionTitle: "",
                questionType: "MULTIPLE_CHOICE",
                questionStructure: JSON.stringify({
                    message: "Estructura por defecto",
                }),
                questionImageId: null,
                questionImageUrl: null,
            });
            setPreviewUrl(null);
            setImageFile(null);
        }
        setErrors({});
    }, [initialData, isOpen]);

    const handleImageChange = (file: File | null) => {
        setImageFile(file);

        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(formData.questionImageUrl);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);

        if (previewUrl && previewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);

        // Limpiar los datos de imagen existente
        setFormData((prev) => ({
            ...prev,
            questionImageId: null,
            questionImageUrl: null,
        }));

        // Limpiar el input file
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const submitData: any = {
            questionText: formData.questionText,
            questionTitle: formData.questionTitle.trim() || null,
            questionType: formData.questionType,
            questionStructure: formData.questionStructure,
            testId,
            questionImageId: null,
            questionImageUrl: null,
            questionImage: null,
        };

        if (initialData) {
            submitData.questionId = initialData.questionId;

            if (imageFile) {
                submitData.questionImage = imageFile;
            } else {
                console.log("No new image file, keeping existing image info");
                submitData.questionImageId = formData.questionImageId;
                submitData.questionImageUrl = formData.questionImageUrl;
            }
        } else {
            submitData.questionImage = imageFile;
        }
        console.log("Submitting data:", submitData);
        const result = await saveQuestion(submitData);

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
        <Dialog.Root open={isOpen} onOpenChange={handleClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
                <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg max-h-[90vh] overflow-y-auto">
                        <Dialog.Title className="text-lg font-bold">
                            {initialData
                                ? "Editar Pregunta"
                                : "Crear Nueva Pregunta"}
                        </Dialog.Title>

                        <div className="mt-6 space-y-4">
                            {/* Título de la Pregunta */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Título (Opcional)
                                </label>
                                <Input
                                    type="text"
                                    value={formData.questionTitle}
                                    onChange={(e) =>
                                        handleChange(
                                            "questionTitle",
                                            e.target.value
                                        )
                                    }
                                    className={
                                        errors.questionTitle
                                            ? "border-redLight"
                                            : ""
                                    }
                                />
                                {errors.questionTitle && (
                                    <p className="mt-1 text-xs text-redLight">
                                        {errors.questionTitle}
                                    </p>
                                )}
                            </div>

                            {/* Texto de la Pregunta */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Texto de la Pregunta *
                                </label>
                                <Textarea
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                                        errors.questionText
                                            ? "border-redLight"
                                            : ""
                                    }`}
                                    rows={3}
                                    placeholder="Escribe aquí el enunciado..."
                                    value={formData.questionText}
                                    onChange={(e) =>
                                        handleChange(
                                            "questionText",
                                            e.target.value
                                        )
                                    }
                                />
                                {errors.questionText && (
                                    <p className="mt-1 text-xs text-redLight">
                                        {errors.questionText}
                                    </p>
                                )}
                            </div>

                            {/* Imagen de la Pregunta */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Imagen (Opcional)
                                </label>

                                {previewUrl ? (
                                    <div className="space-y-3">
                                        <div className="relative inline-block">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="max-h-64 rounded-lg border-2 border-gray-200 shadow-sm"
                                            />
                                            <Button
                                                variant={"destructive"}
                                                onClick={handleRemoveImage}
                                                className="absolute -top-2 -right-2 text-white rounded-full p-2 shadow-lg transition-colors"
                                                title="Eliminar imagen"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>

                                        <div className="text-sm text-gray-600">
                                            {imageFile ? (
                                                <p>
                                                    {imageFile.name} (
                                                    {(
                                                        imageFile.size / 1024
                                                    ).toFixed(2)}{" "}
                                                    KB)
                                                </p>
                                            ) : formData.questionImageId ? (
                                                <p>
                                                    Imagen actual (ID:{" "}
                                                    {formData.questionImageId})
                                                </p>
                                            ) : null}
                                        </div>

                                        <Button
                                            variant={"default"}
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className="text-sm font-medium"
                                        >
                                            Cambiar imagen
                                        </Button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-all"
                                    >
                                        <Upload
                                            className="mx-auto mb-3 text-gray-400"
                                            size={32}
                                        />
                                        <p className="text-sm text-gray-600 mb-1">
                                            Haz clic para seleccionar una imagen
                                        </p>
                                    </div>
                                )}

                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleImageChange(
                                            e.target.files?.[0] || null
                                        )
                                    }
                                    className="hidden"
                                />

                                {errors.questionImage && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.questionImage}
                                    </p>
                                )}
                            </div>

                            {/* Tipo de Pregunta */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Tipo de Pregunta
                                </label>
                                <select
                                    value={formData.questionType}
                                    onChange={(e) =>
                                        handleChange(
                                            "questionType",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {Object.entries(QUESTION_TYPE_LABELS).map(
                                        ([type, label]) => (
                                            <option key={type} value={type}>
                                                {label}
                                            </option>
                                        )
                                    )}
                                </select>
                                {errors.questionType && (
                                    <p className="mt-1 text-xs text-redLight">
                                        {errors.questionType}
                                    </p>
                                )}
                            </div>

                            {/* Question Structure */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Estructura de la pregunta *
                                </label>
                                <QuestionStructureRenderer
                                    mode="builder"
                                    questionType={
                                        formData.questionType as QuestionType
                                    }
                                    structure={formData.questionStructure}
                                    onChange={(newStructure) => {
                                        handleChange(
                                            "questionStructure",
                                            newStructure
                                        );
                                    }}
                                />
                            </div>
                            {errors.questionStructure && (
                                <p className="mt-1 text-xs text-redLight">
                                    {errors.questionStructure}
                                </p>
                            )}
                        </div>

                        <div className="mt-6 flex gap-4 justify-end">
                            <Dialog.Close asChild>
                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Cancelar
                                </Button>
                            </Dialog.Close>
                            <Button variant="default" onClick={handleSubmit}>
                                {initialData
                                    ? "Guardar Cambios"
                                    : "Crear Pregunta"}
                            </Button>
                        </div>

                        {errors.general && (
                            <p className="mt-4 text-sm text-red-500 text-center">
                                {errors.general}
                            </p>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
