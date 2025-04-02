import { StudentTestResponse } from "../interfaces/interfaces";

export const fetchQuestionsData = async (evaluacionInfo: { code: string; subject: string; teacher: string }) => {
    try {
        
        const url = `http://localhost:8080/takeTest?subject_name=${evaluacionInfo.subject}&student_code=${evaluacionInfo.code}&teacher_name=${evaluacionInfo.teacher }`;
        const response = await fetch(url);
        
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
        console.log(payload)
        const response = await fetch('http://localhost:8080/takeTest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        console.log('Payload enviado:', JSON.stringify(payload, null, 2));
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
