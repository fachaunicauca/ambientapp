import { z } from 'zod';

export const practiceSchema = z.object({
    user: z.object({
        name: z.string().min(1, "El nombre del usuario es requerido"),
        email: z.string().email("Formato de correo electrónico inválido"),
    }),
    numberOfEstudents: z.number().int().positive("El número de estudiantes debe ser positivo")
        .max(50, "El número máximo de estudiantes permitido es 50"),
    practiceName: z.string().min(3, "El nombre de la práctica debe tener al menos 3 caracteres")
        .max(100, "El nombre de la práctica no puede exceder 100 caracteres"),
    practiceDate: z.string()
        .refine(date => !isNaN(Date.parse(date)), "La fecha debe tener un formato válido")
        .refine(date => new Date(date) > new Date(), "La fecha de práctica debe ser futura"),
    materials: z.array(
        z.object({
            materialName: z.string().min(1, "El nombre del material es requerido"),
            amount: z.number().int().positive("La cantidad debe ser un número positivo"),
        })
    ).min(1, "Debe especificar al menos un material"),
    reactives: z.array(
        z.object({
            sustanceName: z.string().min(1, "El nombre de la sustancia es requerido"),
            unity: z.string().min(1, "La unidad de medida es requerida"),
            amount: z.number().positive("La cantidad debe ser un número positivo"),
            concentration: z.number().positive("La concentración debe ser un número positivo"),
            type: z.enum(["Reactivo", "Solución"]),
            concentrationType: z.enum(["Molar", "Porcentaje en peso", "Porcentaje en volumen", "Normal"])
        })
    ).min(1, "Debe especificar al menos un reactivo"),
    wastes: z.array(
        z.object({
            wasteType: z.string().min(1, "El tipo de residuo es requerido"),
            wasEunity: z.string().min(1, "La unidad de medida del residuo es requerida"),
            estametedAmount: z.number().positive("La cantidad estimada debe ser un número positivo"),
            wasteGenerationDate: z.string()
                .refine(date => !isNaN(Date.parse(date)), "La fecha de generación debe tener un formato válido"),
            wasteHourGenration: z.string()
                .refine(time => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time),
                    "La hora debe tener un formato válido (HH:MM)")
        })
    ).min(1, "Debe especificar al menos un residuo"),
});

// Transformaciones para normalizar los datos
export const normalizedPracticeSchema = practiceSchema.transform(data => {
    return {
        ...data,
        reactives: data.reactives.map(reactive => ({
            sustanceName: reactive.sustanceName,
            unity: reactive.unity,
            amount: reactive.amount,
            concentration: reactive.concentration,
        })),
    };
});

export type practiceFormValues = z.infer<typeof practiceSchema>;
export type normalizedPracticeFormValues = z.infer<typeof normalizedPracticeSchema>;