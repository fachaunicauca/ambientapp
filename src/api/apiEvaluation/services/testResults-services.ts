"use server";

import { microsApiServer } from "@/lib/axios";
import {
    PagedAttemptRequests,
    PagedStudentsResults,
    TestStats,
} from "../interfaces/testResults-interfaces";
import { AxiosError } from "axios";

export const getPendingAttemptRequests = async (
    testId: number,
    page: number,
    size: number
): Promise<PagedAttemptRequests | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.get(`/tests/${testId}/requests`, {
            params: { page, size },
        });

        if (response.status === 200) {
            return response.data as PagedAttemptRequests;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            if (axiosError.response.status === 404) {
                return (
                    (axiosError.response.data as string) ||
                    "No hay solicitudes pendientes o la evaluación no existe (404)."
                );
            }

            return `Error ${axiosError.response.status}: ${
                axiosError.response.data || "Error del servidor."
            }`;
        }

        return `Error desconocido al obtener las solicitudes de restablecer intentos del test con id ${testId}.`;
    }
};

export const requestAttemptsReset = async (
    testId: number,
    studentEmail: string
): Promise<boolean | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.post(
            `/tests/${testId}/requests`,
            null,
            {
                params: { studentEmail },
            }
        );

        if (response.status === 200) {
            return true;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const status = axiosError.response.status;
            const message = axiosError.response.data as string;

            if (status === 404 || status === 409) {
                return message;
            }

            return `Error ${status}: ${message || "Error del servidor."}`;
        }

        return `Error desconocido al solicitar el restablecimiento de intentos para el test con ID ${testId}.`;
    }
};

export const resetStudentAttempts = async (
    testId: number,
    studentEmail: string
): Promise<boolean | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.post(
            `/tests/${testId}/requests/reset`,
            null,
            {
                params: { studentEmail },
            }
        );

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
                return message;
            }

            return `Error ${status}: ${message || "Error del servidor."}`;
        }

        return `Error desconocido al restablecer los intentos del estudiante ${studentEmail} en el test con ID ${testId}.`;
    }
};

export const getTestResultsPaged = async (
    testId: number,
    page: number,
    size: number
): Promise<PagedStudentsResults | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.get(`/tests/results/${testId}`, {
            params: { page, size },
        });

        if (response.status === 200) {
            return response.data as PagedStudentsResults;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            if (axiosError.response.status === 404) {
                return (
                    (axiosError.response.data as string) ||
                    "No se encontró la evaluación o el curso no tiene estudiantes (404)."
                );
            }

            return `Error ${axiosError.response.status}: ${
                axiosError.response.data || "Error del servidor."
            }`;
        }

        return `Error desconocido al obtener los resultados del test con id ${testId}.`;
    }
};

export const getTestStats = async (
    testId: number
): Promise<TestStats | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.get(`/tests/results/${testId}/stats`);

        if (response.status === 200) {
            return response.data as TestStats;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            if (axiosError.response.status === 404) {
                return (
                    (axiosError.response.data as string) ||
                    "No se encontró la evaluación (404)."
                );
            }

            return `Error ${axiosError.response.status}: ${
                axiosError.response.data || "Error del servidor."
            }`;
        }

        return `Error desconocido al obtener las estadísticas del test con id ${testId}.`;
    }
};