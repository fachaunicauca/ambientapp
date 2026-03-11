"use server";

import { microsApiServer } from "@/lib/axios";
import {
    PagedTestGuides,
    TestGuideRequest,
} from "../interfaces/guide-interfaces";
import { AxiosError } from "axios";

export const getGuidesPaged = async (
    page: number,
    size: number,
    filterKey?: string,
    filterValue?: string
): Promise<PagedTestGuides | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.get(`/guides`, {
            params: {
                page: page,
                size: size,
                ...(filterKey && { filterKey }),
                ...(filterValue && { filterValue }),
            },
        });

        if (response.status === 200) {
            return response.data as PagedTestGuides;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            if (axiosError.response.status === 404) {
                return (
                    (axiosError.response.data as string) ||
                    "No hay guías almacenadas."
                );
            }

            return `Error ${axiosError.response.status}: ${
                axiosError.response.data ||
                "Error al obtener la lista de guías."
            }`;
        }

        return "Error desconocido al intentar obtener las guías.";
    }
};

export const uploadFile = async (
    guide: TestGuideRequest
): Promise<boolean | Record<string, string>> => {
    try {
        const microsApi = await microsApiServer();

        const formData = new FormData();

        formData.append("testGuideId", guide.testGuideId.toString());
        formData.append("testGuideArchive", guide.testGuideArchive);
        formData.append("teacherEmail", guide.teacherEmail.toString());

        console.log(guide.teacherEmail);

        const response = await microsApi.post(`/guides`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status === 200) {
            return true;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError<any>;

        if (!axiosError.response) {
            return { general: "No se pudo conectar con el servidor." };
        }

        const { status, data } = axiosError.response;

        // 400 y objeto: errores de campo
        if (status === 400 && typeof data === "object") {
            return data;
        }

        // 409 y string: conflicto por ID ya existente
        if (status === 409 && typeof data === "string") {
            return { testGuideId: data as string };
        }

        // 500: error al comunicarse con el repositorio de archivos
        if (status === 500) {
            return {
                general: data as string,
            };
        }

        return {
            general: `Error desconocido al subir la guía. ${error} ${data}`,
        };
    }
};

export const deleteTestGuide = async (
    testGuideId: string
): Promise<boolean | string> => {
    try {
        const microsApi = await microsApiServer();
        const response = await microsApi.delete(
            `/guides?test_guide_id=${testGuideId}`
        );

        if (!response.status || response.status !== 200) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error("Error en deleteFile:", error);
        return "Error al borrar la guía en el servidor.";
    }
};
