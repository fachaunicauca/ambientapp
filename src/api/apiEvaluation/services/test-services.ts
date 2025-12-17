"use server";

import { microsApiServer } from "@/lib/axios";
import { TestInfo } from "../interfaces/test-interfaces";
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
                return axiosError.response.data as string ||"Test no encontrado (404).";
            }
            return`Error ${axiosError.response.status}: ${
                    axiosError.response.data || "Error del servidor."
                }`;
        }
        return `Error desconocido al obtener la información del test con id ${testId}.`;
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
            throw new AxiosError("Partial Content", undefined, undefined, undefined, response);
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
                testNumberOfQuestions: data
            };
        }

        //409: título duplicado
        if (status === 409 && typeof data === "string") {
            return {
                testTitle: data
            };
        }

        //404: no encontrado
        if (status === 404 && typeof data === "string") {
            return {
                general: data
            };
        }

        return {
            general: "Ocurrió un error inesperado al guardar la evaluación."
        };
    }
};


