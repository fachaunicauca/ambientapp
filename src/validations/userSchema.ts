import { z } from "zod";

// Credenciales de prueba
const CREDENTIALS = {
    email: "cmperdomo@unicauca.edu.co",
    password: "aguapanela"
};

export const userSchema = z.object({
    // Validación de correo institucional
    email: z
        .string()
        .min(1, "El correo es obligatorio")
        .email("Este correo no es válido. Requiere @unicauca.edu.co")
        .refine((email) => email.endsWith("@unicauca.edu.co"), {
            message: "Este correo no es válido. Requiere @unicauca.edu.co",
        }),

    // Validación de contraseña
    password: z
        .string()
        .min(1, "La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
})
    // Validación cruzada para las credenciales
    .superRefine((data, ctx) => {
        // Validar el correo específico
        if (data.email !== CREDENTIALS.email && data.email.endsWith("@unicauca.edu.co")) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Correo incorrecto. Intente de nuevo.",
                path: ["email"]
            });
        }

        // Si el correo es correcto pero la contraseña es incorrecta
        if (data.email === CREDENTIALS.email && data.password !== CREDENTIALS.password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Contraseña incorrecta. Intente de nuevo.",
                path: ["password"]
            });
        }
    });