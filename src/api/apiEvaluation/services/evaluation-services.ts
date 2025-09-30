import { StudentTestResponse } from "../interfaces/evaluation-interfaces";
import { TryInfo } from "../interfaces/evaluation-interfaces";


const baseUrl = process.env.NEXT_PUBLIC_API_TEST_BASE_URL

export const fetchQuestionsData = async (evaluacionInfo: { code: string; subject: string; teacher: string }) => {
    try {
        
        if (!baseUrl) {
            throw new Error("La URL base no está definida en las variables de entorno.");
        }

        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token no disponible");
        }

        const response = await fetch(`${baseUrl}/takeTest?subject_name=${evaluacionInfo.subject}&student_code=${evaluacionInfo.code}&teacher_name=${evaluacionInfo.teacher }` ,
            {method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },}
        );
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
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
        if (!baseUrl) {
            throw new Error("La URL base no está definida en las variables de entorno.");
        }

        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token no disponible");
        }
        const response = await fetch(`${baseUrl}/takeTest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error('Error al enviar las respuestas.');
        }
        const score = await response.json();
        return score;
    } catch (error) {
        console.error('Error al enviar el test:', error);
        throw error;
    }
}

export async function getTries(infoTryStudent: TryInfo): Promise<number> {
    try {
        if (!baseUrl) {
            throw new Error("La URL base no está definida en las variables de entorno.");
        }

        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token no disponible");
        }
        
        const response = await fetch(`${baseUrl}/takeTest/getTries?actual_date=${infoTryStudent.actual_date}&student_code=${infoTryStudent.student_code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error al enviar las respuestas.');
        }
        const score = await response.json();
        return score;
    } catch (error) {
        console.error('Error al obtener los intentos:', error);
        throw error;
    }
}