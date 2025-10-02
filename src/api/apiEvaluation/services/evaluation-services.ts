"use server";

import { StudentTestResponse } from "../interfaces/evaluation-interfaces";
import { TryInfo } from "../interfaces/evaluation-interfaces";
import microsApi from "@/lib/axios";

export const fetchQuestionsData = async (evaluacionInfo: { code: number; subject: string; teacher: string }) => {
    try {

        const response = await microsApi.get(`/takeTest?subject_name=${evaluacionInfo.subject}&student_code=${evaluacionInfo.code}&teacher_name=${evaluacionInfo.teacher }`);
        
        if (!response.status || response.status !== 200) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = response.data;
        
        if (!data || !data.questions) {
            return { error: "No se encontraron preguntas." };
        }
        
        return { success: true, questions: data.questions };
    } catch (error) {
        console.error("Error fetching test questions: ", error);
        return { error: "Error al obtener los datos del servidor." };
    }
};


export async function submitTest(payload: StudentTestResponse): Promise<number> {
    try {
        
        const response = await microsApi.post(`/takeTest`, payload);

        if (!response.status || response.status !== 200) {
            throw new Error('Error al enviar las respuestas.');
        }

        const score = await response.data;
        
        if(!score) {
            throw new Error('Respuesta inválida del servidor.');
        }

        return score;
    } catch (error) {
        console.error('Error al enviar el test:', error);
        throw error;
    }
}

export async function getTries(infoTryStudent: TryInfo): Promise<number> {
    try {

        const response = await microsApi.get(`/takeTest/getTries?actual_date=${infoTryStudent.actualDate}&student_code=${infoTryStudent.studentCode}`);
        
        if (!response.status || response.status !== 200) {
            throw new Error('Error al obtener los intentos.');
        }

        return response.data;
    } catch (error) {
        console.error('Error al obtener los intentos:', error);
        throw error;
    }
}