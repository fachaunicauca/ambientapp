import { reactiveTypes, riskTypes, statusTypes, units } from '@/types/inventaryTypes';
import { z } from 'zod';

const riskTypesEnum = z.enum(riskTypes);

// Campos comunes (sin safetySheet para poder hacerlo condicional)
const commonFields = {
    type: z.enum(reactiveTypes, {
        errorMap: () => ({ message: "Seleccione un tipo de reactivo" })
    }),
    house: z.number({
        errorMap: () => ({ message: "La casa matriz es requerida" })
    }),
    name: z.string().trim().min(1, "El nombre es requerido"),
    formula: z.string().trim().min(1, "La fórmula es requerida"),
    code: z.string().trim().min(1, "El código es requerido"),
    quantity: z.preprocess((val) => val === "" ? undefined : Number(val), z.number({ required_error: "La cantidad es requerida", invalid_type_error: "La cantidad debe ser un número" }).nonnegative("La cantidad no puede ser negativa")),
    minimumQuantity: z.preprocess((val) => val === "" ? undefined : Number(val), z.number({ required_error: "La cantidad mínima es requerida", invalid_type_error: "La cantidad mínima debe ser un número" }).nonnegative("La cantidad mínima no puede ser negativa")),
    measureUnit: z.enum(units, {
        errorMap: () => ({ message: "Seleccione una unidad de medida" })
    }),
    status: z.enum(statusTypes, {
        errorMap: () => ({ message: "Seleccione un estado" })
    }),
    safetySheetExpiration: z.string().min(1, "La fecha de expiración es requerida"),
    riskTypes: z.array(riskTypesEnum, { required_error: "Debe seleccionar al menos un tipo riesgo" }).min(1, "Seleccione al menos un tipo de riesgo")
};

// Fábrica: si es edición -> safetySheet opcional, si es creación -> obligatorio
export function reactiveSchemaFactory() {
    // safetySheet obligatorio siempre (creación y edición requieren nuevo archivo)
    return z.object({
        ...commonFields,
        safetySheet: z.instanceof(File, { message: "Debe adjuntar la hoja de seguridad" })
    });
}

// Tipo común para el formulario (safetySheet opcional porque en edición puede no estar)
export type ReactiveFormValues = z.infer<ReturnType<typeof reactiveSchemaFactory>>;