'use client';

import Test from "@/components/comunicationComponents/testComponent/test";
import { fetchQuestionsData } from "@/api/apiEvaluation/services/evaluation-services";
import { useState, useEffect } from "react";

export default function EvaluationPageContent() {
    const [params, setParams] = useState<{ code?: number; subject?: string; teacher?: string }>({});
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setParams({
            code: parseInt(searchParams.get('code') ?? '0') || undefined,
            subject: searchParams.get('subject') || undefined,
            teacher: searchParams.get('teacher') || undefined,
        });
    }, []);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!params.code || !params.subject || !params.teacher) {
                console.error('Información de parámetros incompleta.');
                setLoading(false);
                return;
            }

            try {
                const fetchedQuestions = await fetchQuestionsData({
                    code: params.code,
                    subject: params.subject,
                    teacher: params.teacher
                });

                if (fetchedQuestions.error) {
                    console.error(fetchedQuestions.error);
                } else {
                    setQuestions(fetchedQuestions.questions);
                }
            } catch (error) {
                console.error('Error al obtener las preguntas:', error);
            } finally {
                setLoading(false); 
            }
        };

        if (params.code && params.subject && params.teacher) {
            fetchQuestions();
        }
    }, [params]);

    if (!params.code) return <div>Error: Código del estudiante no proporcionado</div>;
    if (!params.subject) return <div>Error: Nombre de la materia no proporcionado</div>;
    if (!params.teacher) return <div>Error: Nombre del docente no proporcionado</div>;

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <div className="text-center">
                    <p className="text-gray-500 mt-4">Cargando Evaluación...</p>
                </div>
            </div>
        );
    }

    if (!questions.length) return <div>No se encontraron preguntas disponibles.</div>;

    return (
        <section>
            <Test
                studentCode={params.code}
                subjectName={params.subject}
                teacherName={params.teacher}
                questions={questions}
            />
        </section>
    );
}