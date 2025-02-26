export const fetchStudentData = async (studentInfo: { code: string; subject: string; teacher: string }) => {
    try {
        const response = await fetch("/data.json");

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        const studentExists = data.students.some((s: { code: string }) => s.code === studentInfo.code);
        const subjectExists = data.subjects.some(
            (s: { name: string; teacher: string }) =>
                s.name === studentInfo.subject && s.teacher === studentInfo.teacher
        );

        if (!studentExists) {
            return { error: "Código de estudiante no encontrado." };
        }
        if (!subjectExists) {
            return { error: "Materia o docente incorrectos." };
        }

        return { success: true };
    } catch (error) {
        console.error("Error fetching student data: ", error);
        return { error: "Error al obtener los datos del servidor." };
    }
};

export const fetchQuestionsData = async (subject: string) => {
    try{
        const response = await fetch(`/data.json`);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        const questions = data.questions.filter((q: { subject: string }) => q.subject === subject);
        return questions;
    } catch (error) {
        console.error("Error fetching questions data: ", error);
        return [];
    }
}

export const saveTestData = async (test: any) => {
    console.log("Saving test data " + test);
    /* try {
        const response = await fetch(`/data.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(test),
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error saving test data: ", error);
        return null;
    }*/
    return true
};
