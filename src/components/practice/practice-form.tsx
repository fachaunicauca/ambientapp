"use client"

// import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/layout/card"
import { FormField } from "@/components/ui/form/formField"
import { Button } from "@/components/ui/buttons/button"
import { Beaker, Plus, Trash2, FlaskRoundIcon as Flask, Trash, User, ClipboardList } from "lucide-react"
import { defaultPracticeValues } from "@/config/practiceConfig"
import { practiceFormValues, practiceSchema } from "@/validations/practiceSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { PracticeEducator } from "@/interface/educator"
import { useRouter } from "next/navigation";
import { createPracticeAction } from "@/actions/educatorAction"
import { toast } from "sonner"
import { useState } from "react"

interface PracticeFormProps {
    initialValues?: practiceFormValues;
}

export default function PracticeForm({initialValues}: PracticeFormProps) {
    const [, setIsSubmitting] = useState(false)
    const router = useRouter();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<practiceFormValues>({
        resolver: zodResolver(practiceSchema),
        defaultValues: initialValues || defaultPracticeValues,
    })

    const handleCreatePractice = async (data: PracticeEducator) => {
        setIsSubmitting(true)
        console.log("Datos de la práctica:", data);

        try {
            const res = await createPracticeAction(data)
            if (res.success) {
                toast.success("Práctica creada exitosamente");
                router.push("/dashboard/docente/practica-laboratorio")
                router.refresh();
            } else {
                toast.error(res.error || "Error al crear la práctica");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error al crear la práctica");
        } finally {
            setIsSubmitting(false);
        }
    }

    // Configurar arrays dinámicos para materiales, reactivos y residuos
    const {
        fields: materialFields,
        append: appendMaterial,
        remove: removeMaterial,
    } = useFieldArray({
        control,
        name: "materials",
    });

    const {
        fields: reactiveFields,
        append: appendReactive,
        remove: removeReactive,
    } = useFieldArray({
        control,
        name: "reactives",
    });

    const {
        fields: wasteFields,
        append: appendWaste,
        remove: removeWaste,
    } = useFieldArray({
        control,
        name: "wastes",
    });

    return (
        <div className="">
            <Card className="w-full border-l-4 border-l-blue border-r-0 border-t-0 border-b-0 rounded-l-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue/10 to-transparent pb-6">
                    <div className="flex items-center gap-3">
                        <Beaker className="h-6 w-6 text-blue" />
                        <CardTitle className="text-blueDark text-2xl">Solicitud de Práctica</CardTitle>
                    </div>
                    <CardDescription className="text-blueDark/70 mt-2">
                        Complete todos los campos requeridos para solicitar una práctica de laboratorio.
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-6 px-8">
                    <form className="space-y-8" onSubmit={handleSubmit(handleCreatePractice)}>
                        {/* Información básica de la práctica */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-blueDark flex items-center gap-2 mb-4">
                                <ClipboardList className="h-5 w-5" />
                                Información de la Práctica
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <FormField
                                    id="practiceName"
                                    label="Nombre de la Práctica"
                                    tooltipText="Nombre descriptivo de la práctica"
                                    placeholder="Ej: Titulación ácido-base"
                                    register={register("practiceName", { required: "Este campo es obligatorio" })}
                                    error={errors.practiceName?.message}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <FormField
                                    id="practiceDate"
                                    label="Fecha y Hora de la Práctica"
                                    placeholder="Ej: 2023-10-01T10:00"
                                    tooltipText="Fecha y hora programada para la práctica"
                                    type="datetime-local"
                                    register={register("practiceDate", { required: "Este campo es obligatorio" })}
                                    error={errors.practiceDate?.message}
                                />

                                <FormField
                                    id="numberOfEstudents"
                                    label="Número de Estudiantes"
                                    tooltipText="Cantidad de estudiantes que participarán"
                                    type="number"
                                    placeholder="Ej: 25"
                                    register={register("numberOfEstudents", {
                                        required: "Este campo es obligatorio",
                                        min: { value: 1, message: "Debe haber al menos 1 estudiante" },
                                        setValueAs: (value) => parseInt(value, 10),
                                    })}
                                    error={errors.numberOfEstudents?.message}
                                />
                            </div>
                        </div>

                        {/* Información del usuario */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-blueDark flex items-center gap-2 mb-4">
                                <User className="h-5 w-5" />
                                Información del Solicitante
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    id="user.name"
                                    label="Nombre"
                                    tooltipText="Nombre completo del solicitante"
                                    placeholder="Ej: Juan Pérez"
                                    register={register("user.name", { required: "Este campo es obligatorio" })}
                                    error={errors.user?.name?.message}
                                />

                                <FormField
                                    id="user.code"
                                    label="Código"
                                    tooltipText="Código de identificación"
                                    placeholder="Ej: U1212213"
                                    register={register("user.code", { required: "Este campo es obligatorio" })}
                                    error={errors.user?.code?.message}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <FormField
                                    id="user.id"
                                    label="ID"
                                    tooltipText="Número de identificación"
                                    placeholder="Ej: 231"
                                    type="number"
                                    register={register("user.id", {
                                        required: "Este campo es obligatorio",
                                        setValueAs: (value) => parseInt(value, 10),
                                    })}
                                    error={errors.user?.id?.message}
                                />

                                <FormField
                                    id="user.email"
                                    label="Correo Electrónico"
                                    tooltipText="Correo electrónico de contacto"
                                    placeholder="Ej: usuario@ejemplo.com"
                                    type="email"
                                    register={register("user.email", {
                                        required: "Este campo es obligatorio",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Correo electrónico inválido",
                                        },
                                    })}
                                    error={errors.user?.email?.message}
                                />
                            </div>
                        </div>

                        {/* Materiales */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-blueDark flex items-center gap-2">
                                    <Beaker className="h-5 w-5" />
                                    Materiales
                                </h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-blue border-blue hover:bg-blue/10"
                                    onClick={() => appendMaterial({ materialName: "", amount: 0 })}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Agregar Material
                                </Button>
                            </div>

                            {materialFields.map((field, index) => (
                                <div key={field.id} className="p-3 border border-gray-200 rounded-md mb-3 bg-white">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-medium text-blueDark">Material #{index + 1}</h4>
                                        {materialFields.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 text-red-500"
                                                onClick={() => removeMaterial(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            id={`materials.${index}.materialName`}
                                            label="Nombre del Material"
                                            placeholder="Ej: Vaso de precipitado"
                                            tooltipText="Nombre del material a utilizar"
                                            register={register(`materials.${index}.materialName`, {
                                                required: "Este campo es obligatorio",
                                            })}
                                            error={errors.materials?.[index]?.materialName?.message}
                                        />

                                        <FormField
                                            id={`materials.${index}.amount`}
                                            label="Cantidad"
                                            type="number"
                                            placeholder="Ej: 5"
                                            tooltipText="Cantidad del material a utilizar"
                                            register={register(`materials.${index}.amount`, {
                                                required: "Este campo es obligatorio",
                                                min: { value: 1, message: "La cantidad debe ser mayor a 0" },
                                                setValueAs: (value) => parseInt(value, 10),

                                            })}
                                            error={errors.materials?.[index]?.amount?.message}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Reactivos */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-blueDark flex items-center gap-2">
                                    <Flask className="h-5 w-5" />
                                    Reactivos
                                </h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-blue border-blue hover:bg-blue/10"
                                    onClick={() =>
                                        appendReactive({
                                            sustanceName: "",
                                            code: "",
                                            unity: "g",
                                            amount: 0,
                                            concentration: 0,
                                            reactiveID: 0,
                                        })
                                    }
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Agregar Reactivo
                                </Button>
                            </div>

                            {reactiveFields.map((field, index) => (
                                <div key={field.id} className="p-3 border border-gray-200 rounded-md mb-3 bg-white">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-medium text-blueDark">Reactivo #{index + 1}</h4>
                                        {reactiveFields.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 text-red-500"
                                                onClick={() => removeReactive(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                        <FormField
                                            id={`reactives.${index}.sustanceName`}
                                            label="Nombre de la Sustancia"
                                            placeholder="Ej: Ácido Clorhídrico"
                                            tooltipText="Nombre del reactivo a utilizar"
                                            register={register(`reactives.${index}.sustanceName`, {
                                                required: "Este campo es obligatorio",
                                            })}
                                            error={errors.reactives?.[index]?.sustanceName?.message}
                                        />

                                        <FormField
                                            id={`reactives.${index}.code`}
                                            label="Código"
                                            placeholder="Ej: HCl-001"
                                            tooltipText="Código del reactivo"
                                            register={register(`reactives.${index}.code`, {
                                                required: "Este campo es obligatorio",
                                            })}
                                            error={errors.reactives?.[index]?.code?.message}
                                        />

                                        <FormField
                                            id={`reactives.${index}.reactiveID`}
                                            label="ID del Reactivo"
                                            type="number"
                                            placeholder="Ej: 101"
                                            tooltipText="ID único del reactivo"
                                            register={register(`reactives.${index}.reactiveID`, {
                                                required: "Este campo es obligatorio",
                                                setValueAs: (value) => parseInt(value, 10),

                                            })}
                                            error={errors.reactives?.[index]?.reactiveID?.message}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormField
                                            id={`reactives.${index}.amount`}
                                            label="Cantidad"
                                            type="number"
                                            placeholder="Ej: 100"
                                            tooltipText="Cantidad del reactivo a utilizar"
                                            register={register(`reactives.${index}.amount`, {
                                                required: "Este campo es obligatorio",
                                                min: { value: 0.01, message: "La cantidad debe ser mayor a 0" },
                                                setValueAs: (value) => parseInt(value, 10),

                                            })}
                                            error={errors.reactives?.[index]?.amount?.message}
                                        />

                                        <FormField
                                            id={`reactives.${index}.unity`}
                                            label="Unidad"
                                            placeholder="Ej: g"
                                            tooltipText="Unidad de medida del reactivo"
                                            register={register(`reactives.${index}.unity`, {
                                                required: "Este campo es obligatorio",
                                            })}
                                            error={errors.reactives?.[index]?.unity?.message}
                                        />

                                        <FormField
                                            id={`reactives.${index}.concentration`}
                                            label="Concentración"
                                            type="number"
                                            placeholder="Ej: 5"
                                            tooltipText="Concentración del reactivo"
                                            register={register(`reactives.${index}.concentration`, {
                                                required: "Este campo es obligatorio",
                                                setValueAs: (value) => parseInt(value, 10),

                                            })}
                                            error={errors.reactives?.[index]?.concentration?.message}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Residuos */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-blueDark flex items-center gap-2">
                                    <Trash className="h-5 w-5" />
                                    Residuos
                                </h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-blue border-blue hover:bg-blue/10"
                                    onClick={() =>
                                        appendWaste({
                                            wasteType: "",
                                            wasEunity: "g",
                                            estametedAmount: 0,
                                            wasteGenerationDate: "",
                                            wasteHourGenration: "",
                                        })
                                    }
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Agregar Residuo
                                </Button>
                            </div>

                            {wasteFields.map((field, index) => (
                                <div key={field.id} className="p-3 border border-gray-200 rounded-md mb-3 bg-white">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-medium text-blueDark">Residuo #{index + 1}</h4>
                                        {wasteFields.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="h-8 w-8 p-0 text-red-500"
                                                onClick={() => removeWaste(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                        <FormField
                                            id={`wastes.${index}.wasteType`}
                                            label="Tipo de Residuo"
                                            placeholder="Ej: Residuo Químico"
                                            tooltipText="Tipo de residuo generado"
                                            register={register(`wastes.${index}.wasteType`, {
                                                required: "Este campo es obligatorio",
                                            })}
                                            error={errors.wastes?.[index]?.wasteType?.message}
                                        />

                                        <div className="grid grid-cols-2 gap-2">
                                            <FormField
                                                id={`wastes.${index}.estametedAmount`}
                                                label="Cantidad Estimada"
                                                type="number"
                                                placeholder="Ej: 2.5"
                                                tooltipText="Cantidad estimada de residuo generado"
                                                register={register(`wastes.${index}.estametedAmount`, {
                                                    required: "Este campo es obligatorio",
                                                    setValueAs: (value) => parseInt(value, 10),
                                                })}
                                                error={errors.wastes?.[index]?.estametedAmount?.message}
                                            />

                                            <FormField
                                                id={`wastes.${index}.wasEunity`}
                                                label="Unidad"
                                                placeholder="Ej: g"
                                                tooltipText="Unidad de medida del residuo"
                                                register={register(`wastes.${index}.wasEunity`, {
                                                    required: "Este campo es obligatorio",
                                                })}
                                                error={errors.wastes?.[index]?.wasEunity?.message}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            id={`wastes.${index}.wasteGenerationDate`}
                                            label="Fecha de Generación"
                                            type="date"
                                            placeholder="Ej: 2023-10-01"
                                            tooltipText="Fecha de generación del residuo"
                                            register={register(`wastes.${index}.wasteGenerationDate`, {
                                                required: "Este campo es obligatorio",
                                            })}
                                            error={errors.wastes?.[index]?.wasteGenerationDate?.message}
                                        />

                                        <FormField
                                            id={`wastes.${index}.wasteHourGenration`}
                                            label="Hora de Generación"
                                            type="datetime-local"
                                            placeholder="Ej: 2023-10-01T10:00"
                                            tooltipText="Hora de generación del residuo"
                                            register={register(`wastes.${index}.wasteHourGenration`, {
                                                required: "Este campo es obligatorio",
                                            })}
                                            error={errors.wastes?.[index]?.wasteHourGenration?.message}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Botones de acción */}
                        <div className="pt-4 flex gap-4 justify-center">
                            <Button
                                type="submit"
                                variant="default"
                                // disabled={isSubmitting}
                                className="w-full md:w-auto md:min-w-[200px]"
                            >
                                <Beaker className="h-4 w-4 mr-2" />
                                Enviar solicitud
                                {/* {isSubmitting ? "Enviando..." : "Enviar Solicitud"} */}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full md:w-auto md:min-w-[200px]"
                                onClick={() => (window.location.href = "/")}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}