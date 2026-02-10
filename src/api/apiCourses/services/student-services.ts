"use server";

import { microsApiServer } from "@/lib/axios";
import {
    PagedStudents,
    StudentInfo,
} from "../../apiCourses/interfaces/student-interfaces";
import { AxiosError } from "axios";

export const getStudentsPaged = async (
    page: number = 0,
    size: number = 10 // Valor por defecto
): Promise<PagedStudents | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.get(`/students`, {
            params: {
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

            if (status === 404) {
                return message;
            }

            return `Error ${status}: ${
                message || "Error al obtener los estudiantes."
            }`;
        }

        return "Error desconocido al obtener los estudiantes.";
    }
};

export const saveStudent = async (
    studentData: StudentInfo
): Promise<boolean | Record<string, string>> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.post("/students", studentData);

        if (response.status === 201) {
            return true;
        }

        throw new Error();
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const status = axiosError.response.status;
            const data = axiosError.response.data;

            // 409 correo ya en uso
            if (status === 409) {
                return {
                    studentEmail:
                        typeof data === "string"
                            ? data
                            : "El correo ya está en uso.",
                };
            }

            // 404 no encontrado (al editar)
            if (status === 404) {
                return {
                    general:
                        typeof data === "string"
                            ? data
                            : "No se encontró el estudiante.",
                };
            }

            // 400 errores de validación
            if (status === 400 && typeof data === "object") {
                return data as Record<string, string>;
            }

            return {
                general: `Error ${status}: Error al guardar el estudiante.`,
            };
        }

        return {
            general: "Error desconocido al guardar el estudiante.",
        };
    }
};

export const deleteStudentById = async (
    studentId: number
): Promise<boolean | string> => {
    try {
        const microsApi = await microsApiServer();

        const response = await microsApi.delete(`/students/${studentId}`);

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
                return message || "No se encontró el estudiante.";
            }

            return `Error ${status}: ${
                message || "Error al eliminar el estudiante."
            }`;
        }

        return "Error desconocido al eliminar el estudiante.";
    }
};
