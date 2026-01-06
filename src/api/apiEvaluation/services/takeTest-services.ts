"use server";

import { microsApiServer } from "@/lib/axios";
import { PagedTestsBasicInfo, TestBasicInfo } from "../interfaces/takeTest-interfaces";
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
