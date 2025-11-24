import { ReactiveFormValues } from "@/validations/reactiveSchema";

export function traducirErrorBackend(mensaje: string, data: ReactiveFormValues): string {
    const lower = mensaje.toLowerCase();

    if (lower.includes("reactive with code") && lower.includes("already exists")) {
        return `Ya existe un reactivo con el código "${data.code}". Por favor, ingresa uno diferente.`;
    }

    if (lower.includes("reactive with name") && lower.includes("or formula") && lower.includes("already exists")) {
        return `Ya existe un reactivo con el nombre "${data.name}" o la fórmula "${data.formula}". Por favor, ingresa uno diferente.`;
    }
    return "Ocurrió un error al procesar la solicitud.";
}
