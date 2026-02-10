"use server";

import { microsApiServer } from "@/lib/axios";
import { PagedStudents } from "../interfaces/student-interfaces";
import { AxiosError } from "axios";

export const getCourseStudents = async (
    courseId: number,
    page: number = 0,
    size: number = 10
): Promise<PagedStudents | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.get("/courses/enrollment", {
            params: {
                courseId,
                page,
                size,
            },
        });

        if (response.status === 200) {
            return response.data as PagedStudents;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const status = axiosError.response.status;
            const message = axiosError.response.data as string;

            // 404 curso no existe o sin estudiantes
            if (status === 404) {
                return message;
            }

            return `Error ${status}: ${
                message || "Error al obtener los estudiantes del curso."
            }`;
        }

        return "Error desconocido al obtener los estudiantes del curso.";
    }
};

export const enrollStudentInCourse = async (
    studentEmail: string,
    courseId: number
): Promise<boolean | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.post("/courses/enrollment", null, {
            params: {
                studentEmail,
                courseId,
            },
        });

        if (response.status === 201) {
            return true;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const status = axiosError.response.status;
            const message = axiosError.response.data as string;

            // 404 estudiante o curso no existe, 409 ya matriculado
            if (status === 404 || status === 409) {
                return message;
            }

            return `Error ${status}: ${
                message || "Error al matricular el estudiante en el curso."
            }`;
        }

        return "Error desconocido al matricular el estudiante.";
    }
};

export const unenrollStudentFromCourse = async (
    studentId: number,
    courseId: number
): Promise<boolean | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.delete(
            "/courses/enrollment",
            {
                params: {
                    studentId,
                    courseId,
                },
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

            // 404: no estaba matriculado
            if (status === 404) {
                return message;
            }

            return `Error ${status}: ${
                message || "Error al eliminar la matrícula del estudiante."
            }`;
        }

        return "Error desconocido al eliminar la matrícula del estudiante.";
    }
};
