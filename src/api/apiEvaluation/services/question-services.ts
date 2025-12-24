"use server"

import { microsApiServer } from "@/lib/axios";
import { PagedQuestions } from "../interfaces/question-interfaces";
import { AxiosError } from "axios";

export const getTestQuestionsPaged = async (
    testId: number,
    page: number = 0,
    size: number = 10 //Valor por defecto
): Promise<PagedQuestions | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.get(`/questions`, {
            params: {
                testId,
                page,
                size
            }
        });

        if (response.status === 200) {
            return response.data as PagedQuestions;
        }

        if (response.status === 204) {
            return response.data as string;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const status = axiosError.response.status;
            const message = axiosError.response.data as string;
            
            return `Error ${status}: ${message || "Error al obtener las preguntas."}`;
        }

        return `Error desconocido al obtener preguntas del test ${testId}.`;
    }
};