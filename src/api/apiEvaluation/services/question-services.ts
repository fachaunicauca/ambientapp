"use server";

import { microsApiServer } from "@/lib/axios";
import { PagedQuestions, QuestionInfo } from "../interfaces/question-interfaces";
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
                size,
            },
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

            return `Error ${status}: ${
                message || "Error al obtener las preguntas."
            }`;
        }

        return `Error desconocido al obtener preguntas del test ${testId}.`;
    }
};

export const saveQuestion = async (
    questionData: QuestionInfo
): Promise<boolean | Record<string, string>> => {
    try {
        const microsApi = await microsApiServer();
        console.log(questionData);

        const formData = new FormData();
        
        // Agregar campos simples
        if(questionData.questionId){
            formData.append('questionId', questionData.questionId.toString());
        }
        
        formData.append('questionText', questionData.questionText);
        formData.append('questionType', questionData.questionType);
        formData.append('questionStructure', questionData.questionStructure);
        formData.append('testId', questionData.testId.toString());
        
        // Agregar campos opcionales solo si tienen valor
        if (questionData.questionTitle) {
            formData.append('questionTitle', questionData.questionTitle);
        }
        
        // Caso 1: Hay un nuevo archivo de imagen
        if (questionData.questionImage) {
            formData.append('questionImage', questionData.questionImage);
        } 
        // Caso 2: NO hay nuevo archivo, pero existe una imagen previa (mantenerla)
        else if (questionData.questionImageId !== null && questionData.questionImageId !== undefined) {
            formData.append('questionImageId', questionData.questionImageId.toString());
            formData.append('questionImageUrl', questionData.questionImageUrl || '');
        }
        // Caso 3: No hay nuevo archivo y no hay imagen previa (no hacer nada)
        
        console.log('Enviando FormData:', formData);
        
        const response = await microsApi.post(`/questions`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 201) {
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

        // 400 y string: error de estructura
        if (status === 400 && typeof data === "string") {
            return { questionStructure: data as string };
        }

        // 404: no se encontro el test asociado o no se encontro el algoritmo de validacion
        if (status === 404) {
            return {
                general: data as string,
            };
        }

        return { general: `Error desconocido al guardar la pregunta. ${error} ${data}` };
    }
};

export const deleteQuestionById = async (
    questionId: number
): Promise<boolean | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.delete(`/questions/${questionId}`);

        if (response.status === 200) {
            return true;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const status = axiosError.response.status;
            const message = axiosError.response.data as string;

            if (status === 404) {
                return `Pregunta con ID ${questionId} no encontrada.`;
            }
        }

        return `Error desconocido al eliminar la pregunta con ID ${questionId}.`;
    }
};
