import {
    StudentTestAttempt,
    StudentTestAttemptResult,
    TakeTestInfo,
} from "@/api/apiEvaluation/interfaces/takeTest-interfaces";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StudentTestAttemptState {
    // Estado del intento
    studentEmail: string | null;
    testInfo: TakeTestInfo | null;

    // Tiempo
    startTime: number | null;
    durationMinutes: number | null;

    // Respuestas
    responses: Record<number, string>;

    // Resultado de la evaluacion
    testResult: StudentTestAttemptResult | null;

    // Acciones
    startAttempt: (studentEmail: string, testInfo: TakeTestInfo) => void;
    saveResponse: (questionId: number, response: string) => void;

    setTestResult: (result: StudentTestAttemptResult) => void;
    clearAttempt: () => void;

    // Utiles
    isActive: () => boolean;
    getRemainingTimeSeconds: () => number;
    buildAttemptPayload: () => StudentTestAttempt | null;
}

export const useStudentTestAttemptStore = create<StudentTestAttemptState>()(
    persist(
        (set, get) => ({
            studentEmail: null,
            testInfo: null,
            startTime: null,
            durationMinutes: null,
            responses: {},
            testResult: null,

            startAttempt: (studentEmail, testInfo) => {
                set({
                    studentEmail,
                    testInfo,
                    startTime: Date.now(),
                    durationMinutes: testInfo.testDurationMinutes,
                    responses: {},
                    testResult: null,
                });
            },

            saveResponse: (questionId, response) =>
                set((state) => ({
                    responses: {
                        ...state.responses,
                        [questionId]: response,
                    },
                })),

            // Guardar resultado
            setTestResult: (result) =>
                set({
                    testResult: result,
                }),

            // Limpia intento (pero NO borra resultado)
            clearAttempt: () =>
                set({
                    studentEmail: null,
                    testInfo: null,
                    startTime: null,
                    durationMinutes: null,
                    responses: {},
                }),

            isActive: () => {
                const { testInfo, startTime } = get();
                return Boolean(testInfo && startTime);
            },

            getRemainingTimeSeconds: () => {
                const { startTime, durationMinutes } = get();
                if (!startTime || !durationMinutes) return 0;

                const elapsedMs = Date.now() - startTime;
                const totalMs = durationMinutes * 60 * 1000;

                return Math.max(0, Math.floor((totalMs - elapsedMs) / 1000));
            },

            buildAttemptPayload: () => {
                const { studentEmail, testInfo, responses } = get();
                if (!studentEmail || !testInfo) return null;

                return {
                    studentEmail,
                    testId: testInfo.testId,
                    testAttemptNumberOfQuestions:
                        testInfo.testNumberOfQuestions,
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
