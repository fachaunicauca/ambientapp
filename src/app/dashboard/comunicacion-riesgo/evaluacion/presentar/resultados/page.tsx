"use client";

import { TakeTestResultsPage } from "@/components/communication-components/taketest-components/takeTestResultsPage";
import { useStudentTestAttemptStore } from "@/store/studentTestAttemptStore";
import { CheckCircle2, AlertCircle, ArrowLeft, Database } from "lucide-react";
import Link from "next/link";

export default function ResultadosEvaluacion() {
    const { testInfo, studentEmail, responses, clearAttempt } =
        useStudentTestAttemptStore();

    // Validación por si no hay datos en el Store
    if (!testInfo) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-6">
                <AlertCircle size={48} className="text-red-400" />
                <h1 className="text-2xl font-bold text-gray-800">
                    Sin datos de evaluación
                </h1>
                <p className="text-gray-500 max-w-md">
                    No se encontró un intento activo. Esto puede ocurrir si
                    recargaste la página después de finalizar.
                </p>
                <Link
                    href="/"
                    className="mt-4 flex items-center gap-2 text-blue-600 hover:underline"
                >
                    <ArrowLeft size={18} /> Volver al panel principal
                </Link>
            </div>
        );
    }

    return <TakeTestResultsPage></TakeTestResultsPage>;
}
