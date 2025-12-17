import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../ui/buttons/button";
import { Input } from "../ui/form/input";

interface TestFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (testData: Partial<TestInfo>) => void;
    initialData?: TestInfo | null;
    teacherEmail: string;
}

interface TestInfo {
    testId: number;
    teacherEmail: string;
    testTitle: string;
    testDescription: string | null;
    testDurationMinutes: number;
    testNumberOfQuestions: number;
    testAttemptLimit: number;
    testState: number;
    isPeriodic: boolean;
}

export default function TestFormModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    teacherEmail,
}: TestFormModalProps) {
    const [formData, setFormData] = useState({
        testTitle: "",
        testDescription: "",
        testDurationMinutes: 60,
        testNumberOfQuestions: 10,
        testAttemptLimit: 1,
        testState: 1,
        isPeriodic: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                testTitle: initialData.testTitle,
                testDescription: initialData.testDescription || "",
                testDurationMinutes: initialData.testDurationMinutes,
                testNumberOfQuestions: initialData.testNumberOfQuestions,
                testAttemptLimit: initialData.testAttemptLimit,
                testState: initialData.testState,
                isPeriodic: initialData.isPeriodic,
            });
        } else {
            // Reset form when opening for creation
            setFormData({
                testTitle: "",
                testDescription: "",
                testDurationMinutes: 60,
                testNumberOfQuestions: 10,
                testAttemptLimit: 1,
                testState: 1,
                isPeriodic: false,
            });
        }
        setErrors({});
    }, [initialData, isOpen]);

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.testTitle.trim()) {
            newErrors.testTitle = "El título es obligatorio";
        }

        if (formData.testDurationMinutes <= 0) {
            newErrors.testDurationMinutes = "La duración debe ser mayor a 0";
        }

        if (formData.testNumberOfQuestions <= 0) {
            newErrors.testNumberOfQuestions = "Debe tener al menos 1 pregunta";
        }

        if (formData.testAttemptLimit <= 0) {
            newErrors.testAttemptLimit = "Debe permitir al menos 1 intento";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const submitData: any = {
            ...formData,
            teacherEmail,
            testDescription: formData.testDescription.trim() || null,
        };

        if (initialData) {
            submitData.testId = initialData.testId;
        }

        onSubmit(submitData);
    };

    const handleClose = () => {
        setFormData({
            testTitle: "",
            testDescription: "",
            testDurationMinutes: 60,
            testNumberOfQuestions: 10,
            testAttemptLimit: 1,
            testState: 1,
            isPeriodic: false,
        });
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
                            {initialData ? "Editar Test" : "Crear Nuevo Test"}
                        </Dialog.Title>
                        <Dialog.Description className="mt-2 text-gray-700 text-sm">
                            {initialData
                                ? "Modifica los detalles del test."
                                : "Completa la información para crear un nuevo test."}
                        </Dialog.Description>

                        <div className="mt-6 space-y-4">
                            {/* Título */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Título *
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Ej: Test de Capacitación Módulo 1"
                                    value={formData.testTitle}
                                    onChange={(e) =>
                                        handleChange(
                                            "testTitle",
                                            e.target.value
                                        )
                                    }
                                    className={
                                        errors.testTitle ? "border-red-500" : ""
                                    }
                                />
                                {errors.testTitle && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.testTitle}
                                    </p>
                                )}
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <textarea
                                    placeholder="Descripción opcional del test..."
                                    value={formData.testDescription}
                                    onChange={(e) =>
                                        handleChange(
                                            "testDescription",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    rows={3}
                                />
                            </div>

                            {/* Duración */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Duración (minutos) *
                                </label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={formData.testDurationMinutes}
                                    onChange={(e) =>
                                        handleChange(
                                            "testDurationMinutes",
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                    className={
                                        errors.testDurationMinutes
                                            ? "border-red-500"
                                            : ""
                                    }
                                />
                                {errors.testDurationMinutes && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.testDurationMinutes}
                                    </p>
                                )}
                            </div>

                            {/* Número de preguntas */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Número de preguntas *
                                </label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={formData.testNumberOfQuestions}
                                    onChange={(e) =>
                                        handleChange(
                                            "testNumberOfQuestions",
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                    className={
                                        errors.testNumberOfQuestions
                                            ? "border-red-500"
                                            : ""
                                    }
                                />
                                {errors.testNumberOfQuestions && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.testNumberOfQuestions}
                                    </p>
                                )}
                            </div>

                            {/* Límite de intentos */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Límite de intentos *
                                </label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={formData.testAttemptLimit}
                                    onChange={(e) =>
                                        handleChange(
                                            "testAttemptLimit",
                                            parseInt(e.target.value) || 0
                                        )
                                    }
                                    className={
                                        errors.testAttemptLimit
                                            ? "border-red-500"
                                            : ""
                                    }
                                />
                                {errors.testAttemptLimit && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.testAttemptLimit}
                                    </p>
                                )}
                            </div>

                            {/* Estado */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Estado
                                </label>
                                <select
                                    value={formData.testState}
                                    onChange={(e) =>
                                        handleChange(
                                            "testState",
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={0}>Inactivo</option>
                                    <option value={1}>Activo</option>
                                </select>
                            </div>

                            {/* Test periódico */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isPeriodic"
                                    checked={formData.isPeriodic}
                                    onChange={(e) =>
                                        handleChange(
                                            "isPeriodic",
                                            e.target.checked
                                        )
                                    }
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="isPeriodic"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Test periódico
                                </label>
                            </div>
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
                                {initialData ? "Guardar Cambios" : "Crear Test"}
                            </Button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
