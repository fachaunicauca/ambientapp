"use server";

import { microsApiServer } from "@/lib/axios";
import {
    PagedTestsBasicInfo,
    StudentTestAttempt,
    StudentTestAttemptResult,
    TakeTestInfo,
    TestBasicInfo,
} from "../interfaces/takeTest-interfaces";
import { AxiosError } from "axios";

export const getActiveTestsPaged = async (
    page: number,
    size: number
): Promise<PagedTestsBasicInfo | string> => {
    try {
        const microsApi = await microsApiServer();
        const response = await microsApi.get(`/takeTest/tests`, {
            params: { page, size },
        });

        if (response.status === 200) {
            const data: PagedTestsBasicInfo = response.data;
            return data;
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

            return `Error ${status}: ${
                message || "Error al obtener los tests activos."
            }`;
        }

        return `Error desconocido al obtener los tests activos.`;
    }
};

export const getGeneralTest = async (): Promise<TestBasicInfo | string> => {
    try {
        const microsApi = await microsApiServer();
        const response = await microsApi.get(`/takeTest/tests/general`);

        if (response.status === 200) {
            return response.data as TestBasicInfo;
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

            return `Error ${status}: ${
                message || "Error al obtener el test general."
            }`;
        }

        return `Error desconocido al obtener el test general.`;
    }
};

export const startTestAttempt = async (
    testId: number,
    studentEmail: string
): Promise<TakeTestInfo | string | Record<string, string>> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.get(`/takeTest/${testId}`, {
            params: { studentEmail },
        });

        if (response.status === 200) {
            return response.data as TakeTestInfo;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const status = axiosError.response.status;

            if (status === 404 || status === 409) {
                return axiosError.response.data as string;
            }

            if (status === 403) {
                return axiosError.response.data as Record<string, string>;
            }

            return `Error ${status}: ${
                (axiosError.response.data as string) ||
                "Error al iniciar la evaluación."
            }`;
        }

        return "Error desconocido al iniciar la evaluación.";
    }
};

export const scoreAndSaveStudentAttempt = async (
    attempt: StudentTestAttempt
): Promise<StudentTestAttemptResult | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.post(`/takeTest`, attempt);

        if (response.status === 200) {
            return response.data as StudentTestAttemptResult;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const status = axiosError.response.status;
            const message = axiosError.response.data as string;

            if (status === 400 || status === 403 || status === 404) {
                return message;
            }

            if (status === 503) {
                return (
                    "Se ha perdido la conexión con el sistema. " +
                    "Sus respuestan han sido guardadas, no cierre la pestaña e intente enviar nuevamente en unos minutos."
                );
            }

            return `Error ${status}: ${
                message ||
                "Ocurrio un error al calificar y guardar el intento." +
                    "Sus respuestan han sido guardadas, no cierre la pestaña e intente enviar nuevamente en unos minutos."
            }`;
        }

        return (
            "Ocurrio un error desconocido al calificar y guardar el intento." +
            "Sus respuestan han sido guardadas, no cierre la pestaña e intente enviar nuevamente en unos minutos."
        );
    }
};
