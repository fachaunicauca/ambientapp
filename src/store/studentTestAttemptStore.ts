import { TakeTestInfo } from "@/api/apiEvaluation/interfaces/takeTest-interfaces";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StudentTestAttemptState {
    // Estado del intento
    studentEmail: string | null;
    testInfo: TakeTestInfo | null;

    // Tiempo
    startTime: number | null; // timestamp
    durationMinutes: number | null;

    // Respuestas del estudiante
    responses: Record<number, string>; // questionId -> response

    // Acciones
    startAttempt: (
        studentEmail: string,
        testInfo: TakeTestInfo
    ) => void;

    saveResponse: (questionId: number, response: string) => void;

    clearAttempt: () => void;

    // Utiles
    isActive: () => boolean;
    getRemainingTimeSeconds: () => number;
    buildAttemptPayload: () => {
        studentEmail: string;
        testId: number;
        studentResponses: {
            questionId: number;
            response: string;
        }[];
    } | null;
}

export const useStudentTestAttemptStore =
    create<StudentTestAttemptState>()(
        persist(
            (set, get) => ({
                studentEmail: null,
                testInfo: null,
                startTime: null,
                durationMinutes: null,
                responses: {},

                /* Guardar datos al iniciar el intento */
                startAttempt: (studentEmail, testInfo) => {
                    set({
                        studentEmail,
                        testInfo,
                        startTime: Date.now(),
                        durationMinutes: testInfo.testDurationMinutes,
                        responses: {},
                    });
                },

                /* Guardar respuestas del estudiante */
                saveResponse: (questionId, response) =>
                    set((state) => ({
                        responses: {
                            ...state.responses,
                            [questionId]: response,
                        },
                    })),

                /* Limpiar store */
                clearAttempt: () =>
                    set({
                        studentEmail: null,
                        testInfo: null,
                        startTime: null,
                        durationMinutes: null,
                        responses: {},
                    }),

                /* Utiles */
                isActive: () => {
                    const { testInfo, startTime } = get();
                    return Boolean(testInfo && startTime);
                },

                getRemainingTimeSeconds: () => {
                    const { startTime, durationMinutes } = get();
                    if (!startTime || !durationMinutes) return 0;

                    const elapsedMs = Date.now() - startTime;
                    const totalMs = durationMinutes * 60 * 1000;

                    return Math.max(
                        0,
                        Math.floor((totalMs - elapsedMs) / 1000)
                    );
                },

                /* Payload para enviar al backend */
                buildAttemptPayload: () => {
                    const { studentEmail, testInfo, responses } = get();
                    if (!studentEmail || !testInfo) return null;

                    return {
                        studentEmail,
                        testId: testInfo.testId,
                        studentResponses: Object.entries(responses).map(
                            ([questionId, response]) => ({
                                questionId: Number(questionId),
                                response,
                            })
                        ),
                    };
                },
            }),
            {
                name: "student-test-attempt",
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    );
