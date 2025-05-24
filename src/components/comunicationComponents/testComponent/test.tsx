'use client';

import { Question } from "@/api/apiEvaluation/interfaces/evaluation-interfaces";
import { getTries, submitTest } from "@/api/apiEvaluation/services/evaluation-services";
import { useState, useEffect, useCallback } from "react";
import QuestionCard from "./questionCard";
import PaginationControls from "./paginationControl";
import ScoreCircle from "@/components/ui/feedback/score-circle";
import { Button } from "@/components/ui/buttons/button";

interface EvaluationProps {
    studentCode: string;
    subjectName: string;
    teacherName: string;
    questions: Question[];
}

export default function Evaluation({ studentCode, subjectName, teacherName, questions }: EvaluationProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(10 * 60); 
    const [attempt, setAttempt] = useState(3); 
    const questionsPerPage = 4;

    const handleSubmit = useCallback(async () => {
        if (isSubmitting || submitSuccess) return;

        setIsSubmitting(true);
        setSubmitSuccess(false);

        const payload = {
            subject_name: subjectName,
            teacher_name: teacherName,
            test_date: new Date(),
            student_code: parseInt(studentCode, 10),
            student_response: Object.keys(answers).map((questionId) => ({
                question_id: parseInt(questionId, 10),
                answers_ids: [answers[parseInt(questionId, 10)]],
            })),
        };

        const infoTryStudent = {
            actual_date: new Date().toISOString().split('T')[0],
            student_code: parseInt(studentCode, 10)
        };

        try {
            const returnedScore = await submitTest(payload);
            setScore(returnedScore * 100); 
            setSubmitSuccess(true);
            const attempts = await getTries(infoTryStudent)
            setAttempt((prev) => prev - attempts);
            setTimeLeft(0);
        } catch (error) {
            console.error("Error al enviar las respuestas:", error);
            alert("Hubo un error al enviar las respuestas.");
        } finally {
            setIsSubmitting(false);
        }
    }, [subjectName, teacherName, studentCode, answers, isSubmitting, submitSuccess]);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (timeLeft !== 0) {
                setTimeLeft(0);
            }
            if (!submitSuccess && !isSubmitting) {
                handleSubmit();
            }
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, submitSuccess, isSubmitting, handleSubmit]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleAnswer = (questionId: number, answerId: number) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    const restartEvaluation = () => {
        setCurrentPage(0); 
        setAnswers({}); 
        setSubmitSuccess(false); 
        setScore(null); 
        setTimeLeft(10 * 60); 
    };

    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const paginatedQuestions = questions.slice(startIndex, endIndex);

    return (
        <div className="p-6">
            <h3 className="text-center text-lg font-bold tracking-1.25 leading-19 m-2">
                Evaluación de {subjectName}
            </h3>
            <div className="text-right text-red-600 font-bold mb-4">
                Tiempo restante: {formatTime(timeLeft)}
            </div>
            {submitSuccess ? (
                <div className="flex flex-col items-center">
                    <p className="text-sm font-semibold tracking-wider leading-26 mb-2">
                        Puntuación
                    </p>
                    {score !== null && <ScoreCircle score={score} maxScore={100} />}
                    {score !== null && score < 70 && attempt <= 0 ? (
                        <p className="text-center text-neutro mt-2">Haz agotado todos tus intentos !!</p>
                    ) : score !== null && score < 70 && attempt > 0 ? (
                        <Button
                            className="w-md rounded-full mt-2"
                            onClick={restartEvaluation}
                        >
                            Intentar Nuevamente ({attempt}/3)
                        </Button>
                    ) : (
                        <p className="text-center text-neutro mt-2">Haz completado la evaluación!!</p>
                    )}
                </div>
            ) : (
                <>
                    {paginatedQuestions.length > 0 ? (
                        paginatedQuestions.map((q) => (
                            <QuestionCard
                                key={q.question_id}
                                question={q}
                                selectedAnswer={answers[q.question_id]}
                                onAnswerChange={handleAnswer}
                            />
                        ))
                    ) : (
                        <p className="text-center text-neutro">Cargando preguntas...</p>
                    )}
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={Math.ceil(questions.length / questionsPerPage)}
                        onPageChange={setCurrentPage}
                        onAction={handleSubmit}
                        actionText="Enviar respuestas"
                        isSubmitting={isSubmitting}
                        disableNext={!paginatedQuestions.every(q => answers[q.question_id])}
                    />
                </>
            )}
        </div>
    );
}