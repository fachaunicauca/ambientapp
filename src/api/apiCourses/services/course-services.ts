"use server";

import { microsApiServer } from "@/lib/axios";
import { CourseInfo, PagedCourses } from "../interfaces/course-interfaces";
import { AxiosError } from "axios";

export const getCoursesPaged = async (
    page: number = 0,
    size: number = 10 // Valor por defecto
): Promise<PagedCourses | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.get(`/courses`, {
            params: {
                page,
                size,
            },
        });

        if (response.status === 200) {
            return response.data as PagedCourses;
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
                message || "Error al obtener los cursos."
            }`;
        }

        return "Error desconocido al obtener los cursos.";
    }
};

export const getCourseById = async (
    id: number
): Promise<CourseInfo | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.get(`/courses/${id}`);

        if (response.status === 200) {
            return response.data as CourseInfo;
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
                message || "Error al obtener el curso."
            }`;
        }

        return "Error desconocido al obtener el curso.";
    }
};

export const saveCourse = async (
    courseData: CourseInfo
): Promise<boolean | Record<string, string>> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.post("/courses", courseData);

        if (response.status === 201) {
            return true;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const status = axiosError.response.status;
            const data = axiosError.response.data;

            // 404 curso no encontrado (al editar)
            if (status === 404) {
                return {
                    general:
                        typeof data === "string"
                            ? data
                            : "No se encontró el curso.",
                };
            }

            // 400 errores de validación
            if (status === 400 && typeof data === "object") {
                return data as Record<string, string>;
            }

            // 409 conflicto
            if (status === 409) {
                return {
                    general:
                        typeof data === "string"
                            ? data
                            : "Conflicto al guardar el curso.",
                };
            }

            return {
                general: `Error ${status}: Error al guardar el curso.`,
            };
        }

        return {
            general: "Error desconocido al guardar el curso.",
        };
    }
};

export const deleteCourseById = async (
    id: number
): Promise<boolean | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.delete(`/courses/${id}`);

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

            return `Error ${status}: ${
                message || "Error al eliminar el curso."
            }`;
        }

        return "Error desconocido al eliminar el curso.";
    }
};
