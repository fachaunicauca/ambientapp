export const TEST_STATE_LABELS: { [key: number]: string } = {
    0: "Inactivo",
    1: "Activo",
}

export const QUESTION_TYPE_LABELS: { [key: string]: string } = {
    MULTIPLE_CHOICE: "Opción Múltiple",
    OPEN_ENDED: "Respuesta Abierta",
};

export const MAX_TEST_SCORE: number = 5.0;

export type START_ATTEMPT_ERROR_CODE = "ALREADY_PASSED" | "NO_REMAINING_ATTEMPTS" | "ATTEMPT_NOT_STARTED" | "STUDENT_NOT_ENROLLED";