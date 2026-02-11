"use server";

import { microsApiServer } from "@/lib/axios";
import { PagedTests, TestInfo } from "../interfaces/test-interfaces";
import { AxiosError } from "axios";

export const getTestInfo = async (
    testId: number
): Promise<TestInfo | string> => {
    try {
        const microsApi = await microsApiServer();
        const response = await microsApi.get(`/tests/${testId}`);

        if (response.status === 200) {
            const data: TestInfo = response.data;
            return data;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            if (axiosError.response.status === 404) {
                return (
                    (axiosError.response.data as string) ||
                    "Test no encontrado (404)."
                );
            }
            return `Error ${axiosError.response.status}: ${
                axiosError.response.data || "Error del servidor."
            }`;
        }
        return `Error desconocido al obtener la información del test con id ${testId}.`;
    }
};

export const getTestsPaged = async (
    page: number,
    size: number
): Promise<PagedTests | string> => {
    try {
        const microsApi = await microsApiServer();
        const response = await microsApi.get(`/tests`, {
            params: { page, size },
        });

        if (response.status === 200) {
            const data: PagedTests = response.data;
            return data;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            if (axiosError.response.status === 404) {
                return (
                    (axiosError.response.data as string) ||
                    "No hay evaluaciones almacenadas."
                );
            }

            return `Error ${axiosError.response.status}: ${
                axiosError.response.data ||
                "Error al obtener la lista de evaluaciones."
            }`;
        }

        return "Error desconocido al intentar obtener las evaluaciones.";
    }
};

export const saveTestInfo = async (
    testData: TestInfo
): Promise<boolean | Record<string, string>> => {
    try {
        const microsApi = await microsApiServer();
        const response = await microsApi.post("/tests", testData);

        if (response.status === 201) {
            return true;
        }

        if (response.status === 206) {
            throw new AxiosError(
                "Partial Content",
                undefined,
                undefined,
                undefined,
                response
            );
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError<any>;

        if (!axiosError.response) {
            return { general: "No se pudo conectar con el servidor." };
        }

        const { status, data } = axiosError.response;

        // 400 y objeto: errores de campos
        if (status === 400 && typeof data === "object") {
            return data;
        }

        // 400 y string: error de numero de preguntas
        if (status === 400 && typeof data === "string") {
            return {
                testState: data,
            };
        }

        //409: título duplicado
        if (status === 409 && typeof data === "string") {
            return {
                testTitle: data,
            };
        }

        //404: no encontrado
        if (status === 404 && typeof data === "string") {
            return {
                general: data,
            };
        }

        console.log(axiosError.response);
        return {
            general: "Ocurrió un error inesperado al guardar la evaluación.",
        };
    }
};

export const deleteTest = async (id: number): Promise<boolean | string> => {
    try {
        const microsApi = await microsApiServer();
        const response = await microsApi.delete(`/tests/${id}`);

        if (response.status === 200) {
            return true;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const status = axiosError.response.status;

            if (status === 404) {
                return (
                    (axiosError.response.data as string) ||
                    "No se encontró la evaluación que se quiere eliminar."
                );
            }

            if (status === 403) {
                return (
                    (axiosError.response.data as string) ||
                    "No se puede eliminar la evaluación general."
                );
            }

            return `Error ${status}: ${
                axiosError.response.data || "No se pudo eliminar la evaluación."
            }`;
        }

        return `Error desconocido al intentar eliminar la evaluación con id ${id}.`;
    }
};
