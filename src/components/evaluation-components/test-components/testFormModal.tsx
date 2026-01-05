import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/form/input";
import { saveTestInfo } from "@/api/apiEvaluation/services/test-services";
import { TestInfo } from "@/api/apiEvaluation/interfaces/test-interfaces";
import { TEST_STATE_LABELS } from "@/config/testConfig";

interface TestFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: TestInfo | null;
    teacherEmail: string;
}

export default function TestFormModal({
    isOpen,
    onClose,
    onSuccess,
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
            setFormData({
                testTitle: "",
                testDescription: "",
                testDurationMinutes: 60,
                testNumberOfQuestions: 10,
                testAttemptLimit: 1,
                testState: 0,
                isPeriodic: false,
            });
        }
        setErrors({});
    }, [initialData, isOpen]);

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const submitData: any = {
            ...formData,
            teacherEmail,
            testDescription: formData.testDescription.trim() || null,
        };

        if (initialData) {
            submitData.testId = initialData.testId;
        }

        const result = await saveTestInfo(submitData);

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
                                        errors.testTitle
                                            ? "border-redLight"
                                            : ""
                                    }
                                />
                                {errors.testTitle && (
                                    <p className="mt-1 text-xs text-redLight">
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
                                    min="0"
                                    value={formData.testDurationMinutes}
                                    onChange={(e) =>
                                        handleChange(
                                            "testDurationMinutes",
                                            e.target.value
                                        )
                                    }
                                    className={
                                        errors.testDurationMinutes
                                            ? "border-redLight"
                                            : ""
                                    }
                                />
                                {errors.testDurationMinutes && (
                                    <p className="mt-1 text-xs text-redLight">
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
                                    min="0"
                                    value={formData.testNumberOfQuestions}
                                    onChange={(e) =>
                                        handleChange(
                                            "testNumberOfQuestions",
                                            e.target.value
                                        )
                                    }
                                    className={
                                        errors.testNumberOfQuestions
                                            ? "border-redLight"
                                            : ""
                                    }
                                />
                                {errors.testNumberOfQuestions && (
                                    <p className="mt-1 text-xs text-redLight">
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
                                            e.target.value
                                        )
                                    }
                                    className={
                                        errors.testAttemptLimit
                                            ? "border-redLight"
                                            : ""
                                    }
                                />
                                {errors.testAttemptLimit && (
                                    <p className="mt-1 text-xs text-redLight">
                                        {errors.testAttemptLimit}
                                    </p>
                                )}
                            </div>

                            {/* Estado */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Estado{" "}
                                    {!initialData && (
                                        <span className="text-xs font-normal text-gray-400 font-italic">
                                            (Se podra activar tras agregar el
                                            numero de preguntas especificado.)
                                        </span>
                                    )}
                                </label>
                                <select
                                    value={formData.testState}
                                    onChange={(e) =>
                                        handleChange(
                                            "testState",
                                            parseInt(e.target.value)
                                        )
                                    }
                                    disabled={!initialData} // Si se esta creando el test, no se puede cambiar el estado
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        !initialData
                                            ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                            : ""
                                    }`}
                                >
                                    {Object.entries(TEST_STATE_LABELS).map(
                                        ([type, label]) => (
                                            <option key={type} value={type}>
                                                {label}
                                            </option>
                                        )
                                    )}
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

                        {errors.general && (
                            <p className="mt-4 text-sm text-red-500">
                                {errors.general}
                            </p>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
