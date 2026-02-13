"use client";

import { AttemptRequestInfo } from "@/api/apiEvaluation/interfaces/testResults-interfaces";
import { Button } from "@/components/ui/buttons/button";
import { MAX_TEST_SCORE } from "@/config/testConfig";

interface AttemptRequestListItemProps {
    attemptRequestInfo: AttemptRequestInfo;
    onResetAttempts: (email: string) => void;
}

export const AttemptRequestListItem = ({
    attemptRequestInfo,
    onResetAttempts,
}: AttemptRequestListItemProps) => {
    return (
        <div className="bg-white border-gray-100 rounded-lg shadow-xl p-4 space-y-3 max-w-md">
            {/* Información del estudiante */}
            <div className="border-b pb-2">
                <h3 className="text-xs font-medium text-gray-500 mb-0.5">
                    Estudiante
                </h3>
                <p
                    className={`text-sm font-semibold text-gray-900 ${
                        attemptRequestInfo.studentEmail.length > 30
                            ? "text-xs"
                            : "text-sm"
                    }`}
                >
                    {attemptRequestInfo.studentEmail}
                </p>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 gap-1">
                <div className="rounded-md p-1">
                    <p className="text-xs font-medium mb-0.5">Intentos</p>
                    <p className="text-xl font-bold">
                        {attemptRequestInfo.totalAttemptsUsed}
                    </p>
                </div>

                <div className="rounded-md p-1">
                    <p className="text-xs font-medium mb-0.">Nota final</p>
                    <p className="text-xl font-bold">
                        {(
                            attemptRequestInfo.finalScore * MAX_TEST_SCORE
                        ).toFixed(1)}
                    </p>
                </div>
            </div>

            {/* Botón de acción */}
            <Button
                onClick={() => onResetAttempts(attemptRequestInfo.studentEmail)}
                className="w-full font-medium py-2 px-3 rounded-md text-sm"
            >
                Restablecer intentos
            </Button>
        </div>
    );
};
