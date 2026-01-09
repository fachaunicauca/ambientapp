"use client";

import { useStudentTestAttemptStore } from "@/store/studentTestAttemptStore";
import { CheckCircle2, AlertCircle, ArrowLeft, Database } from "lucide-react";
import Link from "next/link";

export default function ResultadosEvaluacion() {
    const { testInfo, studentEmail, responses, clearAttempt } = useStudentTestAttemptStore();

    // Validación por si no hay datos en el Store
    if (!testInfo) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-6">
                <AlertCircle size={48} className="text-red-400" />
                <h1 className="text-2xl font-bold text-gray-800">Sin datos de evaluación</h1>
                <p className="text-gray-500 max-w-md">
                    No se encontró un intento activo. Esto puede ocurrir si recargaste la página después de finalizar.
                </p>
                <Link href="/" className="mt-4 flex items-center gap-2 text-blue-600 hover:underline">
                    <ArrowLeft size={18} /> Volver al panel principal
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            {/* Encabezado Principal */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <CheckCircle2 size={120} />
                </div>
                
                <div className="relative z-10">
                    <h1 className="text-3xl font-black text-gray-900 mb-2">Resumen del Intento</h1>
                    <div className="flex flex-col gap-1 text-gray-500">
                        <p className="flex items-center gap-2">
                            <span className="font-bold text-gray-700">Estudiante:</span> {studentEmail}
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="font-bold text-gray-700">Test:</span> {testInfo.testTitle}
                        </p>
                    </div>
                </div>
            </div>

            {/* Listado de respuestas crudas */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                    <Database size={20} />
                    Datos de respuestas (Raw JSON)
                </h2>

                {testInfo.questions.map((question, index) => {
                    // Accedemos al Record<number, string> usando el ID de la pregunta
                    const rawResponse = responses[question.questionId];

                    return (
                        <div 
                            key={question.questionId} 
                            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                        >
                            {/* Header de la pregunta */}
                            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                    Pregunta {index + 1}
                                </span>
                                <span className="text-[10px] font-mono bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                                    ID: {question.questionId}
                                </span>
                            </div>

                            {/* Contenido */}
                            <div className="p-5">
                                <h3 className="font-semibold text-gray-800 mb-4">
                                    {question.questionTitle}
                                </h3>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-blue-600 uppercase">
                                        Contenido almacenado en el Store:
                                    </label>
                                    <div className="rounded-lg p-4 overflow-x-auto">
                                        <code className="text-sm text-green-400 font-mono break-all">
                                            {rawResponse ? rawResponse : "// Sin respuesta registrada"}
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Acciones Finales */}
            <div className="mt-12 flex flex-col items-center gap-4">
                <button
                    onClick={() => {
                        if(confirm("¿Estás seguro de que deseas limpiar el intento? Los datos se borrarán del navegador.")) {
                            clearAttempt();
                            window.location.href = "/dashboard/comunicacion-riesgo/evaluacion";
                        }
                    }}
                    className="w-full sm:w-auto px-10 py-4 bg-red-50 text-red-600 font-bold rounded-2xl border-2 border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                >
                    Borrar datos del Store y Salir
                </button>
                <p className="text-xs text-gray-400">
                    Esta acción ejecutará clearAttempt() y reiniciará el estado global.
                </p>
            </div>
        </div>
    );
}
