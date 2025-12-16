"use server";

import { ReactiveProps } from "@/types/inventaryTypes";
import { ReactiveFormValues } from "@/validations/reactiveSchema";
import { microsApiServer } from "@/lib/axios";
import { AxiosError } from "axios";
import { traducirErrorBackend } from "./utils/functions";

// Normaliza la fecha al formato requerido por el backend: YYYY-MM-DDT23:59:59
function ensureSafetyExpirationFormat(date?: string): string | undefined {
  if (!date) return undefined;
  // Si ya tiene una "T" asumimos que viene completa
  if (date.includes("T")) return date;
  // Agregamos fin de día por defecto
  return `${date}T23:59:59`;
};

interface PromiseSuccess {
  success: boolean;
  error?: string;
  field?: string;
  status?: number;
}

export async function getReactivesAction(): Promise<ReactiveProps[]> {
  try {
    const microsApi = await microsApiServer();
    const response = await microsApi.get(`/reactive`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los reactivos:", error);
    return [];
  }
}

export async function getReactiveAction(id: string): Promise<ReactiveProps> {
  try {
    const microsApi = await microsApiServer();
    const response = await microsApi.get(`/reactive/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el reactivo:", error);
    throw new Error("No se pudo obtener el reactivo.");
  }
}

export async function postReactiveAction(
  data: ReactiveFormValues
): Promise<PromiseSuccess> {
  try {
    const formData = new FormData();

    // 🔹 Convertimos los campos del formulario en pares clave-valor
    for (const [key, value] of Object.entries(data)) {
      if (value === undefined || value === null) continue;

      if (key === "riskTypes" && Array.isArray(value)) {
        // 🔸 El backend espera una lista o cadena separada por comas
        value.forEach((v) => formData.append("riskTypes", v));
      } else if (key === "safetySheet" && value instanceof File) {
        // 🔸 Archivo obligatorio
        formData.append("safetySheet", value);
      } else if (key === "safetySheetExpiration" && typeof value === "string") {
        formData.append("safetySheetExpiration", ensureSafetyExpirationFormat(value)!);
      } else {
        formData.append(key, String(value));
      }
    }

    const microsApi = await microsApiServer();
    await microsApi.post(`/reactive`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true };
  } catch (err) {
    const error = err as AxiosError;

    console.error("Error al crear el reactivo:", error.status, "-", error.response?.data);

    // Si la respuesta viene del backend con status y data
    if (error.response) {
      const backendData = error.response.data;
      const message =
        typeof backendData === "string"
          ? backendData
          : (backendData as { message?: string })?.message ??
          "Ocurrió un error al procesar la petición.";

      return {
        success: false,
        error: traducirErrorBackend(message, data),
        status: error.response.status,
      };
    }

    return {
      success: false,
      error: "No se pudo conectar con el servidor.",
    };
  }
}

export async function putReactiveAction(
  id: number,
  data: ReactiveFormValues
): Promise<PromiseSuccess> {
  try {
    // Validación temprana: hoja de seguridad obligatoria
    if (!data.safetySheet || !(data.safetySheet instanceof File)) {
      return {
        success: false,
        error: "Debe adjuntar la hoja de seguridad al editar.",
        field: "safetySheet",
      };
    }
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (value === undefined || value === null) continue;

      if (key === "riskTypes" && Array.isArray(value)) {
        value.forEach((v) => formData.append("riskTypes", v));
      } else if (key === "safetySheet" && value instanceof File) {
        formData.append("safetySheet", value);
      } else if (key === "safetySheetExpiration" && typeof value === "string") {
        formData.append("safetySheetExpiration", ensureSafetyExpirationFormat(value)!);
      } else {
        formData.append(key, String(value));
      }
    }

    const microsApi = await microsApiServer();
    await microsApi.put(`/reactive/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true };
  } catch (err) {
    const error = err as AxiosError;

    console.error("Error al actualizar el reactivo:", error.status, "-", error.response?.data);

    if (error.response) {
      const backendData = error.response.data;
      const message =
        typeof backendData === "string"
          ? backendData
          : (backendData as { message?: string })?.message ??
          "Ocurrió un error al procesar la petición.";

      return {
        success: false,
        error: traducirErrorBackend(message, data),
        status: error.response.status,
      };
    }

    return {
      success: false,
      error: "No se pudo conectar con el servidor.",
    }
  }
}

export async function deleteReactiveAction(id: number): Promise<PromiseSuccess> {
  try {
    const microsApi = await microsApiServer();
    await microsApi.delete(`/reactive/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el reactivo:", error);
    return {
      success: false,
      error: "No se pudo eliminar el reactivo.",
    };
  }
}
