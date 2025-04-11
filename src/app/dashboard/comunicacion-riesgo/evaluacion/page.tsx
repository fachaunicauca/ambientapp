'use client';

import { useState } from 'react';
import { fetchQuestionsData } from '@/api/apiEvaluation/services/evaluation-services';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Title from '@/components/ui/title';

export default function LoginTest() {
    const [evaluacionInfo, setEvaluacionInfo] = useState({ code: "", subject: "", teacher: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await fetchQuestionsData(evaluacionInfo);

            if (result.error) {
                setError(result.error);
            } else {
                router.push(
                    `/dashboard/comunicacion-riesgo/evaluacion/test?code=${evaluacionInfo.code}&subject=${evaluacionInfo.subject}&teacher=${evaluacionInfo.teacher}`
                );
            }
        } catch (error) {
            console.error("Error al iniciar evaluación:", error);
            setError("Hubo un error al iniciar la evaluación.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Title title="Iniciar Evaluación" />
            <section className="mt-12">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                    <h3 className="text-lg font-semibold tracking-1.25 leading-19 m-2">Información del Estudiante</h3>
                    {error && <p className="text-error m-2 text-sm">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col md:flex-row flex-wrap gap-4">
                            <Input
                                type="text"
                                placeholder="Código de estudiante"
                                value={evaluacionInfo.code}
                                onChange={(e) => setEvaluacionInfo({ ...evaluacionInfo, code: e.target.value })}
                                className="flex-1 w-full md:w-1/3 rounded-lg"
                            />
                            <Input
                                type="text"
                                placeholder="Materia"
                                value={evaluacionInfo.subject}
                                onChange={(e) => setEvaluacionInfo({ ...evaluacionInfo, subject: e.target.value })}
                                className="flex-1 w-full md:w-1/3 rounded-lg"
                            />
                            <Input
                                type="text"
                                placeholder="Docente"
                                value={evaluacionInfo.teacher}
                                onChange={(e) => setEvaluacionInfo({ ...evaluacionInfo, teacher: e.target.value })}
                                className="flex-1 w-full md:w-1/3 rounded-lg"
                            />
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button type="submit" className="rounded-full w-full md:w-4xl" disabled={loading}>
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin h-5 w-5 mr-2 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
                                            ></path>
                                        </svg>
                                        Iniciando...
                                    </div>
                                ) : (
                                    "Iniciar Evaluación"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}