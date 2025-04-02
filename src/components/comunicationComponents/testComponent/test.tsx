'use client';

import { Question } from "@/api/apiEvaluation/interfaces/interfaces";
import { submitTest } from "@/api/apiEvaluation/services/evaluation-services";
import { useState, useEffect, useCallback } from "react";
import QuestionCard from "./questionCard";
import PaginationControls from "./paginationControl";
import ScoreCircle from "@/components/ui/score-circle";

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

        try {
            const returnedScore = await submitTest(payload);
            setScore(returnedScore * 100);
            setSubmitSuccess(true);
            setTimeLeft(0); // Set the timer to 00:00
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
                setTimeLeft(0); // Ensure the timer stops at 00:00
            }
            if (!submitSuccess && !isSubmitting) {
                handleSubmit(); // Submit only if not already submitted
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

    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const paginatedQuestions = questions.slice(startIndex, endIndex);

    const allAnswered = Object.keys(answers).length === questions.length;

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
                        onSubmit={handleSubmit}
                        allAnswered={allAnswered}
                        isSubmitting={isSubmitting}
                    />
                </>
            )}
        </div>
    );
}