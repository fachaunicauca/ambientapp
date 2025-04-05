import { z } from "zod";

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
});