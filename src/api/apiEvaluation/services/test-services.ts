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

        throw new Error(
            `Error desconocido al obtener la información del test.`
        );
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
