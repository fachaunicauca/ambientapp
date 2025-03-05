import { z } from "zod";

export const userSchema = z.object({
    // Validación de correo institucional @unicauca.edu.co
    email: z
        .string()
        .min(1, "El correo es obligatorio")
        .email("Formato de correo inválido")
        .refine((email) => email.endsWith("@unicauca.edu.co"), {
            message: "Solo se permiten correos institucionales (@unicauca.edu.co)",
        }),

    // Validación de contraseña
    password: z
        .string()
        .min(1, "La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
});
