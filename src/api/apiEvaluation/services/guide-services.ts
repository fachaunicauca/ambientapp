"use server";

import { microsApiServer } from "@/lib/axios";
import { TestGuideRequest } from "../interfaces/guide-interfaces";
import { AxiosError } from "axios";

export const fetchFileData = async () => {
  try {
    const microsApi = await microsApiServer();
    const response = await microsApi.get("/guides");

    const data = response.data;

    return { success: true, files: data.testGuideList };
  } catch (error) {
    const axiosError = AxiosError.from(error);

    if (!axiosError.status || axiosError.status !== 404) {
      throw new Error(`Error HTTP: ${axiosError.status}`);
    }
    if (axiosError.status === 404) {
      return { error: "No se encontraron archivos" };
    }
    return { error: "Error al obtener los datos del servidor." };
  }
};

export const uploadFile = async (guide: TestGuideRequest) => {
  try {
    const microsApi = await microsApiServer();
    
    const response = await microsApi.post("/guides", guide);

    if (!response.status || response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error en uploadFile:", error);
    return { error: "Error al subir la guía al servidor." };
  }
};

export const deleteFile = async (fileName: string) => {
  try {
    const microsApi = await microsApiServer();
    const response = await microsApi.delete(
      `/guides?test_guide_id=${fileName}`
    );

    if (!response.status || response.status !== 200) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error en deleteFile:", error);
    return { error: "Error al borrar la guía en el servidor." };
  }
};
