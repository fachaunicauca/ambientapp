'use client'
import { useState, useEffect } from "react";
import { fetchQuestionsData } from '../../../lib/query';
import QuestionCard, { Question } from './question-card';
import PaginationControls from './pagination-control';
import ScoreCircle from "@/components/ui/feedback/score-circle";

interface Answers {
    [key: string]: string;
}

export default function Evaluation({ studentCode, subjectName }: { studentCode: string, subjectName: string }) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answers>({});
    const [currentPage, setCurrentPage] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    const questionsPerPage = 4;
    const maxScore = 100; 

    useEffect(() => {
        const fetchData = async () => {
            const fetchedQuestions = await fetchQuestionsData(subjectName);
            setQuestions(fetchedQuestions);
        };

        fetchData();
    }, [subjectName]);

    const handleAnswer = (questionId: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        questions.forEach(question => {
            if (answers[question.id] === question.answer) {
                correctAnswers++;
            }
        });
        return (correctAnswers / questions.length) * maxScore;
    };

    const submitTest = async () => {
        setIsSubmitting(true);
        setSubmitSuccess(false);

        try {
            const responseData = {
                studentCode: studentCode,
                answers: answers
            };

            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log("Enviando respuestas a la API:", responseData);

            const calculatedScore = calculateScore();
            setScore(calculatedScore);

            setSubmitSuccess(true);
        } catch (error) {
            console.error("Error enviando el test:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const startIndex = currentPage * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const paginatedQuestions = questions.slice(startIndex, endIndex);

    const allAnswered = Object.keys(answers).length === questions.length;

    return (
        <div className="p-6">
                <h3 className="text-lg font-semibold tracking-1.25 leading-19 m-2">Evaluación de {subjectName}</h3>
                {submitSuccess ? (
                    <div className="flex flex-col items-center">
                        <p className="text-sm text-accesibility font-semibold tracking-wider leading-26 mb-2">Se ha enviado la evaluación con éxito ✅</p>
                        <p className="text-sm font-semibold tracking-wider leading-26">Puntaje</p>
                        {score !== null && <ScoreCircle score={score} maxScore={maxScore} />}
                    </div>
                ) : (
                    <>
                        {paginatedQuestions.length > 0 ? (
                            paginatedQuestions.map((q) => (
                                <QuestionCard 
                                    key={q.id}
                                    question={q}
                                    selectedAnswer={answers[q.id]}
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
                            onSubmit={submitTest}
                            allAnswered={allAnswered}
                            isSubmitting={isSubmitting}
                        />
                    </>
                )}
        </div>
    );
}
